package com.focusr.Precot.mssql.database.repository.drygoods;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.GoodsSanitationListF06;



@Repository
public interface GoodsSanitationListRepositoryF13 extends JpaRepository<GoodsSanitationListF06, Long>{

	@Query(value = "SELECT * FROM precot.GOODS_SANITIZATION_LIST_F24 WHERE ID=:id", nativeQuery = true)
	GoodsSanitationListF06 getSanitationListById(@Param("id") Long id);
	
}
