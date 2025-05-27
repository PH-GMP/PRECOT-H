package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ReviewOfChangeControlSystemLine8;
import com.focusr.Precot.QA.model.audit.ReviewOfChangeControlSystemLine8History;

@Repository
public interface ReviewOfChangeControlSystemLine8HistoryRepository extends JpaRepository<ReviewOfChangeControlSystemLine8History, Long>{

}
