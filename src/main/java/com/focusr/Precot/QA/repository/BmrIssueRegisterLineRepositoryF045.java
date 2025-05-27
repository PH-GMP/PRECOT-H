package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.BmrIssueRegisterLineF045;
import com.focusr.Precot.QA.model.ProductDispositionLogBookLineDetails;

@Repository
public interface BmrIssueRegisterLineRepositoryF045 extends JpaRepository<BmrIssueRegisterLineF045, Long> {

}
