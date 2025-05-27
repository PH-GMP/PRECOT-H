package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.BmrIssueRegisterLineHistoryF045;
import com.focusr.Precot.QA.model.audit.DistributionAndDestructionRecordLinesHistoryF003;

@Repository
public interface BmrIssueRegisterLineHistoryRepositoryF045 extends JpaRepository<BmrIssueRegisterLineHistoryF045, Long>{

}
