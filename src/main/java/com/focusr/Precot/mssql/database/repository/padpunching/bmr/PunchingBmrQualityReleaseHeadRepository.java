package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsF004;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrQualityReleaseHeader;
import com.focusr.Precot.payload.padpunching.DailyProductionDetailsBmrResponse;

@Repository
public interface PunchingBmrQualityReleaseHeadRepository extends JpaRepository<PunchingBmrQualityReleaseHeader, Long>{

	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_QUALITY_RELEASE_HEADER WHERE QUALITY_ID=:id", nativeQuery = true)
	PunchingBmrQualityReleaseHeader getQualityReleaseHeaderById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_QUALITY_RELEASE_HEADER WHERE BATCH_NO=:order", nativeQuery = true)
	List<PunchingBmrQualityReleaseHeader> getQualityReleaseHeaderByOrder(@Param("order") String order);
	
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_QUALITY_RELEASE_HEADER WHERE DATE BETWEEN :fromdate AND :todate", nativeQuery = true)
	List<DailyProdPackingDetailsF004> getProductionDetailsByDateFields(@Param("fromdate") String fromdate, @Param("todate") String todate);
	
	
	/**
	 * DAILY PRODUCTION DETAILS - QUERY
	 */
	
	
	@Query(value = "SELECT f.PackDt AS packdate, f.ShiftID AS shiftId, f.JulianDay AS julianday, f.MCN AS machine, f.POrder AS orderNo, f.NCB AS ncb, f.NOC AS noc, f.NBAG AS bags, O.PoNo AS poNumber, O.Material AS material FROM tblFPpack f JOIN tblOrderinfo O ON f.POrder =O.POrder WHERE f.PackDt BETWEEN :fromdate AND :todate AND f.POrder=:order", nativeQuery = true)
	List<Object[]> productionDetailsSAP(@Param("fromdate") String fromdate, @Param("todate") String todate, @Param("order") String orderNo);
	
}
