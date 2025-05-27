package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ComplaintsRejectsAndProductRecallsLine9;
import com.focusr.Precot.QA.model.audit.ComplaintsRejectsAndProductRecallsLine9History;

@Repository
public interface ComplaintsRejectsAndProductRecallsLine9HistoryRepository extends JpaRepository<ComplaintsRejectsAndProductRecallsLine9History, Long>{

}
