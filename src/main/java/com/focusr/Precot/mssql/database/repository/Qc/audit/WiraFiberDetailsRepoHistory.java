package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.WiraFiberDetails;
import com.focusr.Precot.mssql.database.model.QcAudit.WiraFiberDetailsHistory;

@Repository
public interface WiraFiberDetailsRepoHistory extends JpaRepository<WiraFiberDetailsHistory, Long> {
    
    // Find all details associated with a specific parent ID
    List<WiraFiberDetailsHistory> findByParentId(Long parentId);

    @Query(value = "SELECT * FROM precot.WIRA_FIBER_DETAILS_HISTORY WHERE ID = :id ", nativeQuery = true)
    WiraFiberDetailsHistory findFormById(@Param("id") long id);


    
}
