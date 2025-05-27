//package com.focusr.Precot.mssql.database.repository.bleaching;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;
//import com.focusr.Precot.mssql.database.model.bleaching.BleachStoppageDetailsF36;
//
//@Repository
//public interface BleachStoppageDetailsF36Repository extends JpaRepository<BleachStoppageDetailsF36, Long>{
//	
//	@Query(value = "SELECT * FROM BLEACH_STOPPAGE_DETAILS_F36 WHERE SLB_ID = :slb_id", nativeQuery = true)
//	 List<BleachStoppageDetailsF36> getdetaisByMappedId(@Param("slb_id") Long slb_id);
//
//}
