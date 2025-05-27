package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.QaPestControllerTreatmentsHistory;

@Repository
public interface QaPestControllerTreatmentsHistoryRepository extends JpaRepository<QaPestControllerTreatmentsHistory, Long>{

}
