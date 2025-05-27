package com.focusr.Precot.mssql.database.config;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackages = {"com.focusr.Precot.mssql.database.repository", "com.focusr.Precot.QA.repository","com.focusr.Precot.Buds.repository", "com.focusr.Precot.Buds.model"},
    entityManagerFactoryRef = "sqlServerEntityManagerFactory",
    transactionManagerRef = "sqlServerTransactionManager"
)
public class MsSQLServerConfig {
	
	 private static final Logger logger = LoggerFactory.getLogger(MsSQLServerConfig.class);


    private final DataSource dataSource;

    @Autowired
    public MsSQLServerConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean sqlServerEntityManagerFactory() {
    	 logger.info("Configuring EntityManagerFactory");
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("com.focusr.Precot.mssql.database.model", "com.focusr.Precot.mssql.database.repository", "com.focusr.Precot.QA.model","com.focusr.Precot.QA.model.audit","com.focusr.Precot.QA.repository","com.focusr.Precot.Buds.repository", "com.focusr.Precot.Buds.model");
        em.setPersistenceUnitName("sqlServerPU");
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect", "org.hibernate.dialect.SQLServer2012Dialect");
        properties.setProperty("hibernate.show_sql", "true");
        properties.setProperty("hibernate.hbm2ddl.auto", "update");

        em.setJpaProperties(properties);
        logger.info("EntityManagerFactory configured");

        return em;
    }

    @Bean
    public PlatformTransactionManager sqlServerTransactionManager(EntityManagerFactory sqlServerEntityManagerFactory) {
        logger.info("Configuring TransactionManager");
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(sqlServerEntityManagerFactory);
        logger.info("TransactionManager configured");
        return transactionManager;
    }
}


