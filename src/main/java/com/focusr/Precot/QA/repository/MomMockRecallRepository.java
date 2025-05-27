package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.ListOfGHpWc;
import com.focusr.Precot.QA.model.MomMockRecall;

public interface MomMockRecallRepository extends JpaRepository<MomMockRecall, Long> {
	
	
	@Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_TBL WHERE MOM_ID = :id", nativeQuery = true)
	MomMockRecall findFormById(@Param("id") long id);
	
	
	
	@Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_TBL WHERE  PLANT_HEAD_STATUS != 'PLANT_HEAD_APPROVED' ORDER BY MOM_ID DESC", nativeQuery = true)
	List<MomMockRecall> qaManagerSummary();
	
	@Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_TBL WHERE DATE =:date", nativeQuery = true)
	 MomMockRecall findByparam(@Param("date") String date);
	
	
	


	@Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_TBL WHERE MANAGER_STATUS = 'MANAGER_APPROVED' AND PLANT_HEAD_STATUS != 'PLANT_HEAD_APPROVED' ORDER BY MOM_ID DESC", nativeQuery = true)
	List<MomMockRecall> PlantHeadSummary();
	
	
	
	 @Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_TBL WHERE YEAR =:year AND DATE =:date", nativeQuery = true)
	 MomMockRecall findByparam(@Param("year") String year,@Param("date") String date);
	
	 
	 
	 @Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_TBL WHERE"
	            + "(:month IS NULL OR :month = '' OR MONTH = :month)"
	            + "AND (:year IS NULL OR :year = '' OR YEAR = :year)"
	            + "AND (:date IS NULL OR :date = '' OR DATE = :date)"
	            + "AND PLANT_HEAD_STATUS='PLANT_HEAD_APPROVED'", nativeQuery = true)
	   List<MomMockRecall>Print(@Param("year") String year, @Param("month") String month, @Param("date") String date);
		
		
	
	
	

}
