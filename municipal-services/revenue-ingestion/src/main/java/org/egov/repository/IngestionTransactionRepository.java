package org.egov.repository;

import org.egov.domain.model.IngestionTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.List;

@Repository
public interface IngestionTransactionRepository extends JpaRepository<IngestionTransaction, UUID> {
    // Example custom query methods (optional)
    List<IngestionTransaction> findByTenantId(String tenantId);
    List<IngestionTransaction> findByTransactionStatus(String transactionStatus);
}
