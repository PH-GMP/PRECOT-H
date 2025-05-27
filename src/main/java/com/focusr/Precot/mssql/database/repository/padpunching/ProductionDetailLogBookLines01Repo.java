package com.focusr.Precot.mssql.database.repository.padpunching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailLogBookLines01;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingSanitationListF24;


@Repository
public interface ProductionDetailLogBookLines01Repo extends JpaRepository<ProductionDetailLogBookLines01, Long> {

	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_LINES_F01 WHERE LINE_ID =:lineId", nativeQuery = true)
	ProductionDetailLogBookLines01 getLinesById(@Param("lineId") Long lineId);
	
}