package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.ControlOfGHpWcTypes;

public interface ControlOfGHpWcTypesRepository extends JpaRepository<ControlOfGHpWcTypes, Long> {

	@Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC_TYPES WHERE TYPES_ID = :types_id", nativeQuery = true)
	ControlOfGHpWcTypes findFormById(@Param("types_id") long types_id);

}
