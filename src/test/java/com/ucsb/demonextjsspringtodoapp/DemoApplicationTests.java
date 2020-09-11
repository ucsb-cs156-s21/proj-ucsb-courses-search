package com.ucsb.demonextjsspringtodoapp;

import static org.assertj.core.api.Assertions.assertThat;

import com.ucsb.demonextjsspringtodoapp.controllers.AppController;
import com.ucsb.demonextjsspringtodoapp.controllers.ReactController;
import com.ucsb.demonextjsspringtodoapp.controllers.TodoController;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Autowired
	private AppController appController;
	@Autowired
	private ReactController reactController;
	@Autowired
	private TodoController todoController;

	@Test
	void contextLoads() {
		assertThat(appController).isNotNull();
		assertThat(reactController).isNotNull();
		assertThat(todoController).isNotNull();
	}

}
