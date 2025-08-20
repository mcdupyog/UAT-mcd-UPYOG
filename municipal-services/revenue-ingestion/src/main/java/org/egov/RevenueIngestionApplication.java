package org.egov;

import org.egov.config.IngestionConfiguratonProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@EnableConfigurationProperties(IngestionConfiguratonProperties.class)
//@Import({TracerConfiguration.class})
@ComponentScan(basePackages = {
        "org.egov",                        // include all your app packages
        "org.egov.config"                 // specifically ensure config package is scanned
})
public class RevenueIngestionApplication {

    public static void main(String[] args) {
        SpringApplication.run(RevenueIngestionApplication.class, args);
    }
}
