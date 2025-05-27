package com.focusr.Precot.mssql.database.repository.bleaching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryEnclosureList;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryVerification;

public interface BmrSummaryEnclosureListRepository extends JpaRepository<BmrSummaryEnclosureList, Long> {

	@Query(value = "SELECT * FROM precot.BMR_SUMMARY_ENCLOSURE WHERE ENCLOSURE_ID=:id", nativeQuery = true)
	BmrSummaryEnclosureList getSummaryRecordById(@Param("id") Long id);
	
}
