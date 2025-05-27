package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.MediaGrowthDetailsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.WiraFiberDetailsHistory;

@Repository
public interface MediaGrowthDetailRepoHistory extends JpaRepository<MediaGrowthDetailsHistory, Long> {
    
    // Find all details associated with a specific parent ID
    List<MediaGrowthDetailsHistory> findByParentId(Long parentId);

    @Query(value = "SELECT * FROM precot.MEDIA_GROWTH_DETAILS_HISTORY WHERE ID = :id ", nativeQuery = true)
    MediaGrowthDetailsHistory findFormById(@Param("id") long id);


    
}
