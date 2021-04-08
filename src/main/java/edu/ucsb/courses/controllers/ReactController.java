package edu.ucsb.courses.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactController {
   @RequestMapping(value = {"/", "/{x:^(?!(api|swagger-ui)$)[\\w\\-]+}", "/{x:^(?!(api|swagger-ui)$).*$}/**/{y:[\\w\\-]+}"})
   public String getIndex() {
     return "/index.html";
   }
}
