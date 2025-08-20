package org.egov.domain.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.egov.config.IngestionConfiguratonProperties;
import org.egov.domain.model.IngestionTransaction;
import org.egov.kafka.Producer;
import org.egov.repository.ServiceRequestRepository;
import org.egov.web.contract.IngestionRequest;
import org.egov.web.contract.IngestionRequestCriteria;
import org.egov.web.contract.IngestionRequestPlain;
import org.egov.web.utils.ThirdPartyIngestionClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Slf4j
@Service
public class IngestionService {

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    @Autowired
    private IngestionConfiguratonProperties config;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ThirdPartyIngestionClient thirdPartyIngestionClient;

    @Autowired
    private Producer producer;

    private IngestionRequestPlain ingestionRequestPlain = new IngestionRequestPlain();


    public Integer pullTransactions(IngestionRequest ingestionRequest) {
        IngestionRequestCriteria criteria = ingestionRequest.getIngestionRequestCriteria();
        criteria.setUuid(UUID.randomUUID().toString());
        criteria.validate();
        List<IngestionTransaction> pullResponse =null;

        List<IngestionTransaction> transactions;
        if (config.isTpNicMockMode()) {
            log.info("Mock mode enabled. Loading transactions from static JSON.");
            transactions = thirdPartyIngestionClient.loadMockTransactions(); // <-- Load from file
        }
        else {

            final String encodedReqId = config.getTpNicRequestNo();
            // Fetch NIC token (handles 200-with-error bodies via your hardened fetchToken)
            final String token = thirdPartyIngestionClient.fetchToken(encodedReqId);

            // Prepare headers for transactions call
            final Map<String, String> headers = new HashMap<>();
            headers.put("Authorization", token);
            headers.put("requestedNo", encodedReqId);

            StringBuilder uri = new StringBuilder(config.getTpNicHost())
                    .append(config.getTpNicFetchEndpoint());

            ingestionRequestPlain.setApplicationCode(ingestionRequest.getIngestionRequestCriteria().getApplicationCode());
            ingestionRequestPlain.setStartDate(ingestionRequest.getIngestionRequestCriteria().getStartDate());
            ingestionRequestPlain.setEndDate(ingestionRequest.getIngestionRequestCriteria().getEndDate());
            ingestionRequestPlain.setLimit(ingestionRequest.getIngestionRequestCriteria().getLimit());
            ingestionRequestPlain.setCursor("");

            Object response = serviceRequestRepository.fetchResult(uri, ingestionRequestPlain, headers);

            transactions = objectMapper.convertValue(response, new com.fasterxml.jackson.core.type.TypeReference<List<IngestionTransaction>>() {});
            if (transactions == null || transactions.isEmpty()) {
                return 0;
            }
        }

        log.info("Fetched Response from NIC total count is: {}", transactions.size());

        for (IngestionTransaction txn : transactions) {
            producer.push(config.getSaveRevenueIngestionTopic(), txn);
            log.info("Record Pushed: {}", txn.toString());
        }
        return transactions.size();
    }

}