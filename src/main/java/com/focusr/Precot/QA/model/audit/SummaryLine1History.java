package com.focusr.Precot.QA.model.audit;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_SUMMARY_LINE_1_HISTORY", schema = AppConstants.schema)
public class SummaryLine1History {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "PARTICULARS")
	private String particulars;
	
	@Column(name = "NO_OF_TOTAL_LOTS")
	private String noOfTotalLots;
	
	@Column(name = "ACCEPTED")
	private String accepted;
	
	@Column(name = "REJECTED")
	private String rejected;
	
	@Column(name = "SUMMARY_REMARKS")
	private String summaryRemarks;
	
	@Column(name = "HISTORY_ID")
	private Long historyId;
}
