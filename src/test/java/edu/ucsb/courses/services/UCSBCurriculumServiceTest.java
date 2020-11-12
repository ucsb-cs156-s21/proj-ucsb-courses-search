package edu.ucsb.courses.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import edu.ucsb.courses.models.GoogleUserProfile;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;


@ExtendWith(SpringExtension.class)
public class UCSBCurriculumServiceTest {

    @Mock
    private RestTemplate restTemplate;
  
    @InjectMocks
    private UCSBCurriculumService ucs;
  
    @Test
    public void test_getJSON() throws Exception {
        String expectedResult = "{expectedResult}";

      when(restTemplate.exchange(any(String.class), eq(HttpMethod.GET), any(HttpEntity.class),
          eq(String.class)))
              .thenReturn(new ResponseEntity<String>(expectedResult, HttpStatus.OK));
  
      String subjectArea = "CMPSC";
      String quarter="20201";
      String level="L";

      String result = ucs.getJSON(subjectArea,quarter,level);

      assertEquals(expectedResult,result);
    }

}