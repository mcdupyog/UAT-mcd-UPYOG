package org.egov.domain.model;

import lombok.*;
import org.egov.common.contract.request.RequestInfo;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoucherRequest {
    private RequestInfo requestInfo;
    private List<Voucher> vouchers;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Voucher {
        private String id;
        private String referenceDocument;
        private String name;
        private String tenantId;
        private String serviceName;
        private String type;
        private String voucherDate;
        private String voucherNumber;
        private String description;
        private Fund fund;
        private Function function;
        private Scheme scheme;
        private SubScheme subScheme;
        private String fundsource;
        private String fiscalPeriod;
        private String department;
        private String source;
        private List<Ledger> ledgers;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Fund {
        private String code;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Function {
        private String code;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Scheme {
        private String code;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SubScheme {
        private String code;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Ledger {
        private String glcode;
        private Double debitAmount;
        private Double creditAmount;
        private String description;
        private Function function;
        private List<SubLedgerDetail> subledgerDetails;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SubLedgerDetail {
        private AccountDetailType accountDetailType;
        private String accountDetailKey;
        private Double amount;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AccountDetailType {
        private String name;
    }
}
