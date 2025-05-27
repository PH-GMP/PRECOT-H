package com.focusr.Precot.mssql.database.model.bleaching.audit;

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
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContAbCottonF08;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_APPLIED_CONT_AB_COTTON_TYPES_HISTORY_F08",schema=AppConstants.schema)
public class BleachAppliedContAbCottonTypesHistoryF08 extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "AB_ID")
	private Long ab_id;

	@Column(name = "TYPE")
	private String type;

	@Column(name = "BW1_COMBINATION")
	private int bw1Contamination;

	@Column(name = "BW2_COMBINATION")
	private int bw2Contamination;

	@Column(name = "BW3_SAMPLE")
	private String bw3Sample;

	@Column(name = "BW4_SAMPLE")
	private String bw4Sample;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "AB_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BleachAppliedContAbCottonHistoryF08 rawCottonF04;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAb_id() {
		return ab_id;
	}

	public void setAb_id(Long ab_id) {
		this.ab_id = ab_id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getBw1Contamination() {
		return bw1Contamination;
	}

	public void setBw1Contamination(int bw1Contamination) {
		this.bw1Contamination = bw1Contamination;
	}

	public int getBw2Contamination() {
		return bw2Contamination;
	}

	public void setBw2Contamination(int bw2Contamination) {
		this.bw2Contamination = bw2Contamination;
	}

	public String getBw3Sample() {
		return bw3Sample;
	}

	public void setBw3Sample(String bw3Sample) {
		this.bw3Sample = bw3Sample;
	}

	public String getBw4Sample() {
		return bw4Sample;
	}

	public void setBw4Sample(String bw4Sample) {
		this.bw4Sample = bw4Sample;
	}

	public BleachAppliedContAbCottonHistoryF08 getRawCottonF04() {
		return rawCottonF04;
	}

	public void setRawCottonF04(BleachAppliedContAbCottonHistoryF08 rawCottonF04) {
		this.rawCottonF04 = rawCottonF04;
	}

	
	
	
}
