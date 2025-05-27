package com.focusr.Precot.mssql.database.repository.Qc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookDetail;


import java.util.List;

@Repository
public interface SampleInwardBookDetailRepository extends JpaRepository<SampleInwardBookDetail, Long> {
    
    // Find all details associated with a specific parent ID
    List<SampleInwardBookDetail> findByParentId(Long parentId);

    @Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_DETAIL WHERE ID = :id ", nativeQuery = true)
    SampleInwardBookDetail findFormById(@Param("id") long id);


    
}
