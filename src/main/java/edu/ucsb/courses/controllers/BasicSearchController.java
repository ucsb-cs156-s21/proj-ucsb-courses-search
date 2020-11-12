package edu.ucsb.courses.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class BasicSearchController {
    private final Logger logger = LoggerFactory.getLogger(BasicSearchController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/basicsearch")
    public ResponseEntity<String> basicsearch(@RequestParam String qtr, @RequestParam String dept,
            @RequestParam String level) throws JsonProcessingException {

        Map<String,String> dummyDataMap = new HashMap<>();
        dummyDataMap.put("qtr",qtr);
        dummyDataMap.put("dept",dept);
        dummyDataMap.put("level",level);
        String dummyJSONData = mapper.writeValueAsString(dummyDataMap);

        String body = dummyJSONData; // eventually replace with call to get real data

        return ResponseEntity.ok().body(body);
    }

}
