package com.focusr.Precot.mssql.database.model.padpunching.bmr;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PUNCHING_BMR_STOPPAGE_HEADER", schema = AppConstants.schema)
public class PunchingBmrStoppageHeader extends UserDateAudit {

	@Column(name = "STOPPAGE_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long stoppageId;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "ORDER_NO")
	private String orderNo;

	@Column(name = "BATCH_NO")
	private String batchNo;

	@Column(name = "FROM_DATE")
	private String fromdate;

	@Column(name = "TO_DATE")
	private String todate;

	@Column(name = "MACHINE_NAME")
	private String machineName;

	// NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;

	@OneToMany(mappedBy = "stoppageRecord", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PunchingBmrStoppageLine> details;

}
