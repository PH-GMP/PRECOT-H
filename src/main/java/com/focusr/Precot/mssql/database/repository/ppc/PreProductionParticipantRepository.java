package com.focusr.Precot.mssql.database.repository.ppc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.PPC.PreProductionParticipant;

public interface PreProductionParticipantRepository extends JpaRepository<PreProductionParticipant, Long> {

	@Query(value = "SELECT * FROM precot.PPC_PRE_PRODUCTION_PARTICIPANT WHERE ID = :id ", nativeQuery = true)
	PreProductionParticipant findParticipantById(@Param("id") long id);

}
