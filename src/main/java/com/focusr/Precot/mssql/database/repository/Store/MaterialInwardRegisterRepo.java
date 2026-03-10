package com.focusr.Precot.mssql.database.repository.Store;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Store.MaterialInwardRegister;

public interface MaterialInwardRegisterRepo extends JpaRepository<MaterialInwardRegister, Long> {

	@Query(value = "SELECT * FROM precot.STORE_MATERIAL_INWARD_REGISTER_F001 WHERE ID=:id", nativeQuery = true)
	MaterialInwardRegister fetchReceptionChecklistById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.STORE_MATERIAL_INWARD_REGISTER_F001 WHERE STORE_IN_CHARGE_STATUS !='INCHARGE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<MaterialInwardRegister> MaterialInwardRegisterforIncharge();

	@Query(value = "SELECT * FROM precot.STORE_MATERIAL_INWARD_REGISTER_F001 WHERE DATE = :date", nativeQuery = true)
	List<MaterialInwardRegister> findByMaterialInwardRegisterDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.STORE_MATERIAL_INWARD_REGISTER_F001 WHERE DATE BETWEEN :fromDate AND :toDate AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	List<MaterialInwardRegister> getMaterialInwardRegisterforByDateRange(@Param("fromDate") String fromDate,
			@Param("toDate") String toDate);

	@Query(value = "SELECT * FROM precot.STORE_MATERIAL_INWARD_REGISTER_F001 WHERE YEAR(DATE) = :year AND MONTH(DATE) = :month AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	List<MaterialInwardRegister> getMaterialInwardRegisterforByYearAndMonth(@Param("year") String year,
			@Param("month") String month);

	@Query(value = "SELECT * FROM precot.STORE_MATERIAL_INWARD_REGISTER_F001 WHERE YEAR(DATE) = :year AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	List<MaterialInwardRegister> getMaterialInwardRegisterforByYear(@Param("year") String year);
	
	// DASHBOARD
	
	//	-- 001
	
	@Query(value = "SELECT SUM(CASE WHEN STORE_IN_CHARGE_STATUS = 'INCHARGE_SAVE' THEN 1 ELSE 0 END) AS stoteInchargeCount\r\n"
			+ "FROM precot.STORE_MATERIAL_INWARD_REGISTER_F001", nativeQuery = true)
	List<Object[]> getMonthlyPlanSummaryStatusCounts();
	
	//	-- 002
	
	@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS = 'OPERATOR_SAVED'\r\n"
			+ "OR (OPERATOR_STATUS = 'OPERATOR_APPROVED' AND STORE_IN_CHARGE_STATUS = 'INCHARGE_REJECTED')THEN 1 ELSE 0 END) AS storeOperatorCount,\r\n"
			+ "SUM(CASE WHEN STORE_IN_CHARGE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS stoteInchargeCount\r\n"
			+ "FROM precot.STORE_RECEPTION_CHECK_LIST_F003", nativeQuery = true)
	List<Object[]> getReceptionCheckListStatusCounts();
	
	//	-- 003
	
	@Query(value = "SELECT SUM(CASE WHEN STORE_INCHARGE_STATUS = 'INCHARGE_SAVED'\r\n"
			+ "OR (STORE_INCHARGE_STATUS = 'INCHARGE_APPROVED' AND HOD_STATUS = 'HOD_REJECTED')THEN 1 ELSE 0 END) AS storeInchargeCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006", nativeQuery = true)
	List<Object[]> getNonReturnableGatePassStatusCounts();
	
	//	-- 004
	
	@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS = 'OPERATOR_SAVED'\r\n"
			+ "OR (OPERATOR_STATUS = 'OPERATOR_APPROVED' AND STORE_IN_CHARGE_STATUS = 'INCHARGE_REJECTED')THEN 1 ELSE 0 END) AS operatorCount ,\r\n"
			+ "SUM(CASE WHEN STORE_IN_CHARGE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS storeInchargeCount\r\n"
			+ "FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009", nativeQuery = true)
	List<Object[]> getEyeWashWithShowerStatusCounts();

}
