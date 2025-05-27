package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalDetails;
import com.focusr.Precot.mssql.database.model.Qc.WiraFiberDetails;

@Repository
public interface WiraFiberDetailsRepo extends JpaRepository<WiraFiberDetails, Long> {
    
    // Find all details associated with a specific parent ID
    List<WiraFiberDetails> findByParentId(Long parentId);

    @Query(value = "SELECT * FROM precot.WIRA_FIBER_DETAILS WHERE ID = :id ", nativeQuery = true)
    WiraFiberDetails findFormById(@Param("id") long id);


    
}
