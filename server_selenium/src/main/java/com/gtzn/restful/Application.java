package com.gtzn.restful;

import com.gtzn.restful.crawl.CompanyCrawl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import sun.misc.Signal;
import sun.misc.SignalHandler;

@SpringBootApplication()
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        //
        Signal sg = new Signal("TERM"); // kill -15 pid
        Signal.handle(sg, new SignalHandler() {
            @Override
            public void handle(Signal signal) {
                System.out.println("signal handle: " + signal.getName());

                // 监听信号量，通过System.exit(0)正常关闭JVM，触发关闭钩子执行收尾工作
                System.exit(0);
            }
        });

        //
        Signal sgInt = new Signal("INT"); // cirl + c
        Signal.handle(sgInt, new SignalHandler() {
            @Override
            public void handle(Signal signal) {
                System.out.println("signal handle: " + signal.getName());

                // 监听信号量，通过System.exit(0)正常关闭JVM，触发关闭钩子执行收尾工作
                System.exit(0);
            }
        });

        //
        Runtime run = Runtime.getRuntime();
        run.addShutdownHook(new Thread() {
            @Override
            public void run() {
                CompanyCrawl.getInstance().quit();
            }
        });

        //
        SpringApplication.run(Application.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }
}
