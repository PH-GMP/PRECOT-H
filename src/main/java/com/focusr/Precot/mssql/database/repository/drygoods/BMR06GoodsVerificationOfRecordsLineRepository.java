package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR06GoodsVerificationOfRecordsLine;

public interface BMR06GoodsVerificationOfRecordsLineRepository
		extends JpaRepository<BMR06GoodsVerificationOfRecordsLine, Long> {

	
}
