package org.egov.repository;

import org.egov.domain.model.IngestionTransaction;
import org.egov.domain.model.IngestionTransactionProcessingQueue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface IntegrationTransactionProcessingQueueRepository extends JpaRepository<IngestionTransactionProcessingQueue, UUID> {
    List<IngestionTransaction> findByTenantId(String tenantId);
    List<IngestionTransaction> findByTransactionStatus(String transactionStatus);

    List<IngestionTransaction> findByStatus(String received);
}