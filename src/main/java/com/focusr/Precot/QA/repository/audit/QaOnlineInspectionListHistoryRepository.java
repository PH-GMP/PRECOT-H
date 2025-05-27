package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;

import com.focusr.Precot.QA.model.QaOnlineInspectionList;
import com.focusr.Precot.QA.model.audit.QaOnlineInspectionListHistory;

public interface QaOnlineInspectionListHistoryRepository extends JpaRepository<QaOnlineInspectionListHistory, Long> {

}
