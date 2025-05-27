package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaOnlineInspectionList;

@Repository
public interface QaOnlineInspectionListRepository extends JpaRepository<QaOnlineInspectionList, Long>{

	
	
}
