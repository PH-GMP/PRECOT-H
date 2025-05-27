package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.ListOfGHpWcTypes;

public interface ListOfGHpWcTypesRepository  extends JpaRepository<ListOfGHpWcTypes, Long>{
	
	
	@Query(value = "SELECT * FROM precot.LIST_OF_GHPWC_TYPES WHERE TYPES_ID = :types_id", nativeQuery = true)
	ListOfGHpWcTypes findFormById(@Param("types_id") long types_id);

}
