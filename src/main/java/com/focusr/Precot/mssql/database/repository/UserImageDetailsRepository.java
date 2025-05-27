package com.focusr.Precot.mssql.database.repository;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.UserImageDetails;

@Repository
public interface UserImageDetailsRepository extends JpaRepository<UserImageDetails, Long>{

	@Query(value = "select * from precot.IMAGE_DETAILS where IMAGE_ID =:item_id", nativeQuery = true)
	Optional<UserImageDetails> getOptionalItemDetails(@Param("item_id") Long item_id);
	
	@Query(value = "select * from precot.IMAGE_DETAILS where IMAGE_ID =:item_id", nativeQuery = true)
	UserImageDetails getItemDetails(@Param("item_id") Long item_id);
	
	
	@Query(value = "select * from precot.IMAGE_DETAILS where USERNAME =:username", nativeQuery = true)
	UserImageDetails getItemDetailsByUsername(@Param("username") String username);
	
	
	@Query(value = "select * from precot.IMAGE_DETAILS where USERNAME =:username", nativeQuery = true)
	Optional<UserImageDetails> fetchItemDetailsByUsername(@Param("username") String username);
	
	
}
