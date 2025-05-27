package com.focusr.Precot.mssql.database.repository.Store.audit;

import org.springframework.data.jpa.repository.JpaRepository;

import com.focusr.Precot.mssql.database.model.Store.NonReturnableGoodsDetail;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGoodsDetailHistory;



public interface NonReturnableGoodsDetailHistoryRepo  extends JpaRepository<NonReturnableGoodsDetailHistory, Long> {
	
	
	
}

