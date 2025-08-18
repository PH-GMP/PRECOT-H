package com.focusr.Precot.mssql.database.repository.Qc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.NonWovenF005Lines;

@Repository
public interface NonWovenF005LinesRepo extends JpaRepository<NonWovenF005Lines, Long> {

}
