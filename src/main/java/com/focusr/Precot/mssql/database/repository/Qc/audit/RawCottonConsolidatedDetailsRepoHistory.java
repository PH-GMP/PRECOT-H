package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.Qc_RawCottenConsolidatedDetails;
import com.focusr.Precot.mssql.database.model.Qc.WiraFiberDetails;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_RawCottenConsolidatedDetailsHistory;

@Repository
public interface RawCottonConsolidatedDetailsRepoHistory extends JpaRepository<Qc_RawCottenConsolidatedDetailsHistory, Long> {
    
    // Find all details associated with a specific parent ID
    List<Qc_RawCottenConsolidatedDetailsHistory> findByParentId(Long parentId);

    @Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_DETAILS WHERE ID = :id ", nativeQuery = true)
    Qc_RawCottenConsolidatedDetailsHistory findFormById(@Param("id") long id);

	


    
}
