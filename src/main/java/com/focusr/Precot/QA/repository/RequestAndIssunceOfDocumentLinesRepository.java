package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.RequestAndIssunceOfLineDocumentsF002;

@Repository
public interface RequestAndIssunceOfDocumentLinesRepository extends JpaRepository<RequestAndIssunceOfLineDocumentsF002, Long>{

	
	List<RequestAndIssunceOfLineDocumentsF002> findByLineIdAndRequestId(Long lineId, Long requestId);

}
