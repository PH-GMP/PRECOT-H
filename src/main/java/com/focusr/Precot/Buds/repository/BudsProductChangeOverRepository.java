package com.focusr.Precot.Buds.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsProductChangeOver;
import com.focusr.Precot.util.BleachHodHrQaDetails;


@Repository
public interface BudsProductChangeOverRepository extends JpaRepository<BudsProductChangeOver, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_PRODUCT_CHANGE_OVER WHERE PRODUCT_ID=:id", nativeQuery = true)
	BudsProductChangeOver productChangeoverDetailsById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.BUDS_PRODUCT_CHANGE_OVER WHERE ORDER_NO_1=:orderNumber", nativeQuery = true)
	BudsProductChangeOver productChangeOverByOrderNumber(@Param("orderNumber") String orderNumber);
	
	@Query(value = "SELECT * FROM precot.BUDS_PRODUCT_CHANGE_OVER WHERE ORDER_NO_1=:orderNumber", nativeQuery = true)
	List<BudsProductChangeOver> productChangeOverByOrderNumberList(@Param("orderNumber") String orderNumber);
	
	
	@Query(value = "SELECT * FROM precot.BUDS_PRODUCT_CHANGE_OVER WHERE SUPERVISOR_STATUS='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY PRODUCT_ID DESC", nativeQuery = true)
	List<BudsProductChangeOver> getPunchingSupervisorSummary();
	
	@Query(value = "SELECT * FROM precot.BUDS_PRODUCT_CHANGE_OVER WHERE  HOD_STATUS != 'HOD_APPROVED' ORDER BY PRODUCT_ID DESC", nativeQuery = true)
	List<BudsProductChangeOver> getPunchingHodQASummary();
	
	@Query(value = "SELECT * FROM precot.BUDS_PRODUCT_CHANGE_OVER " +
            "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +
//            "AND (:section IS NULL OR :section='' OR SECTION = :section) " +
            "AND (:machine IS NULL OR :machine='' OR MACHINE_NAME = :machine)"
            + "AND HOD_STATUS='HOD_APPROVED'", nativeQuery = true)
	List<BudsProductChangeOver> productChangeoverDetailsPrint(@Param("date") String date, @Param("machine") String machine);
	
	
		// MAIL FUNCTION 
	
	
	@Query(value = "SELECT TOP 1 u.email, u.id, u.username " +
            "FROM precot.USER_LOGIN_DETAILS u " +
            "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id " +
            "JOIN precot.USER_ROLES r ON rm.role_id = r.id " +
            "WHERE u.DEPARTMENT_ID = 12 " +
            "  AND r.name = 'ROLE_SUPERVISOR' " +
            "  AND u.is_active = 'Y' " +
            "ORDER BY NEWID()", nativeQuery = true)
	BleachHodHrQaDetails getCottonBudsSupervisor();

	
	@Query(value = "SELECT TOP 1 u.email, u.id, u.username " +
            "FROM precot.USER_LOGIN_DETAILS u " +
            "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id " +
            "JOIN precot.USER_ROLES r ON rm.role_id = r.id " +
            "WHERE u.DEPARTMENT_ID = 12 " +
            "  AND r.name = 'ROLE_QA_INSPECTOR' " +
            "  AND u.is_active = 'Y' " +
            "ORDER BY NEWID()", nativeQuery = true)
	BleachHodHrQaDetails getCottonBudsInspector();

	@Query(value = "SELECT TOP 1 u.email, u.id, u.username " +
            "FROM precot.USER_LOGIN_DETAILS u " +
            "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id " +
            "JOIN precot.USER_ROLES r ON rm.role_id = r.id " +
            "WHERE u.DEPARTMENT_ID = 12 " +
            "  AND r.name IN ('ROLE_HOD', 'ROLE_DESIGNEE') " +
            "  AND u.is_active = 'Y' " +
            "ORDER BY NEWID()", nativeQuery = true)
	BleachHodHrQaDetails getCottonBudsHod();
	
}
