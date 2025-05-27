package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.ProductDispositionLogBookHistoryLineDetailsF049;

@Repository
public interface ProductDispositionLogBookLinesHistoryRepository extends JpaRepository<ProductDispositionLogBookHistoryLineDetailsF049, Long>{

}
