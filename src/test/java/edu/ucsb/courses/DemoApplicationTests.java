package edu.ucsb.courses;

import static org.assertj.core.api.Assertions.assertThat;

import edu.ucsb.courses.controllers.AppController;
import edu.ucsb.courses.controllers.ReactController;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

  @Autowired
  private AppController appController;
  @Autowired
  private ReactController reactController;
  

  @Test
  void contextLoads() {
    assertThat(appController).isNotNull();
    assertThat(reactController).isNotNull();
  }

  // This test just provides coverage on the main method of DemoApplication.
  @Test
  public void applicationContextTest() {
    DemoApplication.main(new String[] {});
  }

}
