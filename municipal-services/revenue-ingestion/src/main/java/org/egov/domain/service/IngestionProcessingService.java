//package org.egov.domain.service;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.egov.domain.model.IngestionTransaction;
//import org.egov.repository.IngestionTransactionRepository;
//import org.egov.repository.IntegrationTransactionProcessingQueueRepository;
//import org.egov.web.utils.GLCodeMappingService;
//import org.egov.web.utils.VoucherMapper;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class IngestionProcessingService {
//
//    private final IntegrationTransactionProcessingQueueRepository queueRepository;
//    private final IngestionTransactionRepository processedRepository;
//    private final VoucherPostingService voucherPostingService;
//    private final VoucherMapper voucherMapper;
//    private final GLCodeMappingService glCodeMappingService;
//
//    @Transactional
//    public void processReceivedRecords() {
//        List<IngestionTransaction> records = queueRepository.findByStatus("RECEIVED");
//
//        for (IngestionTransaction record : records) {
//            try {
//                // Load GL Mappings into cache if needed
//                glCodeMappingService.loadMappings(record.getTenantId(), record.getServiceCode(), record.getRequestInfo());
//
//                // Map to voucher
//                VoucherRequest request = voucherMapper.mapToVoucherRequest(record, glCodeMappingService);
//
//                // Post to finance module
//                String voucherRef = voucherPostingService.postVoucher(request);
//
//                // Save processed record
//                record.setStatus("PROCESSED");
//                record.setVoucherReference(voucherRef);
//                record.setProcessedAt(java.time.LocalDateTime.now());
//                processedRepository.save(record);
//
//                // Delete from queue
//                queueRepository.delete(record);
//
//            } catch (Exception ex) {
//                log.error("Error processing record: {}", record.getReferenceDocument(), ex);
//                record.setStatus("FAILED");
//                record.incrementRetryCount();
//                record.setErrorMessage(ex.getMessage());
//                queueRepository.save(record);
//            }
//        }
//    }
//}