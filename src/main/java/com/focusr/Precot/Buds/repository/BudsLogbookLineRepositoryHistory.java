package com.focusr.Precot.Buds.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsLogbookProductionLine;
import com.focusr.Precot.Buds.model.audit.BudsLogbookProductionLineHistory;

@Repository
public interface BudsLogbookLineRepositoryHistory extends JpaRepository<BudsLogbookProductionLineHistory, Long>{

}
