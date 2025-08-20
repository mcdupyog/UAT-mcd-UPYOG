package org.egov.repository;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;
import org.egov.tracer.model.ServiceCallException;
import org.egov.web.contract.IngestionPullResponse;
import org.egov.web.contract.IngestionRequestPlain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.net.ConnectException;
import java.util.*;

@Repository
@Slf4j
public class ServiceRequestRepository {

    private final ObjectMapper mapper;
    private final RestTemplate restTemplate;

    /**
     * Fetches results from a REST service using the uri and object
     * @return Object
     * @author Bimal
     */
    @Autowired
    public ServiceRequestRepository(ObjectMapper mapper, RestTemplate restTemplate) {
        this.mapper = mapper;
        this.restTemplate = restTemplate;
    }


    public Object fetchResult(StringBuilder uri, Object request) {
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        Object response = null;
        log.debug("URI: " + uri.toString());
        try {
            if (request == null) {
                // Treat as GET returning plain text (token endpoint)
                log.debug("Request: <GET no-body>");
                response = restTemplate.getForObject(uri.toString(), String.class);
            } else {
                log.debug("Request: " + mapper.writeValueAsString(request));
                response = restTemplate.postForObject(uri.toString(), request, Map.class);
            }
        } catch (ResourceAccessException e) {
            if (e.getCause() instanceof ConnectException) {
                log.error("Connection refused: {}", e.getMessage());
                // Handle connection refused scenario
            } else {
                log.error("Resource access exception: {}", e.getMessage());
                // Handle other resource access errors
            }
        } catch (HttpClientErrorException e) {
            log.error("External Service threw an Exception: ", e);
            throw new ServiceCallException(e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("Exception while fetching from searcher: ", e);
        }

        return response;
    }

    /*==================== NEW: POST with headers ==================== */
    public Object fetchResult(StringBuilder uri, IngestionRequestPlain request, Map<String, String> headers) {
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        Object response = null;
        log.debug("URI: {}", uri.toString());
        try {
            log.debug("Request Body: {}", mapper.writeValueAsString(request));

            HttpHeaders httpHeaders = buildHeaders(headers);
            HttpEntity<IngestionRequestPlain> entity = new HttpEntity<>(request, httpHeaders);

            ResponseEntity<Object> resp = restTemplate.exchange(uri.toString(), HttpMethod.POST, entity, Object.class);
            response = resp.getBody();

        } catch (ResourceAccessException e) {
            if (e.getCause() instanceof ConnectException) {
                log.error("Connection refused: {}", e.getMessage());
            } else {
                log.error("Resource access exception: {}", e.getMessage());
            }
        } catch (HttpClientErrorException e) {
            log.error("External Service threw an Exception: ", e);
            throw new ServiceCallException(e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("Exception while fetching (POST with headers): ", e);
        }
        return response;
    }

    // Helper Method
//    private HttpHeaders buildHeaders(Map<String, String> headers) {
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(Collections.singletonList(MediaType.TEXT_PLAIN));
//        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//        httpHeaders.set(HttpHeaders.AUTHORIZATION, headers.get("Authorization"));
//        httpHeaders.set("requestedNo", headers.get("requestedNo"));
//        return httpHeaders;
//    }
    private HttpHeaders buildHeaders(Map<String, String> headers) {
        if (headers == null) throw new IllegalArgumentException("headers must not be null");

        // Pull values in a case-safe way
        String token = Optional.ofNullable(headers.get(HttpHeaders.AUTHORIZATION))
                .orElse(headers.get("Authorization"));
        String requestedNo = Optional.ofNullable(headers.get("requestedNo"))
                .orElseGet(() -> headers.getOrDefault("requestedno", headers.get("REQUESTEDNO")));

        if (token == null || token.trim().isEmpty()) {
            throw new IllegalArgumentException("Missing Authorization (raw NIC JWT) in headers");
        }
        if (requestedNo == null || requestedNo.trim().isEmpty()) {
            throw new IllegalArgumentException("Missing requestedNo (raw reqId) in headers");
        }

        // Sanitize: trim JWT; ensure requestedNo is RAW (not URL-encoded)
        token = token.trim();
        // If someone passes %2B/%3D/%2F, convert to raw
        //requestedNo = requestedNo.replace("%2B", "+").replace("%3D", "=").replace("%2F", "/");

        HttpHeaders hh = new HttpHeaders();
        hh.setContentType(MediaType.APPLICATION_JSON);
        // NIC sometimes replies text/plain; accept both to avoid converter issues
        hh.setAccept(Arrays.asList(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN));

        hh.set(HttpHeaders.AUTHORIZATION, token);    // RAW JWT (no "Bearer ")
        hh.set("requestedNo", requestedNo);         // RAW reqId used to mint the token

        return hh;
    }

    public <T> T fetchResultWithPathParams(StringBuilder uri, Map<String, String> pathParams, Class<T> responseType) {
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        try {
            // Build the URI with path parameters
            for (Map.Entry<String, String> entry : pathParams.entrySet()) {
                String placeholder = "{" + entry.getKey() + "}";
                uri = new StringBuilder(uri.toString().replace(placeholder, entry.getValue()));
            }

            log.debug("Resolved URI: {}", uri);

            // Make the GET request
            return restTemplate.getForObject(uri.toString(), responseType);

        } catch (HttpClientErrorException e) {
            log.error("External Service threw an Exception: {}", e.getMessage(), e);
            throw new ServiceCallException(e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("Exception while fetching from service: {}", e.getMessage(), e);
        }
        return null;
    }

}