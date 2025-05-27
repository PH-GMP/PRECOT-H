package com.focusr.Precot.mssql.database.model.padpunching.bmr;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "PADPUNCHING_BMR_ENCLOSURE_LIST", schema = AppConstants.schema)
public class PunchingBmrEnclosureList extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "TITLE1")
	private String title1;

	@Column(name = "TITLE2")
	private String title2;

	@Column(name = "REMARKS1")
	private String remarks1;

	@Column(name = "REMARKS2")
	private String remarks2;

	@Column(name = "ORDER_NO")
	private String orderNo;

	@Column(name = "BATCH_NO")
	private String batchNo;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "SUPERVISIOR_STATUS")
	private String supervisiorStatus;

	@Column(name = "QA_STATUS")
	private String qaStatus;

	@Column(name = "TITLE3")
	private String title3;

	@Column(name = "REMARKS3")
	private String remarks3;

}
