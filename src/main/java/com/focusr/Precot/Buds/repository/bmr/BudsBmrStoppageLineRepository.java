package com.focusr.Precot.Buds.repository.bmr;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrStoppageLine;

@Repository
public interface BudsBmrStoppageLineRepository extends JpaRepository<BudsBmrStoppageLine, Long>{

}
