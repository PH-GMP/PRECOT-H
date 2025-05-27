package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.NumberGeneration;


@Repository
public interface NumberGenerationRepository extends JpaRepository<NumberGeneration, Long>{

	@Query(value = "SELECT  TOP 1 * FROM precot.QA_FORMS_NUMBER_GENERATION WHERE FORMAT_NO =:formatNo ORDER BY ID DESC", nativeQuery = true)
	NumberGeneration findLastLaydown(@Param("formatNo") String formatNo);
	
	
}
