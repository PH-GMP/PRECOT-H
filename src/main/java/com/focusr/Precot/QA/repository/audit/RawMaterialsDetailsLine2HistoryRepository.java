package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.RawMaterialsDetailsLine2;
import com.focusr.Precot.QA.model.audit.RawMaterialsDetailsLine2History;

@Repository
public interface RawMaterialsDetailsLine2HistoryRepository extends JpaRepository<RawMaterialsDetailsLine2History, Long> {

}
