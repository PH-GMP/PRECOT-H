package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.LayDownBaleNoMapping;

@Repository
public interface LayDownBaleNoMappingRepository extends JpaRepository<LayDownBaleNoMapping, Long> {
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LAYDOWN_BALENO_MAPPING WHERE LAYDOWN_NO=:laydownNo", nativeQuery = true)
	List<LayDownBaleNoMapping> getLaydownNo(@Param("laydownNo") String laydownNo);

	@Query(value = "SELECT BALE_NO FROM precot.DRYGOODS_LAYDOWN_BALENO_MAPPING WHERE LAYDOWN_NO=:laydownNumber", nativeQuery = true)
	List<String> baleNumListByLaydownNumber(@Param("laydownNumber") String laydownNumber);

	@Query(value = "SELECT DISTINCT LAYDOWN_NO FROM precot.DRYGOODS_LAYDOWN_BALENO_MAPPING WHERE START_DATE=:startDate", nativeQuery = true)
	List<String> getLaydownNumberbasedonDateAndShift(@Param("startDate") String startDate);
	
	@Query(value = "SELECT BALE_NO FROM precot.DRYGOODS_LAYDOWN_BALENO_MAPPING", nativeQuery = true)
	List<String> getBaleNO();

}
