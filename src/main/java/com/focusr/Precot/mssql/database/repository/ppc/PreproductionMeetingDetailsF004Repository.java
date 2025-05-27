package com.focusr.Precot.mssql.database.repository.ppc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.PPC.PreproductionMeetingDetailsF004;

@Repository
public interface PreproductionMeetingDetailsF004Repository extends JpaRepository<PreproductionMeetingDetailsF004, Long> {

	
}
