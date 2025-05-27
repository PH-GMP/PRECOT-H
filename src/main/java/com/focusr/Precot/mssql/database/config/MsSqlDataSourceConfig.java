package com.focusr.Precot.mssql.database.config;


import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class MsSqlDataSourceConfig {
	
	 private static final Logger logger = LoggerFactory.getLogger(MsSqlDataSourceConfig.class);

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        logger.info("Configuring DataSource with URL: {}", url);
        System.out.println("Configuring DataSource with URL: " + url + ", Username: " + username + ", Password: " + password); // Debug statement
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        logger.info("DataSource configured with URL: {}, Username: {}", url, username);
        return dataSource;
    }
}
