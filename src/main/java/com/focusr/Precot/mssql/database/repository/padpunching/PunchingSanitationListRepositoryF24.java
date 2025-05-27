package com.focusr.Precot.mssql.database.repository.padpunching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.PunchingSanitationListF24;

@Repository
public interface PunchingSanitationListRepositoryF24 extends JpaRepository<PunchingSanitationListF24, Long>{

	@Query(value = "SELECT * FROM precot.PUNCHING_SANITIZATION_LIST_F24 WHERE ID=:id", nativeQuery = true)
	PunchingSanitationListF24 getSanitationListById(@Param("id") Long id);
}
