package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContAbCottonHistoryF08;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContAbCottonTypesHistoryF08;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;

@Repository
public interface BleachAppliedContAbCottonF08RepositoryHistory extends JpaRepository<BleachAppliedContAbCottonHistoryF08, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_APPLIED_CONT_AB_COTTON_HISTORY_F08 WHERE BMR_NUMBER=:laydown", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("laydown") String laydown);

	
	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_AB_COTTON_HISTORY_F08 WHERE BMR_NUMBER=:laydown AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_APPLIED_CONT_AB_COTTON_HISTORY_F08 WHERE BMR_NUMBER=:laydown)", nativeQuery = true)
	BleachAppliedContAbCottonHistoryF08 fetchLastSubmittedRecordLaydown(@Param("laydown") String laydown);
	
	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_AB_COTTON_HISTORY_F08 WHERE BMR_NUMBER=:laydown", nativeQuery = true)
	List<BleachAppliedContAbCottonHistoryF08> fetchLaydownHistories(@Param("laydown") String laydown);
	
	
	// EXCEL
	
		@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_AB_COTTON_HISTORY_F08 where BMR_NUMBER LIKE :bmr AND \r\n"
				+ "DATE between :start AND :end ORDER BY DATE asc;", nativeQuery = true)
		List<BleachAppliedContAbCottonHistoryF08> fetchConsABCotton(@Param("bmr") String bmr,@Param("start") String start, @Param("end") String end);
		
		@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_APPLIED_CONT_AB_COTTON_HISTORY_F08", nativeQuery = true)
		String findMinimumCreationDate();
		
		@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_APPLIED_CONT_AB_COTTON_HISTORY_F08", nativeQuery = true)
		String findMaximumCreationDate();
		

	
}
