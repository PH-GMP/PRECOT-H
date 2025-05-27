package com.focusr.Precot.mssql.database.repository.splunance;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationListF025;

public interface SpunlaceHandSanitizationListF025Repository extends JpaRepository<SpunlaceHandSanitizationListF025,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_HAND_SANITIZATION_LIST_F025 WHERE LIST_ID = :listId ", nativeQuery = true)
	SpunlaceHandSanitizationListF025 findFormById(@Param("listId") long listId);

}
