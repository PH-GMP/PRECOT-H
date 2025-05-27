package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachContAbsBleachedCottonF18;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.EquipLogBookHydroExtractorF11;

@Repository
public interface EquipLogBookHydroExtractorF11Repository extends JpaRepository<EquipLogBookHydroExtractorF11, Long> {

//	@Query(value = "SELECT * FROM EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE ID = :id ", nativeQuery = true)
//	EquipLogBookHydroExtractorF11 findFormById(@Param("id") long id);
//
//	@Query(value = "SELECT * FROM EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE FORMAT_NO =:format_no", nativeQuery = true)
//	List<EquipLogBookHydroExtractorF11> findByListOfF11FormatDetails(@Param("format_no") String formatNo);
//
//	@Query(value = "SELECT elb.* FROM EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 elb "
//			+ "JOIN EQUIPMENT_LOGS_F11 el ON el.EQUIPMENT_LOGBOOK_ID = elb.ID "
//			+ "WHERE el.BMR_NO = :bmrNo", nativeQuery = true)
//	EquipLogBookHydroExtractorF11 findByBmrNo(@Param("bmrNo") String bmrNo);
//
//	@Query(value = "SELECT * FROM EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE STATUS = 'SUPERVISOR_SAVED'", nativeQuery = true)
//	List<EquipLogBookHydroExtractorF11> findBySupervisorStatusSavedAndNotApproved();
//	
//	@Query(value = "SELECT * FROM EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE STATUS = 'HOD_SAVED' OR STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
//	List<EquipLogBookHydroExtractorF11> findBySupervisorStatusApprovedAndHodStatusNotApproved();
//	
////	@Query(value = "SELECT * FROM EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
////	List<EquipLogBookHydroExtractorF11> findBySupervisorStatusApprovedAndHodStatusNotApproved();

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE ID = :id ", nativeQuery = true)
	EquipLogBookHydroExtractorF11 findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE FORMAT_NO =:format_no", nativeQuery = true)
	List<EquipLogBookHydroExtractorF11> findByListOfF11FormatDetails(@Param("format_no") String formatNo);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE BMR_NO =:bmrNo", nativeQuery = true)
	EquipLogBookHydroExtractorF11 findByBmrNo(@Param("bmrNo") String bmrNo);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<EquipLogBookHydroExtractorF11> findBySupervisorStatusSavedAndNotApproved();

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<EquipLogBookHydroExtractorF11> findBySupervisorStatusApprovedAndHodStatusNotApproved();

//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 \r\n"
//			+ "WHERE BMR_NO BETWEEN :fromBmr AND :toBmr", nativeQuery = true)
//	List<EquipLogBookHydroExtractorF11> findByBmrRange(@Param("fromBmr") String fromBmr, @Param("toBmr") String toBmr);
	
//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 \r\n"
//			+ "WHERE BMR_NO BETWEEN :fromBmr AND :toBmr  AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<EquipLogBookHydroExtractorF11> findByBmrRange(@Param("fromBmr") String fromBmr, @Param("toBmr") String toBmr);
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE BMR_NO BETWEEN :fromBmr AND :toBmr AND HOD_STATUS = 'HOD_APPROVED' ORDER BY CAST(SUBSTRING(BMR_NO, 1, 2) AS INT) ASC, CAST(SUBSTRING(BMR_NO, CHARINDEX('/', BMR_NO, CHARINDEX('/', BMR_NO) + 1) + 1, LEN(BMR_NO)) AS INT) ASC, CAST(SUBSTRING(SUB_BATCH_NO, 1, 2) AS INT) ASC, CAST(SUBSTRING(SUB_BATCH_NO, 4, LEN(SUB_BATCH_NO) - 3) AS INT) ASC", nativeQuery = true)
	List<EquipLogBookHydroExtractorF11> findByBmrRange(@Param("fromBmr") String fromBmr, @Param("toBmr") String toBmr);
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE BMR_NO =:bmrNo AND SUB_BATCH_NO =:batchNo", nativeQuery = true)
	EquipLogBookHydroExtractorF11 findByBmrAndBatchNo(@Param("bmrNo") String bmrNo, @Param("batchNo") String batchNo);
	
	// new cr batch no after Bleach Job Card submit
	
	@Query(value = "SELECT SUB_BATCH_NO FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE BMR_NO=:bmr_no AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
	List<String> getBatchByBMRForHydroExtractor(@Param("bmr_no") String bmr_no);
}
