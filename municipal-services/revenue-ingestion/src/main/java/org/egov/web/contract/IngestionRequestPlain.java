package org.egov.web.contract;

import lombok.Data;

@Data
public class IngestionRequestPlain {
    String startDate;
    String endDate;
    String applicationCode;
    String limit;
    String cursor;
}
