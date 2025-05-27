package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.physicalchemalLabCLF001;

@Repository
public interface physicalchemalLabCLF001Repo extends JpaRepository<physicalchemalLabCLF001, Long> {

	 @Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE WHERE DATE = :date",nativeQuery = true)
	 physicalchemalLabCLF001 findByDate( @Param("date") String date);
	   
	   @Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE WHERE QC_STATUS != 'QC_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	  List<physicalchemalLabCLF001> getAll();

		@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE where chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
		List<physicalchemalLabCLF001> chemistSaved();
		
		@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE where chemist_STATUS = 'CHEMIST_APPROVED' AND DATE = :date",nativeQuery = true)
		List<physicalchemalLabCLF001> print( @Param("date") String date);
		
		@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE where chemist_STATUS = 'CHEMIST_SAVED'",nativeQuery = true)
		List<physicalchemalLabCLF001> chemistSubmitted();
		
		@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE where micro_STATUS = 'MICRO_SAVED'",nativeQuery = true)
		List<physicalchemalLabCLF001> microSaved();
		
		@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMICAL_LAB_SAMPLE where micro_STATUS = 'MICROBIOLOGIST_APPROVED'",nativeQuery = true)
		List<physicalchemalLabCLF001> microSubmitted();

}
