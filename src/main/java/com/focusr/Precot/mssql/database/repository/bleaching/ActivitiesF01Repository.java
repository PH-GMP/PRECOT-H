package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachSMSActivitiesF01;


@Repository
public interface ActivitiesF01Repository  extends JpaRepository<BleachSMSActivitiesF01, Long>{

	
	@Query(value = "SELECT * FROM precot.BLEACH_SMS_F01_ACTIVITIES WHERE SMS_ID = :sms_id", nativeQuery = true)
	List<BleachSMSActivitiesF01> getActivitesf01(@Param("sms_id") Long sms_id);
}
