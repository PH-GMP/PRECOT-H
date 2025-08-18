package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.non_woven_F005;


@Repository
public interface non_woven_F005Repo extends JpaRepository<non_woven_F005, Long> {

	@Query(value="SELECT * FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT  WHERE QA_MNG_STATUS != 'QA_MANAGER_APPROVED' AND qa_inspector_STATUS = 'QA_INSPECTOR_APPROVED' ORDER BY TEST_ID DESC",nativeQuery = true)
	List<non_woven_F005> getAll();
	

	@Query(value="SELECT * FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT where BMR_NO = :bmr",nativeQuery = true)
	List<non_woven_F005> findbyBmr(@Param("bmr") String bmr);

	@Query(value="SELECT * \r\n"
			+ "FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT \r\n"
			+ "WHERE ( qa_inspector_STATUS = 'QA_INSPECTOR_SAVED' or qa_inspector_STATUS = 'QA_INSPECTOR_APPROVED')\r\n"
			+ "  AND (QA_MNG_STATUS IN ('WAITING_FOR_APPROVAL', 'QA_MANAGER_REJECTED')OR QA_MNG_STATUS IS NULL) ORDER BY TEST_ID DESC",nativeQuery = true)
	List<non_woven_F005> approveList();

	@Query(value="SELECT * FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT WHERE QA_MNG_STATUS = 'QA_MANAGER_APPROVED' AND BMR_NO = :bmr",nativeQuery = true)
	List<non_woven_F005> print(@Param("bmr")String bmr);

//	@Query(value="SELECT Brand , MixDesc , PGSM, PatternDesc , ShaftNo FROM TblRgoods where nBaleNo = :bmr",nativeQuery = true)
//	List<Object[]> pdeData(String bmr);
	
	@Query(value = "SELECT DISTINCT ShaftNo ,Brand , MixDesc , PGSM, PatternDesc FROM TblRgoods where POrder = :bmr", nativeQuery = true)
	List<Object[]> pdeData(String bmr);


	@Query(value = "select POrder,CMon from tblOrderInfo;", nativeQuery = true)
	List<Object[]> fetchAllBatchNumbersAndDates();
	
	
	@Query(value="SELECT Brand , MixDesc , PGSM, PatternDesc , ShaftNo FROM TblRgoods where nBaleNo = :bmr",nativeQuery = true)
	List<Object[]> nonWovenPde(String bmr);
	

}
