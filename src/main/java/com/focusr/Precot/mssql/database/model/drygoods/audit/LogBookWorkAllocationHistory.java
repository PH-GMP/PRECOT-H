package com.focusr.Precot.mssql.database.model.drygoods.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookWorkAllocation;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_WORK_ALLOCATION_HISTORY", schema = AppConstants.schema)
public class LogBookWorkAllocationHistory {
	@Id
	@Column(name = "LINE_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long line_id;

	@Column(name = "HISTORY_ID")
	private Long history_id;

	@Column(name = "MC_NO")
	private String mc_no;

	@Column(name = "PERSON_REQ")
	private String person_req;

	@Column(name = "PERSON_PRESENT")
	private String person_present;

	@Column(name = "RUNNING")
	private String running;

	@Column(name = "NEXT")
	private String next;

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "LOG_ID", insertable = false, updatable = false)
//	@JsonIgnore
//	private LogBookHeader allocation;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HISTORY_ID",referencedColumnName = "HISTORY_ID", insertable = false, updatable = false)
	@JsonIgnore
	private LogBookHeaderHistory allocation;

}
