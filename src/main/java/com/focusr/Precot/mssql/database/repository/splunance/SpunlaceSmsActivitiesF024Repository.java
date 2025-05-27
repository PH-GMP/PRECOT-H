package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSmsActivitiesF024;

public interface SpunlaceSmsActivitiesF024Repository extends JpaRepository<SpunlaceSmsActivitiesF024,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_SMS_ACTIVITIES_F024 WHERE ACTIVITY_ID = :activityId ", nativeQuery = true)
	SpunlaceSmsActivitiesF024 findFormById(@Param("activityId") long activityId);
}
