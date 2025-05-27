package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.QcDistilledWaterAnlaysisDetails;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalDetails;

@Repository
public interface DistilledWaterAnlaysisDetailsRepo extends JpaRepository<QcDistilledWaterAnlaysisDetails, Long> {
    
    // Find all details associated with a specific parent ID
    List<QcDistilledWaterAnlaysisDetails> findByParentId(Long parentId);

    @Query(value = "SELECT * FROM precot.hod_DISTILLED_WATER_ANALYSIS_DETAILS WHERE ID = :id ", nativeQuery = true)
    QcDistilledWaterAnlaysisDetails findFormById(@Param("id") long id);


    
}
