package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookDetail;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalDetails;

@Repository
public interface SwabMicrobiologicalDetailsRepo extends JpaRepository<SwabMicrobiologicalDetails, Long> {
    
    // Find all details associated with a specific parent ID
    List<SwabMicrobiologicalDetails> findByParentId(Long parentId);

    @Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_DETAILS WHERE ID = :id ", nativeQuery = true)
    SwabMicrobiologicalDetails findFormById(@Param("id") long id);


    
}
