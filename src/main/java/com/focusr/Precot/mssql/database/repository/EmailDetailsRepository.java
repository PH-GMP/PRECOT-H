package com.focusr.Precot.mssql.database.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.EmailDetails;

/**
 * Created by FocusR on 29-Sep-2019.
 */
@Repository
public interface EmailDetailsRepository extends JpaRepository<EmailDetails, Long> {

	@Override
	List<EmailDetails> findAll();
	
	@Query(value = "select * from precot.EMAIL_DETAILS" , nativeQuery = true)
	EmailDetails findByEmailDetails();

	@Query(value = "select * from precot.EMAIL_DETAILS", nativeQuery = true)
	Optional<EmailDetails> findOneEmailDetails();

}
