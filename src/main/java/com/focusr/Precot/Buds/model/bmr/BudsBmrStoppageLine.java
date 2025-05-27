package com.focusr.Precot.Buds.model.bmr;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrStoppageHeader;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_BMR_STOPPAGE_LINE", schema = AppConstants.schema)
public class BudsBmrStoppageLine extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "FROM_TIME")
	private String fromTime;
	
	@Column(name = "TO_TIME")
	private String toTime;
	
	@Column(name = "TOTAL_TIME")
	private String totalTime;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisorStatus;
	
	@Column(name = "SUPERVISOR_NAME")
	private String supervisorName;
	
	@Column(name = "SUPERVISOR_ID")
	private Long supervisorId;
	
	@Column(name = "SUPERVISOR_DATE")
	private String supervisorDate;

	@ManyToOne
    @JoinColumn(name = "STOPPAGE_ID", nullable = false)
	@JsonIgnore
    private BudsBmrStoppageHeader stoppageRecord;
	
}
