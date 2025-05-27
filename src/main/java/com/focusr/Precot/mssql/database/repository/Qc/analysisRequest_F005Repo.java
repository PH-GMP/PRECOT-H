package com.focusr.Precot.mssql.database.repository.Qc;

import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.JpaRepositoryConfigExtension;
import org.springframework.data.jpa.repository.query.Jpa21Utils;

import com.focusr.Precot.mssql.database.model.Qc.analysisRequest_F005;

public interface analysisRequest_F005Repo extends JpaRepository<analysisRequest_F005, Long> {

}
