package com.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication          //  This is what matters
public class Application {      // Class name can be anything

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);  //  default for all the main when you load from the spring initializer
	}

}