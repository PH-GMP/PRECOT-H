package com.focusr.Precot.mssql.database.repository.bleaching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BleachStorePersons;

public interface BleachStorePersonsRepository extends JpaRepository<BleachStorePersons,Long>{

	@Query(value = "SELECT * FROM precot.BLEACH_STORE_PERSONS WHERE ID = :id ", nativeQuery = true)
	BleachStorePersons getById(@Param("id") long id);
}
