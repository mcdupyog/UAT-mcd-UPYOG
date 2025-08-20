package org.egov.domain.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.List;

@Converter
public class FinancialYearDetailsListConverter implements AttributeConverter<List<FinancialYearDetails>, String> {

    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<FinancialYearDetails> attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert list to JSON", e);
        }
    }

    @Override
    public List<FinancialYearDetails> convertToEntityAttribute(String dbData) {
        try {
            JavaType type = mapper.getTypeFactory().constructCollectionType(List.class, FinancialYearDetails.class);
            return mapper.readValue(dbData, type);
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert JSON to list", e);
        }
    }
}
