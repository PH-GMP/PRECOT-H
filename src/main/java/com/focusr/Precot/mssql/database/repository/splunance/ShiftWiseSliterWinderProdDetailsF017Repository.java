package com.focusr.Precot.mssql.database.repository.splunance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseSliterWinderProdDetailsF017;

public interface ShiftWiseSliterWinderProdDetailsF017Repository extends JpaRepository<ShiftWiseSliterWinderProdDetailsF017,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_DETAILS_F017 WHERE DETAIL_ID = :detailId ", nativeQuery = true)
	ShiftWiseSliterWinderProdDetailsF017 findFormById(@Param("detailId") long detailId);

}
