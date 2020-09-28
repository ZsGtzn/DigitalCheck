package com.gtzn.restful.controller;

import com.gtzn.restful.bean.Company;
import com.gtzn.restful.bean.CompanyList;
import com.gtzn.restful.bean.Normal;
import com.gtzn.restful.crawl.CompanyCrawl;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@Log4j2
@RequestMapping("/qichacha")
public class CompanyController {

    private Logger logger = LogManager.getLogger("company");
    private CompanyCrawl crawlInstance = CompanyCrawl.getInstance();

    //
    @GetMapping("/fetchCompanyList")
    public CompanyList fetch(@RequestParam(value = "name", required = true) String name) {
        //
        try
        {
            List<Company> companyList = crawlInstance.fetchCompanyInfo(name);

            //
            return new CompanyList(0, "", companyList);
        } catch (Exception e) {
            //
            return new CompanyList(1, "获取单位信息失败: " + e.toString(), new ArrayList());
        }
    }

    //
    @PostMapping("/QRCodeManulLogin")
    public Normal QRCodeManulLogin() {
        try
        {
            crawlInstance.QRCodeManulLogin();

            //
            return new Normal(0, "", "");
        } catch(Exception e)
        {
            //
            return new Normal(1, e.toString(), "");
        }
    }

    //
    @GetMapping("/fetchScreenshot")
    public Normal fetchScreenshot()
    {
        try
        {
            String fileName = crawlInstance.fetchScreenshot();

            //
            return new Normal(0, "", fileName);
        }
        catch (Exception e)
        {
            //
            return new Normal(1, "createOrder throw exception: " + e.toString(), "");
        }
    }
}
