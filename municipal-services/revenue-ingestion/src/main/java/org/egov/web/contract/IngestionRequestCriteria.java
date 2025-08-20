package org.egov.web.contract;

import lombok.*;
import org.egov.domain.exception.InvalidIngestionRequestCriteriaException;
//import org.egov.domain.exception.InvalidIngestionRequestCriteriaException;

import static org.springframework.util.StringUtils.isEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class IngestionRequestCriteria {

    private String uuid;
    private String tenantId;         // e.g., pg.citya — required for ULB scope
    private String applicationCode;      // e.g., PTR
    private String startDate;
    private String endDate;
    //private Long lastProcessedId;
    //private Integer batchSize;       // Max records to pull
    private String limit;
    private String cursor;

    public void validate() {
        if (isIdAbsent() || isTenantIdAbsent() || isStartDate() || isEndDate()  || isApplicationCode() || isCursor()) {
           throw new InvalidIngestionRequestCriteriaException(this.toString());
           // throw new IllegalArgumentException("IngestionRequestCriteria is required");
        }
    }

    public boolean isIdAbsent() {
        return isEmpty(uuid);
    }

    public boolean isTenantIdAbsent() {
        return isEmpty(tenantId);
    }

    public boolean isStartDate() {
        return isEmpty(startDate);
    }

    public boolean isEndDate() {
        return isEmpty(endDate);
    }

    public boolean isApplicationCode() {
        return isEmpty(applicationCode);
    }

    public boolean isCursor() {
        return isEmpty(cursor);
    }



    @Override
    public String toString() {
        return "IngestionRequestCriteria{" +
                "uuid='" + uuid + '\'' +
                ", tenantId='" + tenantId + '\'' +
                ", serviceCode='" + applicationCode + '\'' +
                ", cursor=" + cursor +
                ", fromDate=" + startDate +
                ", toDate=" + endDate +
                ", limit=" + limit +
                '}';
    }
}
