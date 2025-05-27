package com.focusr.Precot.mssql.database.repository.Qc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.QAqcObservations;

@Repository
public interface qcObservationsrepo extends JpaRepository<QAqcObservations, Long> {

}
