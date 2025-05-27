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
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_BMR_QUALITY_RELEASE_HEADER", schema = AppConstants.schema)
public class PunchingBmrQualityReleaseHeader {

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
	private List<PunchingBmrQualityReleaseLine> details;

}
