package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.MediaGrowthDetails;
import com.focusr.Precot.mssql.database.model.Qc.WiraFiberDetails;

@Repository
public interface MediaGrowthDetailsRepo extends JpaRepository<MediaGrowthDetails, Long> {
    
    // Find all details associated with a specific parent ID
    List<MediaGrowthDetails> findByParentId(Long parentId);

    @Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021_HISTORY WHERE ID = :id ", nativeQuery = true)
    MediaGrowthDetails findFormById(@Param("id") long id);


    
}
