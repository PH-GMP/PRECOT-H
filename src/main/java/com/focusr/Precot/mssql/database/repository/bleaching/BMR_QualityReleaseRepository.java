package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BMR_QualityRelease;

public interface BMR_QualityReleaseRepository extends JpaRepository<BMR_QualityRelease,Long>{

	@Query(value = "SELECT * FROM precot.BMR_QUALITY_RELEASE WHERE QUALITY_ID=:qualityId", nativeQuery = true)
	BMR_QualityRelease getRecordDetails(@Param("qualityId") Long qualityId);
	
	
	@Query(value = "SELECT u.username " +
            "FROM precot.USER_LOGIN_DETAILS u " +
            "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id " +
            "JOIN precot.USER_ROLES r ON rm.role_id = r.id " +
            "WHERE r.name = 'QA_INSPECTOR' " +
            "AND u.is_active = 'Y' " +
            "AND u.DEPARTMENT_ID =:dept_id",
            nativeQuery = true)
	List<String> getQaInspectorByDepartment(@Param("dept_id") Long dept_id);
	
	
	
	@Query(value = "SELECT u.username " +
            "FROM precot.USER_LOGIN_DETAILS u " +
            "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id " +
            "JOIN precot.USER_ROLES r ON rm.role_id = r.id " +
            "WHERE r.name IN ('QA_MANAGER', 'QA_DESIGNEE') " +
            "AND u.is_active = 'Y' " +
            "AND u.DEPARTMENT_ID =:dept_id",
            nativeQuery = true)
	List<String> getQaManagerByDepartment(@Param("dept_id") Long dept_id);
	
}
