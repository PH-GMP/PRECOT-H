//package com.focusr.Precot.mssql.database.repository.bleaching;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
//import com.focusr.Precot.mssql.database.model.bleaching.EquipLogBookHydroExtractorF11;
//import com.focusr.Precot.mssql.database.model.bleaching.EquipmentLogsF11;
//
//@Repository
//public interface EquipmentLogsF11Repository extends JpaRepository<EquipmentLogsF11,Long>{
//
//	@Query(value = "SELECT el.*, lu.* FROM EQUIPMENT_LOGS_F11 el "
//			+ "JOIN EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 lu ON el.EQUIPMENT_LOGBOOK_ID = lu.ID "
//			+ "WHERE el.BMR_NO = :bmrNo", nativeQuery = true)
//	List<EquipmentLogsF11> findByBmrNoWithDetails(@Param("bmrNo") String bmrNo);
//	
//	@Query(value = "SELECT * FROM EQUIPMENT_LOGS_F11 WHERE ID = :id ", nativeQuery = true)
//	EquipmentLogsF11 findFormById(@Param("id") long id);
//	
////	@Query(value = "SELECT * FROM EQUIPMENT_LOGS_F11 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED'", nativeQuery = true)
////	List<EquipmentLogsF11> findBySupervisorStatusSavedAndNotApproved();
////	
////	@Query(value = "SELECT * FROM EQUIPMENT_LOGS_F11 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED'", nativeQuery = true)
////	List<EquipmentLogsF11> findBySupervisorStatusApprovedAndHodStatusNotApproved();
//}
