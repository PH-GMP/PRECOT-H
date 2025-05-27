package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.physicalchemalLabCLF001;
import com.focusr.Precot.mssql.database.model.QcAudit.non_woven_F005_history;
import com.focusr.Precot.mssql.database.model.QcAudit.physicalchemalLabCLF001History;

@Repository
public interface physicalchemalLabCLF001HistoryRepo extends JpaRepository<physicalchemalLabCLF001History, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE_HISTORY WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersiongetMaximumVersion(@Param("date")  String date);

	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE_HISTORY WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE_HISTORY WHERE DATE=:date)", nativeQuery = true)
	physicalchemalLabCLF001History fetchLastSubmittedRecordPhNumber(@Param("date")  String date);

}
