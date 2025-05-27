package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingLines;

@Repository
public interface SliverMakingLinesRepository  extends JpaRepository<SliverMakingLines, Long>{

	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING_LINE_02 WHERE CAN_NO =:can_no AND CARDING_MC_NO = :carding_mc_no", nativeQuery = true)
	List<SliverMakingLines> getOrder(@Param("can_no")String can_no, @Param("carding_mc_no") String carding_mc_no);
	
	
}
