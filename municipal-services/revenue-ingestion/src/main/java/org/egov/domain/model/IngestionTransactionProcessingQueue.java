package org.egov.domain.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@TypeDef(name = "jsonb", typeClass = JsonType.class)
@Entity
@Table(name = "eg_ingestion_transaction_processing_queue")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IngestionTransactionProcessingQueue {

    @Id
    @GeneratedValue
    private UUID id;  // Primary key

    @Column(unique = true)
    private String applicationTransactionId; // Unique transaction reference from source (e.g., NIC)
    private String tenantId;                 // e.g., pg.citya
    private String zoneCode;                 // Optional zone info
    private String department;               // e.g., DEPT_25
    private String applicationCode;          // e.g., PTR
    private String serviceName;              // e.g., PROPERTY_TAX


    private Double orderAmount;              // Total order amount paid
    private String transactionStatus;        // e.g., SUCCESS, PENDING, FAILED
    private String transactionInitiatedOn; // Time transaction started
    private String transactionModifiedOn;  // Time of last update
    private String paymentAggregrator;       // e.g., HDFC, Razorpay
    private String narration;                // Voucher narration

    @JsonProperty("calculationJson")
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private List<FinancialYearDetails> financialYearDetailsList;     // Full calculations details from source

    @Column(name = "status")
    private String status;                            // RECEIVED, PROCESSED, FAILED

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;                  // When inserted into DB
    private LocalDateTime processedAt;                // When voucher was processed
    private String voucherReference;                  // Finance voucher reference
    private String errorMessage;                      // In case of failure
    private int retryCount;                           // Retry attempts (default = 0)
}
