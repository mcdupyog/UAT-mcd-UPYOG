package org.egov.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.egov.domain.model.IngestionTransactionProcessingQueue;
import org.egov.repository.IntegrationTransactionProcessingQueueRepository;
import org.egov.web.utils.IngestionConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Slf4j
@Component
public class Consumer {

    private final IntegrationTransactionProcessingQueueRepository ingestionRepositoryProcessingQueue;
    private final ObjectMapper objectMapper;

    @Autowired
    public Consumer(IntegrationTransactionProcessingQueueRepository ingestionRepositoryProcessingQueue, ObjectMapper objectMapper) {
        this.ingestionRepositoryProcessingQueue = ingestionRepositoryProcessingQueue;
        this.objectMapper = objectMapper;
    }

    /*
     * Consumes records from the Kafka topic configured in application.properties
     */
    @KafkaListener(topics = IngestionConstants.SAVE_REVENUE_INGESTION_TOPIC)
    public void listen(final HashMap<String, Object> record,
                       @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        try {
            log.info("Consuming record: {}", record);
            IngestionTransactionProcessingQueue transaction = objectMapper.convertValue(record, IngestionTransactionProcessingQueue.class);
            transaction.setStatus(IngestionConstants.STATUS_RECEIVED);
            ingestionRepositoryProcessingQueue.save(transaction);
            log.debug("Transaction Saved: {}", transaction);
        } catch (final Exception e) {
            log.error("Error while listening to value: {} on topic: {}: {}", record, topic, e.getMessage(), e);
        }
    }
}
