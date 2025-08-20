package org.egov.web.contract;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseInfo {
    private String apiId;
    private String authToken;
    private String tenantId;                    // e.g., pg.mcd
    private String msgId;
    private String date;            // Response generation or pull date (e.g., yyyy-MM-dd)
    private int count;              // Number of transactions returned
    private long lastProcessedId;   // For pagination / next batch fetch
}
