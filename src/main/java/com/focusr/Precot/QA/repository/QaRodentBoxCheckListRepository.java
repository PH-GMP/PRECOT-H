package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaRodentBoxCheckList;

@Repository
public interface QaRodentBoxCheckListRepository extends JpaRepository<QaRodentBoxCheckList, Long>{

	@Query(value = "SELECT * FROM precot.QA_RODENT_BOX_CHECK_LIST WHERE LIST_ID = :list_id ", nativeQuery = true)
	QaRodentBoxCheckList findFormById(@Param("list_id") long list_id);
	
	@Query(value = "SELECT * FROM precot.QA_RODENT_BOX_CHECK_LIST WHERE MONTH =:month AND YEAR =:year AND DATE =:date", nativeQuery = true)
	QaRodentBoxCheckList findByparam(@Param("month") String month, @Param("year") String year,@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_RODENT_BOX_CHECK_LIST WHERE (:month IS NULL OR :month='' OR MONTH=:month) AND (:year IS NULL OR :year='' OR YEAR=:year) AND (:date IS NULL OR :date='' OR DATE=:date)  AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<QaRodentBoxCheckList> printApi(@Param("month") String month, @Param("year") String year,@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_RODENT_BOX_CHECK_LIST WHERE PCI_STATUS = 'PCI_SAVED' OR QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
    List<QaRodentBoxCheckList> pciSummary();

	@Query(value = "SELECT * FROM precot.QA_RODENT_BOX_CHECK_LIST WHERE PCI_STATUS = 'PCI_SUBMITTED' AND QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
    List<QaRodentBoxCheckList> qaMrSummary();
}
