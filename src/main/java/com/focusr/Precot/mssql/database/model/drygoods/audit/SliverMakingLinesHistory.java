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
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_SLIVER_MAKING_LINE_HISTORY_02", schema = AppConstants.schema)
public class SliverMakingLinesHistory {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "CAN_NO")
	private String can_no;

	@Column(name = "HISTORY_ID")
	private Long history_id;

	@Column(name = "GPM")
	private String gpm;

	@Column(name = "CARDING_MC_NO")
	private String carding_mc_no;

	@Column(name = "NET_WT")
	private String net_wt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HISTORY_ID", insertable = false, updatable = false)
	@JsonIgnore
	private SliverMakingHeaderHistory sliverDetails;

}
