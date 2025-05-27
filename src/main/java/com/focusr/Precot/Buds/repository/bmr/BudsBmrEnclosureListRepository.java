package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrEnclosureListHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEnclosureList;

@Repository
public interface BudsBmrEnclosureListRepository extends JpaRepository<BudsBmrEnclosureListHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_ENCLOSURE_LIST_HEADER WHERE BATCH_NO=:batchNumber", nativeQuery = true)
	List<BudsBmrEnclosureListHeader> getEnclosureListByOrder(@Param("batchNumber") String batchNumber);
	
}
