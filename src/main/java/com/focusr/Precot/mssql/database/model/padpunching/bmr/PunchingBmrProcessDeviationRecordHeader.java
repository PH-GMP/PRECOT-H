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
@Table(name = "PADPUNCHING_BMR_PROCESS_DEVIATION_HEADER", schema = AppConstants.schema)
public class PunchingBmrProcessDeviationRecordHeader extends UserDateAudit {

	@Id
	@Column(name = "DEVIATION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long deviationId;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "STATUS")
	private String status;
	
	@OneToMany(mappedBy = "deviationRecord", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PunchingBmrProcessDeviationRecordLine> details;
	
}
