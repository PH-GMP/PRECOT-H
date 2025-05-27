package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ReviewOfDeviationLine7;
import com.focusr.Precot.QA.model.audit.ReviewOfDeviationLine7History;

@Repository
public interface ReviewOfDeviationLine7HistoryRepository extends JpaRepository<ReviewOfDeviationLine7History, Long>{

}
