package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ReviewOfCriticalParameterChecksOfLine5;
import com.focusr.Precot.QA.model.audit.ReviewOfCriticalParameterChecksOfLine5History;

@Repository
public interface ReviewOfCriticalParameterChecksOfLine5HistoryRepository extends JpaRepository<ReviewOfCriticalParameterChecksOfLine5History, Long> {

}
