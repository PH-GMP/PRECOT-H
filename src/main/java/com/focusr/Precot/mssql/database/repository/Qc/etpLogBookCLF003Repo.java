package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.etpLogBookClF003;

@Repository
public interface etpLogBookCLF003Repo extends JpaRepository<etpLogBookClF003, Long>{

	 @Query(value = "SELECT * FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK WHERE DATE = :date",nativeQuery = true)
	 etpLogBookClF003 findByDate( @Param("date") String date);
	   
	   @Query(value="SELECT * FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK WHERE QC_STATUS != 'QC_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	  List<etpLogBookClF003> getAll();

		@Query(value="SELECT * FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK where chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
		List<etpLogBookClF003> chemistSaved();
		
		@Query(value="SELECT * FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK WHERE hod_STATUS = 'hod_APPROVED' AND DATE = :date",nativeQuery = true)
		List<etpLogBookClF003> print( @Param("date") String date);
		
		@Query(value="SELECT * FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK where chemist_STATUS = 'CHEMIST_SAVED'",nativeQuery = true)
		List<etpLogBookClF003> chemistSubmitted();
		
		@Query(value="SELECT * FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK where micro_STATUS = 'MICROBIOLOGIST_SAVED'",nativeQuery = true)
		List<etpLogBookClF003> microSaved();
		
		@Query(value="SELECT * FROM precot.ETP_LAB_SAMPLE_INWARD_BOOK where micro_STATUS = 'MICROBIOLOGIST_APPROVED'",nativeQuery = true)
		List<etpLogBookClF003> microSubmitted();
}
