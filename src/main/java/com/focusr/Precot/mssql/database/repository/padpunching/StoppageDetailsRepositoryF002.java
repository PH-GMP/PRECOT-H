package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.Optional;

import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.focusr.Precot.mssql.database.model.padpunching.StoppageDetailsF002;

public interface StoppageDetailsRepositoryF002 extends JpaRepository<StoppageDetailsF002, Long>{
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_STOPPAGE_DETAILS_F002 WHERE REPORT_ID = :reportId", nativeQuery = true)
	Optional<StoppageDetailsF002> findFormById(@Param("reportId") long reportId);
}
