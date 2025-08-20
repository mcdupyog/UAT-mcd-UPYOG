package org.egov.web.utils;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.egov.config.IngestionConfiguratonProperties;
import org.egov.domain.model.IngestionTransaction;
import org.egov.repository.ServiceRequestRepository;
import org.egov.web.contract.IngestionPullResponse;
import org.egov.web.contract.IngestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class ThirdPartyIngestionClient {

    private final ServiceRequestRepository serviceRequestRepository;
    private final IngestionConfiguratonProperties config;
    private final ObjectMapper objectMapper;

    @Autowired
    public ThirdPartyIngestionClient(ServiceRequestRepository serviceRequestRepository,
                                     IngestionConfiguratonProperties config,
                                     ObjectMapper objectMapper) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.config = config;
        this.objectMapper = objectMapper;
    }

    /**
     * Calls NIC ingestion API and returns list of ingestion transactions
     */
    public List<IngestionTransaction> fetchTransactionsFromNIC(IngestionRequest request) {
        StringBuilder uri = new StringBuilder()
                .append(config.getTpNicHost())
                .append(config.getTpNicFetchEndpoint());

        Object response = serviceRequestRepository.fetchResult(uri, request);

        if (response == null) {
            log.warn("Received null response from NIC ingestion endpoint.");
            return Collections.emptyList();
        }

        Map<String, Object> responseMap = (Map<String, Object>) response;
        Object transactionData = responseMap.get("transactions");

        if (transactionData == null) {
            log.warn("NIC response does not contain 'transactions' key.");
            return Collections.emptyList();
        }

        try {
            return objectMapper.convertValue(transactionData, new TypeReference<List<IngestionTransaction>>() {});
        } catch (Exception e) {
            log.error("Failed to parse ingestion transactions from NIC response", e);
            return Collections.emptyList();
        }
    }

    /**
     * Calls: GET {host}/payment/token?reqId=<url-encoded>
     * Returns raw JWT (no "Bearer " prefix unless NIC mandates it).
     */
    public String fetchToken(String encodedReqId) {
        try {

            if (encodedReqId == null || encodedReqId.isEmpty()) {
                throw new IllegalArgumentException("reqId must not be null/blank");
            }

            String base = config.getTpNicHost();              // e.g. https://mcdonline.nic.in/FinDetailApiBeta
            String path = config.getTpNicTokenEndpoint();     // e.g. /payment/token

            StringBuilder uri = new StringBuilder()
                    .append(base)
                    .append(path)
                    .append("?reqId=").append(encodedReqId);

            // No body, simple GET
            Object response = serviceRequestRepository.fetchResult(uri, null);

            String token;
            if (response instanceof String) {
                token = (String) response;
            } else {
                // In case NIC returns wrapped JSON in future
                token = objectMapper.convertValue(response, String.class);
            }
            if (token == null || token.isEmpty() || token.contains("IP Not WhiteListed") || token.contains("Something Went Wrong")) {
                throw new IllegalStateException("Empty token received from NIC for reqId=" + encodedReqId);
            }
            log.info("Fetched NIC token (length={} chars)", token.length());
            return token;

        } catch (Exception ex) {
            log.error("Failed to fetch NIC token for reqId (masked). Reason={}", ex.toString());
            throw new RuntimeException("Failed to fetch NIC token", ex);
        }
    }

    public List<IngestionTransaction> loadMockTransactions() {
        try {
            ClassPathResource resource = new ClassPathResource("data/nic_static_response.json");
            IngestionPullResponse response = objectMapper.readValue(resource.getInputStream(), IngestionPullResponse.class);
            return response.getIngestionTransactions();
        } catch (IOException e) {
            log.error("Failed to load mock NIC response", e);
            return Collections.emptyList();
        }
    }
}