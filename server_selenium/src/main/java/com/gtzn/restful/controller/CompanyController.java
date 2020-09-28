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
    private CompanyCrawl crawlInstance = CompanyCrawl.getInstance();
    private static boolean proceeding = false;

    //
    @GetMapping("/fetchCompanyList")
    public CompanyList fetch(@RequestParam(value = "name", required = true) String name) {
        if(proceeding)
        {
            return new CompanyList(1, "进行中, 请稍后再试或者检查是否需要重新登录", new ArrayList());
        }
        proceeding = true;

        //
        try
        {
            List<Company> companyList = crawlInstance.fetchCompanyInfo(name);

            //
            return new CompanyList(0, "", companyList);
        } catch (Exception e) {
            //
            return new CompanyList(1, "获取单位信息失败: " + e.toString(), new ArrayList());
        } finally {
            proceeding = false;
        }
    }

    //
    @PostMapping("/QRCodeManulLogin")
    public Normal QRCodeManulLogin() {
        if(proceeding)
        {
            return new Normal(1, "进行中, 请稍后再试或者检查是否需要重新登录", "");
        }
        proceeding = true;

        //
        try
        {
            crawlInstance.QRCodeManulLogin();

            //
            return new Normal(0, "", "");
        } catch(Exception e)
        {
            //
            return new Normal(1, e.toString(), "");
        } finally {
            proceeding = false;
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
