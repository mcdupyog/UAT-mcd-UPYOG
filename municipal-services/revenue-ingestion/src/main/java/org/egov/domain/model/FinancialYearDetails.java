package org.egov.domain.model;


import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Represents a single financial year object for a transaction.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinancialYearDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String financialYear;
    private String collectionPeriod;
    private String periodFrom;
    private String periodTo;
    private String propertyOwnershipType;
    private Double totalAmount;
    private Double finalAmount;

    private CalculationDetails components;  // Financial year components
}
