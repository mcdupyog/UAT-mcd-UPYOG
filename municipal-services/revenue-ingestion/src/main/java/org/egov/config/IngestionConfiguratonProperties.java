package org.egov.config;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.annotation.PostConstruct;


@Slf4j
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ConfigurationProperties(prefix = "egov")
public class IngestionConfiguratonProperties {

    private String timezone;

    // MDMS Related
    private String mdmsHost;
    private String mdmsEndPoint;

    // Persister
    private String saveRevenueIngestionTopic;

    // Employee
    private String allowedEmployeeSearchParameters;

    // Workflow
    private String wfHost;
    private String wfTransitionPath;
    private String wfBusinessServiceSearchPath;
    private String wfProcessPath;

    // NIC Integration
    private String tpNicHost;
    private String tpNicFetchEndpoint;
    private String tpNicTokenEndpoint;
    private String tpNicRequestNo;
    private boolean tpNicMockMode;

    @PostConstruct
    public void logConfig() {
        log.info("tpNicHost = {}", tpNicHost);
        log.info("tpNicFetchEndpoint = {}", tpNicFetchEndpoint);
        log.info("tpNicMockMode = {}", tpNicMockMode);
        log.info("mdmsHost = {}", mdmsHost);
        log.info("mdmsEndPoint = {}", mdmsEndPoint);
    }

}