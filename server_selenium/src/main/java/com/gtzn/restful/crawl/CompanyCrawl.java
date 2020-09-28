package com.gtzn.restful.crawl;


import com.google.common.io.Files;
import com.gtzn.restful.Utils;
import com.gtzn.restful.bean.Company;

import lombok.Synchronized;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

import javax.xml.xpath.XPath;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class CompanyCrawl {
    //
    private static CompanyCrawl instance = null;
    public static CompanyCrawl getInstance() {
        if(instance == null)
        {
            instance = new CompanyCrawl();
        }

        //
        return instance;
    }

    //
    private WebDriver driver = null;
    private CompanyCrawl()
    {
        System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir") + File.separator + "chromedriver.exe");

        //
        if(driver != null)
        {
            driver.quit();
        }

        //
        driver = new ChromeDriver();
    }

    //
    public String fetchScreenshot() throws Exception
    {
        File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);

        //
        Files.copy(scrFile, new File(System.getProperty("user.dir") + "\\screenShot\\" + scrFile.getName()));

        //
        return scrFile.getName();
    }

    @Synchronized
    public void QRCodeManulLogin() throws Exception
    {
        //
        driver.get(Constants.qichchaLoginPage);

        // switch to QRCode loign
        WebElement QRCodeButton = driver.findElement(By.xpath("//*[@id=\"qrcodeLogin\"]"));
        QRCodeButton.click();

        while(true)
        {
            // check if login success
            if(!driver.getCurrentUrl().contains("user_login"))
            {
                break;
            }

            // check if need refresh qr code
            WebElement mark = driver.findElement(By.xpath("//*[@id=\"qrcodeLoginQr\"]/div/div"));
            if(mark.getText().equals("二维码已失效"))
            {
                // refresh qr code
                driver.findElement(By.xpath("//*[@id=\"qrcodeLoginQr\"]/div/a")).click();
            }
            else
            {
                throw new Exception("登录页面二维码刷新出现问题, 请联系开发人员");
            }
        }
    }

    @Synchronized
    public List<Company> fetchCompanyInfo(final String shortName) throws Exception {
        /**
         * 查询首页
         */
        driver.get(Constants.qichachaMainPage);

        // type in
        WebElement shortNameWebElement = driver.findElement(By.xpath("//*[@id=\"company-name\"]"));
        shortNameWebElement.sendKeys(shortName);

        // click search
        WebElement confirm = driver.findElement(By.xpath("//*[@id=\"V3_Brands_Search\"]/div/span/input"));
        confirm.click();

        /**
         * 判断是否需要登录
         */
        String currentUrl = driver.getCurrentUrl();
        if(currentUrl.contains("user_login"))
        {
            // 提示用户进行登录
            throw new Exception("请到对应的网址完成登录操作");
        }

        /**
         * 判断是否已经登录
         */
        WebElement personalSetting = driver.findElement(By.xpath("/html/body/header/div/ul/li[9]/a"));
        String fullNameXPath = "/html/body/div[2]/div/div[1]/section/div[2]/div/section/a/div/div/span";
        String taxNoXPath = "/html/body/div[2]/div/div[1]/section/div[2]/div/section/a/div/div/p";
        if(personalSetting != null)
        {
            fullNameXPath = "/html/body/div[1]/div/div[1]/section/div[2]/div/section/a/div/div/span";
            taxNoXPath = "/html/body/div[1]/div/div[1]/section/div[2]/div/section/a/div/div/p";
        }

        /**
         * 获取结果
         */
        List<WebElement> fullNameList = driver.findElements(By.xpath(fullNameXPath));
        List<WebElement> taxNoList = driver.findElements(By.xpath(taxNoXPath));

        //
        List<Company> companyList = new ArrayList<>();
        for (WebElement element : fullNameList) {
            String name = Utils.replaceBlank(element.getText().replace("<em>", "").replace("</em>", ""));

            //
            companyList.add(new Company(name, ""));
        }
        for (int i = 0; i < taxNoList.size(); i++) {
            //
            String taxNo = taxNoList.get(i).getText().replace("税号：", "");

            //
            Company company = companyList.get(i);
            company.setTaxNo(taxNo);
        }

        //
        return companyList;
    }
}
