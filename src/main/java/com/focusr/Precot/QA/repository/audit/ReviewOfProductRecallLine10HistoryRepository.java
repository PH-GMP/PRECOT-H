package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ReviewOfProductRecallLine10;
import com.focusr.Precot.QA.model.audit.ReviewOfProductRecallLine10History;

@Repository
public interface ReviewOfProductRecallLine10HistoryRepository extends JpaRepository<ReviewOfProductRecallLine10History, Long>{

}
