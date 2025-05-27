package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEnclosureList;

@Repository
public interface PunchingBmrEnclosureListRepository extends JpaRepository<PunchingBmrEnclosureList, Long>{

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_ENCLOSURE_LIST WHERE ID=:id", nativeQuery = true)
	PunchingBmrEnclosureList getEnclosureListById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_ENCLOSURE_LIST WHERE BATCH_NO=:order", nativeQuery = true)
	List<PunchingBmrEnclosureList> getEnclosureListByOrder(@Param("order") String order);
	
}
