package com.demo.mock_project.controller;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

import javax.validation.Valid;

import com.demo.mock_project.entity.ImportGoodsEntity;
import com.demo.mock_project.mapper.ImportGoodsMapper;
import com.demo.mock_project.model.ImportGoodsModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.ImportGoodsRepository;
import com.demo.mock_project.service.ImportGoodsService;
import com.demo.mock_project.utils.ModelMapperStandardUtil;
import com.demo.mock_project.utils.ModelMapperUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/import-goods")
@RequiredArgsConstructor
public class ImportGoodsController {
    private final ImportGoodsRepository purchasesOrderRepository;
    private final ImportGoodsService importGoodsService;
    private final ModelMapperStandardUtil modelMapper;
    private final Logger logger = LoggerFactory.getLogger(ImportGoodsController.class);
    private final JdbcTemplate jdbcTemplate;

    @GetMapping("/{id}")
    public ResponseEntity<ImportGoodsModel> getImportGoods(@PathVariable("id") Long id) {
        ImportGoodsEntity importGoodsEntity = importGoodsService.findById(id);
        ImportGoodsModel importGoodsModel = modelMapper.map(importGoodsEntity, ImportGoodsModel.class);
        importGoodsModel.setAccountName(importGoodsEntity.getAccount().getFullName());
        return ResponseEntity.ok(importGoodsModel);
    }

    @GetMapping
    public ResponseEntity<ResultModel> getImportGoods(@RequestParam(value = "page", defaultValue = "1") int page,
                                                      @RequestParam(value = "size", defaultValue = "10") int size,
                                                      @RequestParam(value = "sort", defaultValue = "id") String sort,
                                                      @RequestParam(value = "sortType", defaultValue = "desc") String order,
                                                      @RequestParam(value = "status", defaultValue = "") String status,
                                                      @RequestParam(value = "search", defaultValue = "") String search,
                                                      @RequestParam(value = "startDate") String startDate, @RequestParam(value = "endDate") String endDate)
            throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date start = null;
        Date end = null;

        logger.info("search: {}", search);
        if (!startDate.equals("") || !endDate.equals("")) {
            if (!startDate.equals("")) {
                start = format.parse(startDate);
                logger.info("startDate: " + start);
            }
            if (!endDate.equals("")) {
                end = format.parse(endDate);
                return ResponseEntity.ok(importGoodsService.findAll(page, size, sort, order, search, start, end));
            } else {
                return ResponseEntity
                        .ok(importGoodsService.findAll(page, size, sort, order, search, start, new Date()));
            }
        }
        return ResponseEntity.ok(importGoodsService.findAll(page, size, sort, order, search));
    }

    @GetMapping("/suppliers/{supplierId}")
    public ResponseEntity<?> getBySupplierId(@PathVariable("supplierId") Long supplierId,
                                             @RequestParam(value = "page", defaultValue = "1") int page,
                                             @RequestParam(value = "size", defaultValue = "10") int size,
                                             @RequestParam(value = "sort", defaultValue = "id") String sort,
                                             @RequestParam(value = "sortType", defaultValue = "asc") String order,
                                             @RequestParam(value = "status", defaultValue = "2") String status,
                                             @RequestParam(value = "code", defaultValue = "") String code,
                                             @RequestParam(value = "startDate", defaultValue = "") String startDate,
                                             @RequestParam(value = "endDate", defaultValue = "") String endDate) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date start = null;
        Date end = null;
        logger.info("start: {}, end: {}", startDate, endDate);
        if (!startDate.equals("") || !endDate.equals("")) {
            if (!startDate.equals("")) {
                start = format.parse(startDate);
            }
            if (!endDate.equals("")) {
                end = format.parse(endDate);
                return ResponseEntity.ok(importGoodsService.findAll(page, size, sort, order, supplierId,
                        Integer.parseInt(status), code, start, end));
            } else {
                return ResponseEntity
                        .ok(importGoodsService.findAll(page, size, sort, order, supplierId, Integer.parseInt(status),
                                code, start, new Date()));
            }
        }
        return ResponseEntity
                .ok(importGoodsService.findAll(page, size, sort, order, supplierId, Integer.parseInt(status), code));
    }

    @GetMapping("/total-purchase/{supplierId}")
    public ResponseEntity<?> getTotalPurchases(@PathVariable("supplierId") Long supplierId) {
        Long total = purchasesOrderRepository.countBySupplierId(supplierId);
        BigDecimal totalMoney = jdbcTemplate.queryForObject(
                "SELECT SUM(total_price) FROM purchase_order WHERE supplier_id = ?",
                new Object[] { supplierId }, BigDecimal.class);
        logger.info("count: {}", totalMoney);
        Object[] result = new Object[2];
        result[0] = total;
        result[1] = totalMoney;
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<ImportGoodsModel> createImportGoods(@Valid @RequestBody ImportGoodsModel model) {
        logger.info("model: {}", model.toString());
        return ResponseEntity.ok(modelMapper.map(importGoodsService.create(model),
                ImportGoodsModel.class));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImportGoodsModel> updateImportGoods(@PathVariable("id") Long id,
                                                              @Valid @RequestBody ImportGoodsModel model) {
        logger.info("model: {}", model.toString());
        return ResponseEntity.ok(modelMapper.map(importGoodsService.update(model), ImportGoodsModel.class));
    }

    public static Date covertDate(String date) throws ParseException {
        SimpleDateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd");
        return myFormat.parse(date);
    }
}
