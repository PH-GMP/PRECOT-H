package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContRawCottonHistoryF04;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;

@Repository
public interface BleachAppliedContRawCottonF04RepositoryHistory extends JpaRepository<BleachAppliedContRawCottonHistoryF04, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_HISTORY_F04 WHERE BMR_NUMBER=:laydown", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("laydown") String laydown);

	
	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_HISTORY_F04 WHERE BMR_NUMBER=:laydown AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_HISTORY_F04 WHERE BMR_NUMBER=:laydown)", nativeQuery = true)
	BleachAppliedContRawCottonHistoryF04 fetchLastSubmittedRecordLaydown(@Param("laydown") String laydown);
	
	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_HISTORY_F04 WHERE BMR_NUMBER=:laydown", nativeQuery = true)
	List<BleachAppliedContRawCottonHistoryF04> fetchLaydownHistories(@Param("laydown") String laydown);
	
	
	// EXCEL
	
		@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_HISTORY_F04 where (:bmr IS NULL OR BMR_NUMBER=:bmr) AND \r\n"
				+ "(DATE between :start AND :end) ORDER BY DATE asc;", nativeQuery = true)
		List<BleachAppliedContRawCottonHistoryF04> fetchConsRawCotton(@Param("bmr") String bmr,@Param("start") String start, @Param("end") String end);
		
		@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_HISTORY_F04", nativeQuery = true)
		String findMinimumCreationDate();
		
		@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_HISTORY_F04", nativeQuery = true)
		String findMaximumCreationDate();

		
		@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_HISTORY_F04 WHERE "
				+ "(:start IS NULL OR :end IS NULL OR DATE BETWEEN :start AND :end)"
				+ "AND (:bmr IS NULL OR BMR_NUMBER=:bmr)", nativeQuery = true)
		List<BleachAppliedContRawCottonHistoryF04> fetchRawCottonExcel(@Param("bmr") String bmr,@Param("start") String start, @Param("end") String end);
	
}
