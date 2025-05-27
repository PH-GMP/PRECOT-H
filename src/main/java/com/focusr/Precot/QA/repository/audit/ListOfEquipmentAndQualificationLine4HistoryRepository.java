package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ListOfEquipmentAndQualificationLine4;
import com.focusr.Precot.QA.model.audit.ListOfEquipmentAndQualificationLine4History;

@Repository
public interface ListOfEquipmentAndQualificationLine4HistoryRepository extends JpaRepository<ListOfEquipmentAndQualificationLine4History, Long>{

}
