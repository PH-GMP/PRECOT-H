package com.focusr.Precot.QA.repository.audit;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.InternalAuditHistory;


@Repository
public interface InternalAuditHistoryRepo extends JpaRepository<InternalAuditHistory, Long>{

}