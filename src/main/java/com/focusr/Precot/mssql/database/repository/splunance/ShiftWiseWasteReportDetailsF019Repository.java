package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseWasteReportDetailsF019;
public interface ShiftWiseWasteReportDetailsF019Repository extends JpaRepository<ShiftWiseWasteReportDetailsF019,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_DETAILS_F019 WHERE DETAIL_ID = :detailId ", nativeQuery = true)
	ShiftWiseWasteReportDetailsF019 findFormById(@Param("detailId") long detailId);
	
}
