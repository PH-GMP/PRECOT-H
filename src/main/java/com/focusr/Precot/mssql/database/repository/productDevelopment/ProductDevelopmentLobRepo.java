package com.focusr.Precot.mssql.database.repository.productDevelopment;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentLob;


@Repository
public interface ProductDevelopmentLobRepo extends  JpaRepository<ProductDevelopmentLob, Long> {

	 Optional<ProductDevelopmentLob> findByPdsNo(String pdsNo);

}
