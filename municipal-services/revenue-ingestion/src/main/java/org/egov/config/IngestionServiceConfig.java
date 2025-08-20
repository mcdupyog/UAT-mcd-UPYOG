package org.egov.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.egov.domain.model.FinancialYearDetailsListConverter;
import org.egov.web.utils.IngestionConstants;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.TimeZone;


@Slf4j
@Configuration
@EnableConfigurationProperties(IngestionConfiguratonProperties.class)
public class IngestionServiceConfig {

    @Bean
    public ObjectMapper objectMapper() {
        String resolvedTimeZone = "UTC";
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
        objectMapper.setDateFormat(new SimpleDateFormat(IngestionConstants.DATE_FORMAT, Locale.ENGLISH));
        objectMapper.setTimeZone(TimeZone.getTimeZone(resolvedTimeZone));
        return objectMapper;
    }

    @Bean
    public MappingJackson2HttpMessageConverter jacksonConverter(ObjectMapper objectMapper) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(objectMapper);
        return converter;
    }

    @Bean
    public static BeanFactoryPostProcessor converterInjector() {
        return bf -> {
            FinancialYearDetailsListConverter converter = bf.getBean(FinancialYearDetailsListConverter.class);
            ((AutowireCapableBeanFactory) bf).autowireBean(converter);
        };
    }

    @Bean
    public FinancialYearDetailsListConverter financialYearDetailsListConverter() {
        return new FinancialYearDetailsListConverter();
    }

}