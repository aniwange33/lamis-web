package org.lamisplus;

import com.foreach.across.config.AcrossApplication;
import com.foreach.across.modules.hibernate.jpa.AcrossHibernateJpaModule;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.BaseModule;
import org.lamisplus.modules.base.config.ApplicationProperties;
import org.lamisplus.modules.security.LamisSecurityModule;
import org.lamisplus.restart.RestartModule;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.context.config.ConfigFileApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.Collections;

//import org.lamisplus.modules.ehr.EHRModule;

@AcrossApplication(
    modules = {
        BaseModule.NAME,
        AcrossHibernateJpaModule.NAME,
        LamisSecurityModule.NAME,
        RestartModule.NAME
        //EHRModule.NAME
    })
@Slf4j
public class LamisApplication {
    private static ConfigurableApplicationContext context;

    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(LamisApplication.class);
        springApplication.setDefaultProperties(Collections.singletonMap(ConfigFileApplicationListener.CONFIG_ADDITIONAL_LOCATION_PROPERTY, "${user.home}/dev-configs/lamis-application.yml"));
        context = springApplication.run(args);
    }

    public static void restart() {
        ApplicationArguments args = context.getBean(ApplicationArguments.class);

        Thread thread = new Thread(() -> {
            context.close();
            SpringApplication springApplication = new SpringApplication(LamisApplication.class);
            springApplication.setDefaultProperties(Collections.singletonMap(ConfigFileApplicationListener.CONFIG_ADDITIONAL_LOCATION_PROPERTY, "${user.home}/dev-configs/lamis-application.yml"));
            context = springApplication.run(args.getSourceArgs());
        });

        thread.setDaemon(false);
        thread.start();
    }
}
