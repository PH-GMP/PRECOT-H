package com.focusr.Precot.Buds.model.bmr;

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
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrQualityReleaseLine;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_QUALITY_RELEASE_HEADER", schema = AppConstants.schema)
public class BudsBmrQualityReleaseHeader extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "QUALITY_ID")
	private Long qualityId;

	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "BATCH_NO")
	private String batchNo;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "STATUS")
	private String status;
	
	@OneToMany(mappedBy = "qualityRecord", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BudsBmrQualityReleaseLine> details;
	
}
