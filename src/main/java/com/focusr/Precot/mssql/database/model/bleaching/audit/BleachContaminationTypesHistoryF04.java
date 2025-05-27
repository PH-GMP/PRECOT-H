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
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_CONTAMINATION_TYPES_HISTORY_F04",schema=AppConstants.schema)
public class BleachContaminationTypesHistoryF04 extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "RAW_ID")
	private Long raw_id;

	@Column(name = "TYPE")
	private String type;

	@Column(name = "BW1_COMBINATION")
	private int bw1Contamination;

	@Column(name = "BW2_COMBINATION")
	private int bw2Contamination;

	@Column(name = "BW3_COMBINATION")
	private int bw3Contamination;

	@Column(name = "BW4_COMBINATION")
	private int bw4Contamination;

	@Column(name = "BW1_SAMPLE")
	private String bw1Sample;

	@Column(name = "BW2_SAMPLE")
	private String bw2Sample;

	@Column(name = "BW3_SAMPLE")
	private String bw3Sample;

	@Column(name = "BW4_SAMPLE")
	private String bw4Sample;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RAW_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BleachAppliedContRawCottonHistoryF04 rawCottonF04;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRaw_id() {
		return raw_id;
	}

	public void setRaw_id(Long raw_id) {
		this.raw_id = raw_id;
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

	public int getBw3Contamination() {
		return bw3Contamination;
	}

	public void setBw3Contamination(int bw3Contamination) {
		this.bw3Contamination = bw3Contamination;
	}

	public int getBw4Contamination() {
		return bw4Contamination;
	}

	public void setBw4Contamination(int bw4Contamination) {
		this.bw4Contamination = bw4Contamination;
	}

	public String getBw1Sample() {
		return bw1Sample;
	}

	public void setBw1Sample(String bw1Sample) {
		this.bw1Sample = bw1Sample;
	}

	public String getBw2Sample() {
		return bw2Sample;
	}

	public void setBw2Sample(String bw2Sample) {
		this.bw2Sample = bw2Sample;
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
	

	public BleachAppliedContRawCottonHistoryF04 getRawCottonF04() {
		return rawCottonF04;
	}

	public void setRawCottonF04(BleachAppliedContRawCottonHistoryF04 rawCottonF04) {
		this.rawCottonF04 = rawCottonF04;
	}

	public BleachContaminationTypesHistoryF04() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
