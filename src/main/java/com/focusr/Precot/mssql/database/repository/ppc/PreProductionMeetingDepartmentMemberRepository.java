package com.focusr.Precot.mssql.database.repository.ppc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.PPC.PreProductionMeetingDepartmentMember;

@Repository
public interface PreProductionMeetingDepartmentMemberRepository
		extends JpaRepository<PreProductionMeetingDepartmentMember, Long> {

}
