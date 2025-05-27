package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.PackingMaterialDetailsLine3;
import com.focusr.Precot.QA.model.audit.PackingMaterialDetailsLine3History;

@Repository
public interface PackingMaterialDetailsLine3HistoryRepository extends JpaRepository<PackingMaterialDetailsLine3History, Long>{

}
