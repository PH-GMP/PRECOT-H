package com.focusr.Precot.mssql.database.repository.Qc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.microbiologicalTestF002;

@Repository
public interface microbiologicalTestRepo extends JpaRepository<microbiologicalTestF002, Long> {

}
