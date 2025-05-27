package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.etpLogBookHistoryClF003;

@Repository
public interface etpLogBookHistoryClF003Repo extends JpaRepository<etpLogBookHistoryClF003, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK_HISTORY WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersiongetMaximumVersion(@Param("date") String date);

	
	@Query(value = "SELECT * FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK_HISTORY WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK_HISTORY WHERE DATE=:date)", nativeQuery = true)
	etpLogBookHistoryClF003 fetchLastSubmittedRecordPhNumber(@Param("date") String date);
}
