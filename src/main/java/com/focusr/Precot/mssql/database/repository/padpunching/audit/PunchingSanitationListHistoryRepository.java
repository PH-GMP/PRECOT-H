package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingSanitationListHistoryF24;

@Repository
public interface PunchingSanitationListHistoryRepository extends JpaRepository<PunchingSanitationListHistoryF24, Long>{

	@Query(value = "SELECT * FROM precot.PUNCHING_SANITIZATION_LIST_HISTORY_F24 WHERE ID=:id", nativeQuery = true)
	PunchingSanitationListHistoryF24 getSanitationListById(@Param("id") Long id);
	
}
