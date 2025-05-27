package com.focusr.Precot.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class WebMvcConfigDatabase extends WebMvcConfigurerAdapter {

    private static final Logger logger = LoggerFactory.getLogger(WebMvcConfigDatabase.class);

    @Bean
    @Primary
    public OpenEntityManagerInViewFilter securityOpenEntityManagerInViewFilter() {
        logger.info("Configuring OpenEntityManagerInViewFilter");
        OpenEntityManagerInViewFilter osivFilter = new OpenEntityManagerInViewFilter();
        osivFilter.setEntityManagerFactoryBeanName("sqlServerEntityManagerFactory");
        logger.info("OpenEntityManagerInViewFilter configured");
        return osivFilter;
    }
}
