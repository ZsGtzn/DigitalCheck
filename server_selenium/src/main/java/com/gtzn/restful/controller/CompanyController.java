package com.gtzn.restful.controller;

import com.gtzn.restful.bean.CompanyList;
import com.gtzn.restful.service.CompanyService;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;


import javax.annotation.Resource;

@RestController
@Log4j2
public class CompanyController {

    private Logger logger = LogManager.getLogger("company");

    //
    @Resource
    private CompanyService userInfoService;

    //
    @GetMapping("/companyList")
    public CompanyList getUserInfo(@RequestParam(value = "companyName", required = true) String openId) {
        return new CompanyList();
    }
}
