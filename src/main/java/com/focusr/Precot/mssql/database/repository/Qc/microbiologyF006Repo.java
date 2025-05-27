package com.focusr.Precot.mssql.database.repository.Qc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.MicrobilogyTestF006;

@Repository
public interface microbiologyF006Repo extends JpaRepository<MicrobilogyTestF006, Long>{

}
