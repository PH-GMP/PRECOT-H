package com.focusr.Precot.mssql.database.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.MsXoauthSMTP;


@Repository
public interface MsXoauthSMTPRepository extends JpaRepository<MsXoauthSMTP, Long>{
	
//	Boolean existsByProjectName(String projectName);
	
	 @Query(value = "select * from precot.MS_XOAUTH_SMTP", nativeQuery = true)
	 MsXoauthSMTP findByEmailDetails();
	 

}
