package com.focusr.Precot.mssql.database.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Role;
import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.payload.UserDTO;
import com.focusr.Precot.util.BleachHodHrQaDetails;

/**
 * 
 * Created by FocusR .
 * 
 */

@Repository

public interface UserRepository extends JpaRepository<User, Long> {

	@Override

	List<User> findAll();

	Optional<User> findByEmail(String email);

	Optional<User> findByUsernameOrEmail(String username, String email);

	List<User> findByIdIn(List<Long> userIds);

	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	@Query(value = "SELECT * FROM precot.USER_LOGIN_DETAILS a WHERE name = :name ", nativeQuery = true)

	List<User> findByFirstNameAndLastName(@Param("name") String firstName);

	@Query(value = "SELECT users.* FROM precot.USER_LOGIN_DETAILS users,\n" +

			"precot.ROLES_MAP_BY_USERS user_role_map,\n" +

			"precot.USER_ROLES roles\n" +

			"where \n" +

			"users.id = user_role_map.user_id and\n" +

			"roles.id = user_role_map.role_id "

			+ "-- and roles.id != 1 "

			+ "order by users.id", nativeQuery = true)

	List<User> findListOfUsers();

//   @Query(value = "SELECT * FROM precot.USER_LOGIN_DETAILS WHERE agentId = :agentId AND (is_active is null or is_active = 'Y')", nativeQuery = true)

//   List<User> findByAgentId(@Param("agentId") long agentId);

//   @Query(value = "SELECT * FROM precot.USER_LOGIN_DETAILS WHERE vendorID = :vendorId AND (is_active is null or is_active = 'Y')", nativeQuery = true)

//   List<User> findByVendorId(@Param("vendorId") long vendorId);

	Optional<User> findByResetToken(String resetToken);

	@Query(value = "SELECT users.* FROM precot.USER_LOGIN_DETAILS users,\n" +

			"precot.ROLES_MAP_BY_USERS user_role_map,\n" +

			"precot.USER_ROLES roles\n" +

			"where \n" +

			"users.id = user_role_map.user_id and\n" +

			"roles.id = user_role_map.role_id "

			+ "and roles.id = 1 "

			+ "and users.username = 'sysadmin' "

			+ "order by users.id", nativeQuery = true)

	Optional<User> findFirstAdmin();

	@Query(value = "SELECT * FROM precot.USER_LOGIN_DETAILS WHERE id = :id ", nativeQuery = true)

	Optional<User> findUser(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.USER_LOGIN_DETAILS WHERE id = :id ", nativeQuery = true)

	User findUserByIdToActiveOrInactive(@Param("id") long id);

	void save(Optional<User> user);

	// method to fetch password by email

	// String findPasswordByEmail(String email);

	@Query("SELECT new com.focusr.Precot.payload.UserDTO(u.id, u.username, u.email) FROM User u")

	List<UserDTO> findUserDetails();

	@Query(value = "SELECT * FROM precot.USER_LOGIN_DETAILS u " +

			"JOIN precot.ROLES_MAP_BY_USERS rmu ON u.id = rmu.user_id " +

			"JOIN precot.USER_ROLES ur ON rmu.role_id = ur.id " +

			"WHERE ur.name = :roleName",

			nativeQuery = true)

	List<User> findByRoleName(@Param("roleName") Role role);

	@Query(value = "SELECT USERNAME FROM precot.USER_LOGIN_DETAILS WHERE ID = :id", nativeQuery = true)
	String getUserName(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.USER_LOGIN_DETAILS WHERE username =:username", nativeQuery = true)
	User getDetailsByUserName(@Param("username") String username);

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n" + "WHERE u.DEPARTMENT_ID IN (1)\r\n"
			+ "  AND r.id = 2\r\n" + "  AND u.is_active = 'Y'\r\n", nativeQuery = true)

	BleachHodHrQaDetails getBleachDepartHOD();

	@Query(value = "SELECT u.email, u.id, u.username " +

			"FROM precot.USER_LOGIN_DETAILS u " +

			"JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id " +

			"JOIN precot.USER_ROLES r ON rm.role_id = r.id " +

			"WHERE " +

			" r.name = 'ROLE_QA' AND u.is_active = 'Y'", nativeQuery = true)

	List<BleachHodHrQaDetails> getQADetails();

	@Query(value = "SELECT TOP 1 u.email\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n" + "WHERE \r\n"
			+ " r.name = 'ROLE_HR'AND u.is_active = 'Y'", nativeQuery = true)
	BleachHodHrQaDetails getHrDetails();

	@Query(value = "SELECT COUNT(users.DEPARTMENT_ID) AS user_count " + "FROM precot.USER_LOGIN_DETAILS users "
			+ "JOIN precot.ROLES_MAP_BY_USERS user_role_map ON users.id = user_role_map.user_id "
			+ "JOIN precot.USER_ROLES roles ON roles.id = user_role_map.role_id "
			+ "WHERE roles.name = 'ROLE_HOD' AND users.DEPARTMENT_ID IN (:departmentId)", nativeQuery = true)
	int countUsersWithRoleHodAndDepartmentId(@Param("departmentId") Long departmentId);

	@Query(value = "SELECT ID FROM precot.DEPARTMENT WHERE DEPARTMENT=:department", nativeQuery = true)
	Long fetchDepartment(@Param("department") String department);

	@Query(value = "SELECT ID FROM precot.USER_LOGIN_DETAILS WHERE USERNAME=:username", nativeQuery = true)
	Long getUsernameByUserId(@Param("username") String username);

	@Query(value = "SELECT * " + "FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "WHERE"
			+ " r.name IN ('ROLE_QA') AND u.is_active = 'Y' AND u.DEPARTMENT_ID =:department_id"
			+ " OR du.dept_id IN (:department_id)", nativeQuery = true)
	List<User> getQAByDepartment(@Param("department_id") Long department_id);

	@Query(value = "SELECT * " + "FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "WHERE"
			+ " r.name = 'ROLE_HOD'AND u.is_active = 'Y' AND u.DEPARTMENT_ID =:department_id OR du.dept_id IN (:department_id)", nativeQuery = true)
	List<User> getHODByDepartment(@Param("department_id") Long department_id);

	@Query(value = "SELECT users.username\r\n" + "FROM precot.USER_LOGIN_DETAILS users\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS user_role_map ON users.id = user_role_map.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = users.id \r\n"
			+ "JOIN precot.USER_ROLES roles ON roles.id = user_role_map.role_id\r\n"
			+ "WHERE roles.name IN ('ROLE_SUPERVISOR', 'ROLE_HOD', 'ROLE_DESIGNEE')\r\n"
			+ "  AND users.DEPARTMENT_ID =:department_id OR du.dept_id IN (:department_id)", nativeQuery = true)
	List<String> getUsernamesByDepartmentId(@Param("department_id") Long department_id);

	@Query(value = "SELECT users.username\r\n" + "FROM precot.USER_LOGIN_DETAILS users\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS user_role_map ON users.id = user_role_map.user_id\r\n"
			+ " LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = users.id \r\n"
			+ "JOIN precot.USER_ROLES roles ON roles.id = user_role_map.role_id\r\n"
			+ "WHERE roles.name IN ('ROLE_SUPERVISOR')\r\n"
			+ "  AND users.DEPARTMENT_ID =:department_id OR du.dept_id IN (:department_id)", nativeQuery = true)
	List<String> getSupervisorUsernamesForBleachingDepartment(@Param("department_id") Long department_id);

	// kaviya
	@Query(value = "SELECT users.username\r\n" + "FROM precot.USER_LOGIN_DETAILS users\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS user_role_map ON users.id = user_role_map.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = users.id \r\n"
			+ "JOIN precot.USER_ROLES roles ON roles.id = user_role_map.role_id\r\n"
			+ "WHERE roles.name IN ('ROLE_SUPERVISOR')AND is_active = 'Y'\r\n"
			+ "  AND users.DEPARTMENT_ID =:department_id OR du.dept_id IN (:department_id)", nativeQuery = true)
	List<String> getSupervisorByDepartmentId(@Param("department_id") Long department_id);

	@Query(value = "SELECT users.username\r\n" + "FROM precot.USER_LOGIN_DETAILS users\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS user_role_map ON users.id = user_role_map.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = users.id \r\n"
			+ "JOIN precot.USER_ROLES roles ON roles.id = user_role_map.role_id\r\n"
			+ "WHERE roles.name IN ('ROLE_HOD','ROLE_DESIGNEE')AND is_active = 'Y'\r\n"
			+ "  AND users.DEPARTMENT_ID =:department_id OR du.dept_id IN (:department_id)", nativeQuery = true)
	List<String> getHodByDepartmentId(@Param("department_id") Long department_id);

	/**
	 * SPULANCE
	 */

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 2  OR du.dept_id IN (2) \r\n" + "  AND r.id = 2\r\n"
			+ "  AND u.is_active = 'Y'\r\n ", nativeQuery = true)

	BleachHodHrQaDetails getSpunlaceDepartHOD();

	@Query(value = "SELECT u.email, u.id, u.username " +

			"FROM precot.USER_LOGIN_DETAILS u " +

			"JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "WHERE "
			+ " r.name = 'ROLE_QA' AND u.DEPARTMENT_ID = 3 OR du.dept_id IN (3) AND u.is_active = 'Y'", nativeQuery = true)
	BleachHodHrQaDetails getSpunlaceQADetails();

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 2  OR du.dept_id IN (2)\r\n" + "AND r.id = 3\r\n"
			+ "  AND u.is_active = 'Y'\r\n", nativeQuery = true)

	List<BleachHodHrQaDetails> getSpunlaceDepartSupervisors();

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 2  OR du.dept_id IN (2) \r\n" + "  AND r.id = 10002\r\n"
			+ "  AND u.is_active = 'Y'\r\n", nativeQuery = true)
	List<BleachHodHrQaDetails> getSpunlaceDepartQc();

	// Siva

	@Query(value = "SELECT u.username AS user_username, u.name AS user_name, r.name AS role_name "
			+ "FROM precot.USER_LOGIN_DETAILS u " + "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "WHERE r.name IN ('ROLE_QA', 'ROLE_DESIGNEE', 'ROLE_SUPERVISOR', 'ROLE_HOD') " + "AND u.is_active = 'Y' "
			+ "AND u.DEPARTMENT_ID = :department_id OR du.dept_id IN (:department_id)", nativeQuery = true)
	List<Object[]> getUsersByDepartment(@Param("department_id") Long department_id);

	/*
	 * PAD PUNCHING
	 */

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 3  OR du.dept_id IN (3) \r\n" + "  AND r.name = 'ROLE_HOD'\r\n"
			+ "  AND u.is_active = 'Y'\r\n", nativeQuery = true)

	BleachHodHrQaDetails getPadPunchingDepartHOD();

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 3 OR du.dept_id IN (3) \r\n" + "  AND r.name = 'ROLE_SUPERVISOR'\r\n"
			+ "  AND u.is_active = 'Y'\r\n", nativeQuery = true)

	List<BleachHodHrQaDetails> getPadPunchingDepartSupervisors();

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 3 OR du.dept_id IN (3) \r\n" + "  AND r.name = 'ROLE_QA'\r\n"
			+ "  AND u.is_active = 'Y'\r\n", nativeQuery = true)

	List<BleachHodHrQaDetails> getPadPunchingDepartQA();

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n" + "WHERE u.DEPARTMENT_ID = 3 OR du.dept_id IN (3)\r\n"
			+ "  AND r.name = 'ROLE_HR'\r\n" + "  AND u.is_active = 'Y'\r\n", nativeQuery = true)

	List<BleachHodHrQaDetails> getPadPunchingDepartHR();

	/**
	 * DRY GOODS
	 */

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 4 OR du.dept_id IN (4) \r\n" + "  AND r.id = 2\r\n"
			+ "  AND u.is_active = 'Y'\r\n", nativeQuery = true)

	BleachHodHrQaDetails getDryGoodsDepartHOD();

	@Query(value = "SELECT TOP 1 u.email, u.id, u.username " +

			"FROM precot.USER_LOGIN_DETAILS u " +

			"JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id " +

			"JOIN precot.USER_ROLES r ON rm.role_id = r.id " +

			"WHERE " +

			" r.name = 'ROLE_QA' AND u.DEPARTMENT_ID = 4 OR du.dept_id IN (4) AND u.is_active = 'Y'", nativeQuery = true)

	BleachHodHrQaDetails getDrygoodsQADetails();

	@Query(value = "SELECT TOP 1 u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n" + "WHERE u.DEPARTMENT_ID = 4 OR du.dept_id IN (4)\r\n"
			+ "  AND r.id = 3\r\n" + "  AND u.is_active = 'Y'\r\n", nativeQuery = true)

	List<BleachHodHrQaDetails> getDrGoodsDepartSupervisors();

// STORES GIRI

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n" + "WHERE u.DEPARTMENT_ID = 8 OR du.dept_id IN (8)\r\n"
			+ "  AND r.name = 'STORE_INCHARGE'\r\n" + "  AND u.is_active = 'Y'\r\n", nativeQuery = true)

	BleachHodHrQaDetails getStoreINcharge();

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n" + "WHERE u.DEPARTMENT_ID = 8 OR du.dept_id IN (8)\r\n"
			+ "  AND r.name = 'ROLE_HOD'\r\n" + "  AND u.is_active = 'Y'\r\n", nativeQuery = true)
	BleachHodHrQaDetails getstorehod();

// QC VIJAY

	@Query(value = "SELECT u.username AS user_username, u.name AS user_name, r.name AS role_name "
			+ "FROM precot.USER_LOGIN_DETAILS u " + "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "WHERE r.name IN ('ROLE_QA','ROLE_CHEMIST', 'ROLE_MICROBIOLOGIST', 'QC_MANAGER','QA_MANAGER', 'QA_EXECUTIVE' ) "
			+ "AND u.is_active = 'Y' "
			+ "AND u.DEPARTMENT_ID = :department_id OR du.dept_id IN (:department_id)", nativeQuery = true)
	List<Object[]> getUsers(@Param("department_id") Long department_id);

	// GIRI

	@Query("SELECT u.username FROM User u JOIN u.roles r WHERE r.name = :roleName")
	List<String> findUsernamesByRole(@Param("roleName") String roleName);

	@Query("SELECT u.username FROM User u " + "JOIN u.roles r " + "JOIN Department d ON u.departmentId = d.id "
			+ "WHERE d.department IN ('QUALITY_ASSURANCE', 'QUALITY_CONTROL') "
			+ "AND r.name IN ('QC_MANAGER', 'QA_MANAGER')")
	List<String> findUsernamesByDepartmentAndRole();

	@Query(value = "SELECT u.username FROM precot.USER_LOGIN_DETAILS u", nativeQuery = true)
	List<String> findAllUsernames();

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n" + "WHERE u.DEPARTMENT_ID = 7 OR du.dept_id IN (7)\r\n"
			+ "  AND r.name = 'ROLE_HOD'\r\n" + "  AND u.is_active = 'Y'\r\n", nativeQuery = true)
	BleachHodHrQaDetails getPpchod();

	@Query(value = "SELECT DEPARTMENT_ID FROM precot.USER_LOGIN_DETAILS WHERE ID = :userId", nativeQuery = true)
	String getDepartmentById(@Param("userId") Long userId);

	// NEW

	@Query(value = "SELECT DEPARTMENT_ID FROM precot.USER_LOGIN_DETAILS WHERE ID = :userId", nativeQuery = true)
	List<String> getDepartmentByIdNew(@Param("userId") Long userId);

	@Query(value = "SELECT dept_id FROM precot.DEPARTMENT_MAP_BY_USERS WHERE user_id = :userId", nativeQuery = true)
	List<String> getDepartmentByIdNew2(@Param("userId") Long userId);

	@Query(value = "SELECT DEPARTMENT_ID FROM precot.USER_LOGIN_DETAILS WHERE email = :mail", nativeQuery = true)
	String getDepartmentByemail(@Param("mail") String mail);

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n" + "WHERE u.DEPARTMENT_ID = 5 OR du.dept_id IN (5)\r\n"
			+ "  AND r.name = 'QC_MANAGER'\r\n" + "  AND u.is_active = 'Y'\r\n", nativeQuery = true)
	BleachHodHrQaDetails getQCDepartHEAD();

	// VIJAY

	// GET QA EXECUTIVE DETAILS

	@Query(value = "SELECT TOP 1 u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 5 OR du.dept_id IN (5) \r\n" + "  AND r.name = 'QA_EXECUTIVE'\r\n"
			+ " AND u.is_active = 'Y'\r\n", nativeQuery = true)
	BleachHodHrQaDetails getQcDepartQaExe();

	// GET MICRO DESIGNEE EXECUTIVE DETAILS

	@Query(value = "SELECT TOP 1 u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 5 OR du.dept_id IN (5) \r\n" + "  AND r.name = 'MICRO_DESIGNEE'\r\n"
			+ " AND u.is_active = 'Y'\r\n", nativeQuery = true)

	BleachHodHrQaDetails getQcDepartMicroDesignee();

	// QA MANAGER AND QC MANAGER

	@Query(value = "WITH Role AS (\r\n" + "    SELECT u.email, u.id, u.username, r.name, \r\n"
			+ "           ROW_NUMBER() OVER (PARTITION BY r.name ORDER BY u.id) AS rn\r\n"
			+ "    FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "    JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "   LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "    JOIN precot.USER_ROLES r ON rm.role_id = r.id \r\n"
			+ "    WHERE u.DEPARTMENT_ID = 5 OR du.dept_id IN (5)\r\n"
			+ "    AND r.name IN ('QA_MANAGER', 'QC_MANAGER') \r\n" + "    AND u.is_active = 'Y'\r\n" + ")\r\n"
			+ "SELECT email, id, username, name \r\n" + "FROM Role\r\n" + "WHERE rn = 1;", nativeQuery = true)
	List<BleachHodHrQaDetails> getQcDepartQaQcManager();

	@Query(value = "WITH Role AS (\r\n" + "    SELECT u.email, u.id, u.username, r.name, \r\n"
			+ "           ROW_NUMBER() OVER (PARTITION BY r.name ORDER BY u.id) AS rn\r\n"
			+ "    FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "    JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "    JOIN precot.USER_ROLES r ON rm.role_id = r.id \r\n"
			+ "    WHERE u.DEPARTMENT_ID = 5 OR du.dept_id IN (5) \r\n"
			+ "    AND r.name IN ('QA_MANAGER', 'QC_MANAGER','CHEMIST_DESIGNEE') \r\n" + "    AND u.is_active = 'Y'\r\n"
			+ ")\r\n" + "SELECT email, id, username, name \r\n" + "FROM Role\r\n" + "WHERE rn = 1;", nativeQuery = true)
	List<BleachHodHrQaDetails> getQcDepartQaQcManagerAndChemistDesgn();

	@Query(value = "WITH Role AS (\r\n" + "    SELECT u.email, u.id, u.username, r.name, \r\n"
			+ "           ROW_NUMBER() OVER (PARTITION BY r.name ORDER BY u.id) AS rn\r\n"
			+ "    FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "    JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "    JOIN precot.USER_ROLES r ON rm.role_id = r.id \r\n"
			+ "    WHERE u.DEPARTMENT_ID = 5 OR du.dept_id IN (5) \r\n"
			+ "    AND r.name IN ('QA_MANAGER', 'QC_MANAGER','MICRO_DESIGNEE') \r\n" + "    AND u.is_active = 'Y'\r\n"
			+ ")\r\n" + "SELECT email, id, username, name \r\n" + "FROM Role\r\n" + "WHERE rn = 1;", nativeQuery = true)
	List<BleachHodHrQaDetails> getQcDepartQaQcManagerAndMicroDesgn();

	@Query(value = "WITH Role AS (\r\n" + "    SELECT u.email, u.id, u.username, r.name, \r\n"
			+ "           ROW_NUMBER() OVER (PARTITION BY r.name ORDER BY u.id) AS rn\r\n"
			+ "    FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "    JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id"
			+ "    JOIN precot.USER_ROLES r ON rm.role_id = r.id \r\n"
			+ "    WHERE u.DEPARTMENT_ID = 5 OR du.dept_id IN (5)\r\n"
			+ "    AND r.name IN ('CHEMIST_DESIGNEE','MICRO_DESIGNEE') \r\n" + "    AND u.is_active = 'Y'\r\n" + ")\r\n"
			+ "SELECT email, id, username, name \r\n" + "FROM Role\r\n" + "WHERE rn = 1;", nativeQuery = true)
	List<BleachHodHrQaDetails> getChemistDesignAndMicroDesgn();

	// QA
	@Query(value = "SELECT users.name FROM precot.USER_LOGIN_DETAILS users, "
			+ "precot.ROLES_MAP_BY_USERS user_role_map, " + "precot.USER_ROLES roles "
			+ "WHERE users.id = user_role_map.user_id " + "AND roles.id = user_role_map.role_id " + "AND roles.id != 1 "
			+ "ORDER BY users.id", nativeQuery = true)
	List<User> findAllActiveUser();

	// QA mail
	@Query(value = "SELECT TOP 1 u.email FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "JOIN precot.DEPARTMENT d ON u.DEPARTMENT_ID = d.id "
			+ "WHERE r.name = :roleName AND d.DEPARTMENT = :departmentName AND u.is_active = 'Y'", nativeQuery = true)
	String findEmailByRoleAndDepartment(@Param("roleName") String roleName,
			@Param("departmentName") String departmentName);

	// all dept hod
	@Query(value = "SELECT u.email FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id "
			+ "WHERE r.name = :roleName  AND u.is_active = 'Y'", nativeQuery = true)
	List<String> findEmailsByRole(@Param("roleName") String roleName);

	// PRODUCT DEVELOPMENT

	@Query(value = "SELECT u.email, u.id, u.username\r\n" + "FROM precot.USER_LOGIN_DETAILS u\r\n"
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id\r\n"
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id \r\n"
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id\r\n"
			+ "WHERE u.DEPARTMENT_ID = 6 OR du.dept_id IN (6) \r\n" + "  AND r.name = 'QA_MANAGER'\r\n"
			+ "  AND u.is_active = 'Y'\r\n", nativeQuery = true)
	BleachHodHrQaDetails getQADepartHEAD();

	// ENGINEERING

	@Query(value = "SELECT DEPARTMENT_ID FROM precot.USER_LOGIN_DETAILS WHERE USERNAME = :username", nativeQuery = true)
	String getDepartmentByUserName(@Param("username") String username);

	@Query(value = "SELECT u.email FROM precot.USER_LOGIN_DETAILS u WHERE u.username = :username", nativeQuery = true)
	String getUserEmailById(@Param("username") String username);

	@Query(value = "SELECT h FROM  precot.USER_LOGIN_DETAILS h WHERE h.role_id = :role AND h.DEPARTMENT_ID = :departmentId", nativeQuery = true)
	BleachHodHrQaDetails getContactByRoleAndDepartment(@Param("role") String role,
			@Param("departmentId") String departmentId);

	@Query(value = "SELECT u.email, u.id, u.username " + "FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id "
			+ "WHERE u.DEPARTMENT_ID = :departmentId  OR du.dept_id IN (:department_id)" + "AND r.name = 'ROLE_HOD' "
			+ "AND u.is_active = 'Y'", nativeQuery = true)
	BleachHodHrQaDetails getHodByDepartment(@Param("departmentId") String departmentId);

	@Query(value = "SELECT u.username AS user_username, u.name AS user_name, r.name AS role_name "
			+ "FROM precot.USER_LOGIN_DETAILS u " + "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "WHERE r.name = :roleName "
			+ "AND u.is_active = 'Y'", nativeQuery = true)
	List<Object[]> getUsersByRoleName(@Param("roleName") String roleName);

	// BUDS

	@Query(value = "SELECT u.username " + "FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "WHERE r.name IN ('QA_MANAGER', 'ROLE_QA') " + "AND u.is_active = 'Y' "
			+ "AND u.DEPARTMENT_ID = 12 OR du.dept_id IN (12)", nativeQuery = true)
	List<String> getbudsByDepartment();

	@Query(value = "SELECT u.username " + "FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "WHERE r.name = 'ROLE_SUPERVISOR' "
			+ "AND u.is_active = 'Y' " + "AND u.DEPARTMENT_ID = 12 OR du.dept_id IN (12)", nativeQuery = true)
	List<String> getbudssupervisorByDepartment();

	@Query(value = "SELECT u.username " + "FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "WHERE r.name = 'QA_INSPECTOR' "
			+ "AND u.is_active = 'Y' " + "AND u.DEPARTMENT_ID = 12 OR du.dept_id IN (12)", nativeQuery = true)
	List<String> getinspectorByDepartment();

	@Query(value = "SELECT u.username " + "FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "WHERE r.name = 'ROLE_HOD' " + "AND u.is_active = 'Y' "
			+ "AND u.DEPARTMENT_ID = 12 OR du.dept_id IN (12)", nativeQuery = true)
	List<String> getHodByDepartment();

//		Giri PPC Contract Review Meeting 

	@Query(value = "SELECT u.username " + "FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "WHERE r.name = 'ROLE_HOD' " + "AND u.is_active = 'Y' "
			+ "AND u.DEPARTMENT_ID IN (1,2,3,4,5,6,9,12) OR du.dept_id IN (1,2,3,4,5,6,9,12)", nativeQuery = true)
	BleachHodHrQaDetails getHodByDepartmentContractReview();

	@Query(value = "SELECT * " + "FROM precot.USER_LOGIN_DETAILS u "
			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.id = rm.user_id "
			+ "LEFT JOIN precot.DEPARTMENT_MAP_BY_USERS du ON du.user_id = u.id "
			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.id " + "WHERE"
			+ " r.name IN ('ROLE_QA') AND u.is_active = 'Y' ", nativeQuery = true)
	List<User> getQA();

}
