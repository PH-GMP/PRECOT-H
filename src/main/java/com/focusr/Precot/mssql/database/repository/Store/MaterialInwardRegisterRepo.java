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

}
