package com.focusr.Precot.mssql.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.lov.LaydownNumber;



@Repository
public interface LaydownNumberRepository extends JpaRepository<LaydownNumber, Long>{
	

}
