package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ProductDispositionLogBookLineDetails;
import com.focusr.Precot.QA.model.QaContainerInspectionReportLines;

@Repository
public interface ProductDispositionLogBookLineDetailsRepository extends JpaRepository<ProductDispositionLogBookLineDetails, Long>{

}
