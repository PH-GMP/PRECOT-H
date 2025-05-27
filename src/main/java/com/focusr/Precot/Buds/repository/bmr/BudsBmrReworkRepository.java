package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrRework;

@Repository
public interface BudsBmrReworkRepository extends JpaRepository<BudsBmrRework, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_REWORK WHERE BMR_NUMBER=:bmrNumber", nativeQuery = true)
	List<BudsBmrRework> reworkListByBmrNumber(@Param("bmrNumber") String bmrNumber);
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_REWORK WHERE ID=:id", nativeQuery = true)
	BudsBmrRework reworkObjectById(@Param("id") Long id);
	
}
