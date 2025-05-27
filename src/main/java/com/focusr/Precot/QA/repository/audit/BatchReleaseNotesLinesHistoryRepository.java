package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.BatchReleaseNotesLinesHistory;

@Repository
public interface BatchReleaseNotesLinesHistoryRepository extends JpaRepository<BatchReleaseNotesLinesHistory, Long> {

}
