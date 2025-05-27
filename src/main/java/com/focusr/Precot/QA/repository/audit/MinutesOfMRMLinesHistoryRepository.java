package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MinutesOfMRMLinesHistoryRepository extends JpaRepository<MinutesOfMRMLinesHistory, Long> {

}
