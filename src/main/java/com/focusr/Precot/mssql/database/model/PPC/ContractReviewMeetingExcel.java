package com.focusr.Precot.mssql.database.model.PPC;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PPC_CONTRACT_REVIEW_MEETING_EXCEL", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "DETAILS","CUSTOMER_NAME" }) })
@Data
public class ContractReviewMeetingExcel extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "DATE")
	private String date;

	@Column(name = "CUSTOMER_NAME")
	private String customerName;

	@Column(name = "DETAILS")
	private String details;
	@Column(name = "EXCEL_FILE")
	@Lob
	private byte[] excelFile;

	public ContractReviewMeetingExcel() {
	}

}
