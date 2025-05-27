package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSampleReportDetailsF012;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSampleReportDetailsHistoryF012;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSampleReportHistoryF012;

@Repository
public interface SpunlaceSampleReportDetailsF012RepositoryHistory extends JpaRepository<SpunlaceSampleReportDetailsHistoryF012, Long> {
	
}
