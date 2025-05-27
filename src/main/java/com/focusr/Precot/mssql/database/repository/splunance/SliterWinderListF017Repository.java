package com.focusr.Precot.mssql.database.repository.splunance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.SliterWinderListF017;

public interface SliterWinderListF017Repository extends JpaRepository<SliterWinderListF017,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_SLITER_WINDER_PRODUCTION_DETAILS_F017 WHERE SW_ID = :swId ", nativeQuery = true)
	SliterWinderListF017 findFormById(@Param("swId") long swId);
}
