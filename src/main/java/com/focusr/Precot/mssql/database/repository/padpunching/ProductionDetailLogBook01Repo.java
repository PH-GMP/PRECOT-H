package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailsLogBook01;

@Repository
public interface ProductionDetailLogBook01Repo extends JpaRepository<ProductionDetailLogBook01, Long> {

	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE PROD_ID=:id", nativeQuery = true)
	ProductionDetailLogBook01 productionDetailsById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE PROD_ID =:id ", nativeQuery = true)
	ProductionDetailLogBook01 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE DATE=:date AND SHIFT=:shift ", nativeQuery = true)
	ProductionDetailLogBook01 productionDetailsByDateShift(@Param("date") String date, @Param("shift") String shift);

//	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE DATE = :date AND SHIFT = :shift AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<ProductionDetailLogBook01> productionDetailsPrint(@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY PROD_ID DESC", nativeQuery = true)
	List<ProductionDetailLogBook01> supervisorSummary();

	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY PROD_ID DESC", nativeQuery = true)
	List<ProductionDetailLogBook01> hodSummary();
	
	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 " +
            "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +
            "AND (:shift IS NULL OR :shift='' OR SHIFT = :shift) " +
            "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<ProductionDetailLogBook01> productionDetailsPrint(@Param("date") String date,@Param("shift") String shift);
	


}
