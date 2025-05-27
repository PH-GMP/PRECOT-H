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
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.mssql.database.model.OperatorHodApproval;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "DRYGOODS_SLIVER_RECEIPT_DETAILS", schema = AppConstants.schema)
public class SliverReceiptDetailsF003 {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "SLIVER_ID")
		private Long sliver_id;

		@Column(name = "CAN_NO")
		private String can_no;
		
		@Column(name = "GRAM_OR_MTRS")
		private String gram_or_mtrs;
		
		@Column(name = "CARDING_MC_NO")
		private String carding_mc_no;
		
		@Column(name = "NET_WEIGHT_KG")
		private String net_weight_kg;
		
		@Column(name = "COTTONBALLS_ID")
		private Long cottonballs_id;
		
		   @ManyToOne(fetch = FetchType.EAGER)
		    @JoinColumn(name = "COTTONBALLS_ID", insertable = false, updatable = false)
		    @JsonIgnore
		    private DailyProductionCottonBallsF003 dailyproductioncottonballs;
		

}
