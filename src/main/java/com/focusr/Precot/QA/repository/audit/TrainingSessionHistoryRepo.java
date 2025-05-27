package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import com.focusr.Precot.QA.model.audit.TrainingSessionHistory;

public interface TrainingSessionHistoryRepo extends JpaRepository<TrainingSessionHistory,Long> {

}
