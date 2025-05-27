package com.focusr.Precot.mssql.database.model.drygoods;

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
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "DRYGOODS_SLIVER_MAKING_LINE_02", schema = AppConstants.schema)
public class SliverMakingLines {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "CAN_NO")
	private String can_no;

	@Column(name = "SLIVER_ID")
	private Long sliver_id;

	@Column(name = "GPM")
	private String gpm;

	@Column(name = "CARDING_MC_NO")
	private String carding_mc_no;

	@Column(name = "NET_WT")
	private String net_wt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SLIVER_ID", insertable = false, updatable = false)
	@JsonIgnore
	private SliverMakingHeader sliverDetails;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCan_no() {
		return can_no;
	}

	public void setCan_no(String can_no) {
		this.can_no = can_no;
	}

	public Long getSliver_id() {
		return sliver_id;
	}

	public void setSliver_id(Long sliver_id) {
		this.sliver_id = sliver_id;
	}

	public String getGpm() {
		return gpm;
	}

	public void setGpm(String gpm) {
		this.gpm = gpm;
	}

	public String getCarding_mc_no() {
		return carding_mc_no;
	}

	public void setCarding_mc_no(String carding_mc_no) {
		this.carding_mc_no = carding_mc_no;
	}

	public String getNet_wt() {
		return net_wt;
	}

	public void setNet_wt(String net_wt) {
		this.net_wt = net_wt;
	}

	public SliverMakingHeader getSliverDetails() {
		return sliverDetails;
	}

	public void setSliverDetails(SliverMakingHeader sliverDetails) {
		this.sliverDetails = sliverDetails;
	}

	public SliverMakingLines() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
