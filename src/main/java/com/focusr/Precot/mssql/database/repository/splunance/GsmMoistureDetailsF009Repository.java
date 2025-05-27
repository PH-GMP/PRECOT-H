//package com.focusr.Precot.mssql.database.repository.splunance;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import com.focusr.Precot.mssql.database.model.splunance.GsmMoistureDetailsF009;
//
//public interface GsmMoistureDetailsF009Repository extends JpaRepository<GsmMoistureDetailsF009,Long>{
//
//	@Query(value = "SELECT * FROM precot.SPUNLACE_GSM_MOISTURE_DETAILS_F009 WHERE DETAIL_ID = :detailId ", nativeQuery = true)
//	GsmMoistureDetailsF009 findFormById(@Param("detailId") long detailId);
//
//}
