package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ReviewOfAllNonConformityProductLine6;
import com.focusr.Precot.QA.model.audit.ReviewOfAllNonConformityProductLine6History;

@Repository
public interface ReviewOfAllNonConformityProductLine6HistoryRepository extends JpaRepository<ReviewOfAllNonConformityProductLine6History, Long> {

}
