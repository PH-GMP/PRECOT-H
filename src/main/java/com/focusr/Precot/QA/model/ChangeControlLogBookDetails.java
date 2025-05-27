package com.focusr.Precot.QA.model;

import static javax.persistence.TemporalType.TIMESTAMP;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.UniqueConstraint;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "CHANGE_CONTROLL_LOG_BOOK_DETAILS", schema = AppConstants.schema)
public class ChangeControlLogBookDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DETAILS_ID")
	private Long detailsId;
	
	@CreatedBy
	private String issuedBy;
	
	@CreatedDate
	@Temporal(TIMESTAMP)
	private Date issuedAt;

	@CreatedBy
	private String recivedBy;
	
	@CreatedDate
	@Temporal(TIMESTAMP)
	private Date recivedAt;
	
	@Column(name = "CHANGE_INTIATION_DATE")
	private String changeInitiationDate;
	
	@Column(name = "TENTATIVE_CLOSURE_DATE")
	private String tentativeClosureDate;

	@Column(name = "ID")
	private Long id;
	
}
