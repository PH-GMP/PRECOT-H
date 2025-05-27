package com.focusr.Precot.mssql.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.lov.MixingChangeOver;



@Repository
public interface MixingChangeOverRepository extends JpaRepository<MixingChangeOver, Long> {

}
