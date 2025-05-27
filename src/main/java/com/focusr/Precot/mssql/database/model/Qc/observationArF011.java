package com.focusr.Precot.mssql.database.model.Qc;

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
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Table(name = "OBSERVATION_ARF011", schema = AppConstants.schema)
@Entity
@Data
public class observationArF011 extends UserDateAudit{
	
	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id;
	   
	   @Column(name = "NO_MC_USED")
	   private String no_mc_used;
	   
	   @Column(name = "RAILWAY_TIME_FROM")
	   private String railway_time_from;
	   
	   @Column(name = "RAILWAY_TIME_TO")
	   private String railway_time_to;
	   
	   @Column(name = "TOTAL")
	   private String total;
	   
	   @Column(name = "BEFORE_FUMIGATION")
	   private String before_fumigation;
	   
	   @Column(name = "AFTER_FUMIGATION")
	   private String after_fumigation;
	   
	   @Column(name = "ANALYTICAL_REQUEST_NUMBER")
	   private String analytical_request_number;
	   
	   @Column(name = "TOTAL_VIABLE_BEFORE")
	   private String total_viable_before;
	   
	   @Column(name = "TOTAL_VIABLE_AFTER")
	   private String total_viable_after;
	   
	   @Column(name = "VIABLE_REDUCTION")
	   private String viable_reduction;
	   
	   @Column(name = "TOTAL_FUNGAL_BEFORE")
	   private String total_fungal_before;
	   
	   @Column(name = "TOTAL_FUNGAL_AFTER")
	   private String total_fungal_after;
	   
	   @Column(name = "FUNGAL_REDUCTION")
	   private String fungal_reduction;
	   
	   @Column(name = "REMARK")
	   private String remark;
	   
	   // - -- - - - -
	   
	   @Column(name = "BL_NO_MC_USED")
	   private String bl_no_mc_used;

	   @Column(name = "BL_RAILWAY_TIME_FROM")
	   private String bl_railway_time_from;

	   @Column(name = "BL_RAILWAY_TIME_TO")
	   private String bl_railway_time_to;

	   @Column(name = "BL_TOTAL")
	   private String bl_total;

	   @Column(name = "BL_BEFORE_FUMIGATION")
	   private String bl_before_fumigation;

	   @Column(name = "BL_AFTER_FUMIGATION")
	   private String bl_after_fumigation;

	   @Column(name = "BL_ANALYTICAL_REQUEST_NUMBER")
	   private String bl_analytical_request_number;

	   @Column(name = "BL_TOTAL_VIABLE_BEFORE")
	   private String bl_total_viable_before;

	   @Column(name = "BL_TOTAL_VIABLE_AFTER")
	   private String bl_total_viable_after;

	   @Column(name = "BL_VIABLE_REDUCTION")
	   private String bl_viable_reduction;

	   @Column(name = "BL_TOTAL_FUNGAL_BEFORE")
	   private String bl_total_fungal_before;

	   @Column(name = "BL_TOTAL_FUNGAL_AFTER")
	   private String bl_total_fungal_after;

	   @Column(name = "BL_FUNGAL_REDUCTION")
	   private String bl_fungal_reduction;

	   @Column(name = "BL_REMARK")
	   private String bl_remark;
	   
	   
	   @Column(name = "BL_BLRC_NO_MC_USED")
	   private String bl_blrc_no_mc_used;

	   @Column(name = "BL_BLRC_RAILWAY_TIME_FROM")
	   private String bl_blrc_railway_time_from;

	   @Column(name = "BL_BLRC_RAILWAY_TIME_TO")
	   private String bl_blrc_railway_time_to;

	   @Column(name = "BL_BLRC_TOTAL")
	   private String bl_blrc_total;

	   @Column(name = "BL_BLRC_BEFORE_FUMIGATION")
	   private String bl_blrc_before_fumigation;

	   @Column(name = "BL_BLRC_AFTER_FUMIGATION")
	   private String bl_blrc_after_fumigation;

	   @Column(name = "BL_BLRC_ANALYTICAL_REQUEST_NUMBER")
	   private String bl_blrc_analytical_request_number;

	   @Column(name = "BL_BLRC_TOTAL_VIABLE_BEFORE")
	   private String bl_blrc_total_viable_before;

	   @Column(name = "BL_BLRC_TOTAL_VIABLE_AFTER")
	   private String bl_blrc_total_viable_after;

	   @Column(name = "BL_BLRC_VIABLE_REDUCTION")
	   private String bl_blrc_viable_reduction;

	   @Column(name = "BL_BLRC_TOTAL_FUNGAL_BEFORE")
	   private String bl_blrc_total_fungal_before;

	   @Column(name = "BL_BLRC_TOTAL_FUNGAL_AFTER")
	   private String bl_blrc_total_fungal_after;

	   @Column(name = "BL_BLRC_FUNGAL_REDUCTION")
	   private String bl_blrc_fungal_reduction;

	   @Column(name = "BL_BLRC_REMARK")
	   private String bl_blrc_remark;

	   
	   
	   @Column(name = "BL_WBP_NO_MC_USED")
	   private String bl_wbp_no_mc_used;

	   @Column(name = "BL_WBP_RAILWAY_TIME_FROM")
	   private String bl_wbp_railway_time_from;

	   @Column(name = "BL_WBP_RAILWAY_TIME_TO")
	   private String bl_wbp_railway_time_to;

	   @Column(name = "BL_WBP_TOTAL")
	   private String bl_wbp_total;

	   @Column(name = "BL_WBP_BEFORE_FUMIGATION")
	   private String bl_wbp_before_fumigation;

	   @Column(name = "BL_WBP_AFTER_FUMIGATION")
	   private String bl_wbp_after_fumigation;

	   @Column(name = "BL_WBP_ANALYTICAL_REQUEST_NUMBER")
	   private String bl_wbp_analytical_request_number;

	   @Column(name = "BL_WBP_TOTAL_VIABLE_BEFORE")
	   private String bl_wbp_total_viable_before;

	   @Column(name = "BL_WBP_TOTAL_VIABLE_AFTER")
	   private String bl_wbp_total_viable_after;

	   @Column(name = "BL_WBP_VIABLE_REDUCTION")
	   private String bl_wbp_viable_reduction;

	   @Column(name = "BL_WBP_TOTAL_FUNGAL_BEFORE")
	   private String bl_wbp_total_fungal_before;

	   @Column(name = "BL_WBP_TOTAL_FUNGAL_AFTER")
	   private String bl_wbp_total_fungal_after;

	   @Column(name = "BL_WBP_FUNGAL_REDUCTION")
	   private String bl_wbp_fungal_reduction;

	   @Column(name = "BL_WBP_REMARK")
	   private String bl_wbp_remark;

	   
	   @Column(name = "BL_BA_NO_MC_USED")
	   private String bl_ba_no_mc_used;

	   @Column(name = "BL_BA_RAILWAY_TIME_FROM")
	   private String bl_ba_railway_time_from;

	   @Column(name = "BL_BA_RAILWAY_TIME_TO")
	   private String bl_ba_railway_time_to;

	   @Column(name = "BL_BA_TOTAL")
	   private String bl_ba_total;

	   @Column(name = "BL_BA_BEFORE_FUMIGATION")
	   private String bl_ba_before_fumigation;

	   @Column(name = "BL_BA_AFTER_FUMIGATION")
	   private String bl_ba_after_fumigation;

	   @Column(name = "BL_BA_ANALYTICAL_REQUEST_NUMBER")
	   private String bl_ba_analytical_request_number;

	   @Column(name = "BL_BA_TOTAL_VIABLE_BEFORE")
	   private String bl_ba_total_viable_before;

	   @Column(name = "BL_BA_TOTAL_VIABLE_AFTER")
	   private String bl_ba_total_viable_after;

	   @Column(name = "BL_BA_VIABLE_REDUCTION")
	   private String bl_ba_viable_reduction;

	   @Column(name = "BL_BA_TOTAL_FUNGAL_BEFORE")
	   private String bl_ba_total_fungal_before;

	   @Column(name = "BL_BA_TOTAL_FUNGAL_AFTER")
	   private String bl_ba_total_fungal_after;

	   @Column(name = "BL_BA_FUNGAL_REDUCTION")
	   private String bl_ba_fungal_reduction;

	   @Column(name = "BL_BA_REMARK")
	   private String bl_ba_remark;

	   
	   
	   //-----

	   @Column(name = "FG_NO_MC_USED")
	   private String fg_no_mc_used;

	   @Column(name = "FG_RAILWAY_TIME_FROM")
	   private String fg_railway_time_from;

	   @Column(name = "FG_RAILWAY_TIME_TO")
	   private String fg_railway_time_to;

	   @Column(name = "FG_TOTAL")
	   private String fg_total;

	   @Column(name = "FG_BEFORE_FUMIGATION")
	   private String fg_before_fumigation;

	   @Column(name = "FG_AFTER_FUMIGATION")
	   private String fg_after_fumigation;

	   @Column(name = "FG_ANALYTICAL_REQUEST_NUMBER")
	   private String fg_analytical_request_number;

	   @Column(name = "FG_TOTAL_VIABLE_BEFORE")
	   private String fg_total_viable_before;

	   @Column(name = "FG_TOTAL_VIABLE_AFTER")
	   private String fg_total_viable_after;

	   @Column(name = "FG_VIABLE_REDUCTION")
	   private String fg_viable_reduction;

	   @Column(name = "FG_TOTAL_FUNGAL_BEFORE")
	   private String fg_total_fungal_before;

	   @Column(name = "FG_TOTAL_FUNGAL_AFTER")
	   private String fg_total_fungal_after;

	   @Column(name = "FG_FUNGAL_REDUCTION")
	   private String fg_fungal_reduction;

	   @Column(name = "FG_REMARK")
	   private String fg_remark;

	   //----
	   @Column(name = "VMI_NO_MC_USED")
	   private String vmi_no_mc_used;

	   @Column(name = "VMI_RAILWAY_TIME_FROM")
	   private String vmi_railway_time_from;

	   @Column(name = "VMI_RAILWAY_TIME_TO")
	   private String vmi_railway_time_to;

	   @Column(name = "VMI_TOTAL")
	   private String vmi_total;

	   @Column(name = "VMI_BEFORE_FUMIGATION")
	   private String vmi_before_fumigation;

	   @Column(name = "VMI_AFTER_FUMIGATION")
	   private String vmi_after_fumigation;

	   @Column(name = "VMI_ANALYTICAL_REQUEST_NUMBER")
	   private String vmi_analytical_request_number;

	   @Column(name = "VMI_TOTAL_VIABLE_BEFORE")
	   private String vmi_total_viable_before;

	   @Column(name = "VMI_TOTAL_VIABLE_AFTER")
	   private String vmi_total_viable_after;

	   @Column(name = "VMI_VIABLE_REDUCTION")
	   private String vmi_viable_reduction;

	   @Column(name = "VMI_TOTAL_FUNGAL_BEFORE")
	   private String vmi_total_fungal_before;

	   @Column(name = "VMI_TOTAL_FUNGAL_AFTER")
	   private String vmi_total_fungal_after;

	   @Column(name = "VMI_FUNGAL_REDUCTION")
	   private String vmi_fungal_reduction;

	   @Column(name = "VMI_REMARK")
	   private String vmi_remark;
	   
	   @Column(name = "VMI_BMOP_NO_MC_USED")
	   private String vmi_bmop_no_mc_used;

	   @Column(name = "VMI_BMOP_RAILWAY_TIME_FROM")
	   private String vmi_bmop_railway_time_from;

	   @Column(name = "VMI_BMOP_RAILWAY_TIME_TO")
	   private String vmi_bmop_railway_time_to;

	   @Column(name = "VMI_BMOP_TOTAL")
	   private String vmi_bmop_total;

	   @Column(name = "VMI_BMOP_BEFORE_FUMIGATION")
	   private String vmi_bmop_before_fumigation;

	   @Column(name = "VMI_BMOP_AFTER_FUMIGATION")
	   private String vmi_bmop_after_fumigation;

	   @Column(name = "VMI_BMOP_ANALYTICAL_REQUEST_NUMBER")
	   private String vmi_bmop_analytical_request_number;

	   @Column(name = "VMI_BMOP_TOTAL_VIABLE_BEFORE")
	   private String vmi_bmop_total_viable_before;

	   @Column(name = "VMI_BMOP_TOTAL_VIABLE_AFTER")
	   private String vmi_bmop_total_viable_after;

	   @Column(name = "VMI_BMOP_VIABLE_REDUCTION")
	   private String vmi_bmop_viable_reduction;

	   @Column(name = "VMI_BMOP_TOTAL_FUNGAL_BEFORE")
	   private String vmi_bmop_total_fungal_before;

	   @Column(name = "VMI_BMOP_TOTAL_FUNGAL_AFTER")
	   private String vmi_bmop_total_fungal_after;

	   @Column(name = "VMI_BMOP_FUNGAL_REDUCTION")
	   private String vmi_bmop_fungal_reduction;

	   @Column(name = "VMI_BMOP_REMARK")
	   private String vmi_bmop_remark;

	   
	   @Column(name = "VMI_ACE2PA_NO_MC_USED")
	   private String vmi_ace2pa_no_mc_used;

	   @Column(name = "VMI_ACE2PA_RAILWAY_TIME_FROM")
	   private String vmi_ace2pa_railway_time_from;

	   @Column(name = "VMI_ACE2PA_RAILWAY_TIME_TO")
	   private String vmi_ace2pa_railway_time_to;

	   @Column(name = "VMI_ACE2PA_TOTAL")
	   private String vmi_ace2pa_total;

	   @Column(name = "VMI_ACE2PA_BEFORE_FUMIGATION")
	   private String vmi_ace2pa_before_fumigation;

	   @Column(name = "VMI_ACE2PA_AFTER_FUMIGATION")
	   private String vmi_ace2pa_after_fumigation;

	   @Column(name = "VMI_ACE2PA_ANALYTICAL_REQUEST_NUMBER")
	   private String vmi_ace2pa_analytical_request_number;

	   @Column(name = "VMI_ACE2PA_TOTAL_VIABLE_BEFORE")
	   private String vmi_ace2pa_total_viable_before;

	   @Column(name = "VMI_ACE2PA_TOTAL_VIABLE_AFTER")
	   private String vmi_ace2pa_total_viable_after;

	   @Column(name = "VMI_ACE2PA_VIABLE_REDUCTION")
	   private String vmi_ace2pa_viable_reduction;

	   @Column(name = "VMI_ACE2PA_TOTAL_FUNGAL_BEFORE")
	   private String vmi_ace2pa_total_fungal_before;

	   @Column(name = "VMI_ACE2PA_TOTAL_FUNGAL_AFTER")
	   private String vmi_ace2pa_total_fungal_after;

	   @Column(name = "VMI_ACE2PA_FUNGAL_REDUCTION")
	   private String vmi_ace2pa_fungal_reduction;

	   @Column(name = "VMI_ACE2PA_REMARK")
	   private String vmi_ace2pa_remark;

	   //----

	   @Column(name = "JET_NO_MC_USED")
	   private String jet_no_mc_used;

	   @Column(name = "JET_RAILWAY_TIME_FROM")
	   private String jet_railway_time_from;

	   @Column(name = "JET_RAILWAY_TIME_TO")
	   private String jet_railway_time_to;

	   @Column(name = "JET_TOTAL")
	   private String jet_total;

	   @Column(name = "JET_BEFORE_FUMIGATION")
	   private String jet_before_fumigation;

	   @Column(name = "JET_AFTER_FUMIGATION")
	   private String jet_after_fumigation;

	   @Column(name = "JET_ANALYTICAL_REQUEST_NUMBER")
	   private String jet_analytical_request_number;

	   @Column(name = "JET_TOTAL_VIABLE_BEFORE")
	   private String jet_total_viable_before;

	   @Column(name = "JET_TOTAL_VIABLE_AFTER")
	   private String jet_total_viable_after;

	   @Column(name = "JET_VIABLE_REDUCTION")
	   private String jet_viable_reduction;

	   @Column(name = "JET_TOTAL_FUNGAL_BEFORE")
	   private String jet_total_fungal_before;

	   @Column(name = "JET_TOTAL_FUNGAL_AFTER")
	   private String jet_total_fungal_after;

	   @Column(name = "JET_FUNGAL_REDUCTION")
	   private String jet_fungal_reduction;

	   @Column(name = "JET_REMARK")
	   private String jet_remark;

	   @Column(name = "JET_RW_NO_MC_USED")
	   private String jet_rw_no_mc_used;

	   @Column(name = "JET_RW_RAILWAY_TIME_FROM")
	   private String jet_rw_railway_time_from;

	   @Column(name = "JET_RW_RAILWAY_TIME_TO")
	   private String jet_rw_railway_time_to;

	   @Column(name = "JET_RW_TOTAL")
	   private String jet_rw_total;

	   @Column(name = "JET_RW_BEFORE_FUMIGATION")
	   private String jet_rw_before_fumigation;

	   @Column(name = "JET_RW_AFTER_FUMIGATION")
	   private String jet_rw_after_fumigation;

	   @Column(name = "JET_RW_ANALYTICAL_REQUEST_NUMBER")
	   private String jet_rw_analytical_request_number;

	   @Column(name = "JET_RW_TOTAL_VIABLE_BEFORE")
	   private String jet_rw_total_viable_before;

	   @Column(name = "JET_RW_TOTAL_VIABLE_AFTER")
	   private String jet_rw_total_viable_after;

	   @Column(name = "JET_RW_VIABLE_REDUCTION")
	   private String jet_rw_viable_reduction;

	   @Column(name = "JET_RW_TOTAL_FUNGAL_BEFORE")
	   private String jet_rw_total_fungal_before;

	   @Column(name = "JET_RW_TOTAL_FUNGAL_AFTER")
	   private String jet_rw_total_fungal_after;

	   @Column(name = "JET_RW_FUNGAL_REDUCTION")
	   private String jet_rw_fungal_reduction;

	   @Column(name = "JET_RW_REMARK")
	   private String jet_rw_remark;

	   @Column(name = "JET_BMA_NO_MC_USED")
	   private String jet_bma_no_mc_used;

	   @Column(name = "JET_BMA_RAILWAY_TIME_FROM")
	   private String jet_bma_railway_time_from;

	   @Column(name = "JET_BMA_RAILWAY_TIME_TO")
	   private String jet_bma_railway_time_to;

	   @Column(name = "JET_BMA_TOTAL")
	   private String jet_bma_total;

	   @Column(name = "JET_BMA_BEFORE_FUMIGATION")
	   private String jet_bma_before_fumigation;

	   @Column(name = "JET_BMA_AFTER_FUMIGATION")
	   private String jet_bma_after_fumigation;

	   @Column(name = "JET_BMA_ANALYTICAL_REQUEST_NUMBER")
	   private String jet_bma_analytical_request_number;

	   @Column(name = "JET_BMA_TOTAL_VIABLE_BEFORE")
	   private String jet_bma_total_viable_before;

	   @Column(name = "JET_BMA_TOTAL_VIABLE_AFTER")
	   private String jet_bma_total_viable_after;

	   @Column(name = "JET_BMA_VIABLE_REDUCTION")
	   private String jet_bma_viable_reduction;

	   @Column(name = "JET_BMA_TOTAL_FUNGAL_BEFORE")
	   private String jet_bma_total_fungal_before;

	   @Column(name = "JET_BMA_TOTAL_FUNGAL_AFTER")
	   private String jet_bma_total_fungal_after;

	   @Column(name = "JET_BMA_FUNGAL_REDUCTION")
	   private String jet_bma_fungal_reduction;

	   @Column(name = "JET_BMA_REMARK")
	   private String jet_bma_remark;

	   
	   //----
	   @Column(name = "SPUN_NO_MC_USED")
	   private String spun_no_mc_used;

	   @Column(name = "SPUN_RAILWAY_TIME_FROM")
	   private String spun_railway_time_from;

	   @Column(name = "SPUN_RAILWAY_TIME_TO")
	   private String spun_railway_time_to;

	   @Column(name = "SPUN_TOTAL")
	   private String spun_total;

	   @Column(name = "SPUN_BEFORE_FUMIGATION")
	   private String spun_before_fumigation;

	   @Column(name = "SPUN_AFTER_FUMIGATION")
	   private String spun_after_fumigation;

	   @Column(name = "SPUN_ANALYTICAL_REQUEST_NUMBER")
	   private String spun_analytical_request_number;

	   @Column(name = "SPUN_TOTAL_VIABLE_BEFORE")
	   private String spun_total_viable_before;

	   @Column(name = "SPUN_TOTAL_VIABLE_AFTER")
	   private String spun_total_viable_after;

	   @Column(name = "SPUN_VIABLE_REDUCTION")
	   private String spun_viable_reduction;

	   @Column(name = "SPUN_TOTAL_FUNGAL_BEFORE")
	   private String spun_total_fungal_before;

	   @Column(name = "SPUN_TOTAL_FUNGAL_AFTER")
	   private String spun_total_fungal_after;

	   @Column(name = "SPUN_FUNGAL_REDUCTION")
	   private String spun_fungal_reduction;

	   @Column(name = "SPUN_REMARK")
	   private String spun_remark;
	   
	   @Column(name = "SPL_RB_NO_MC_USED")
	   private String spl_rb_no_mc_used;

	   @Column(name = "SPL_RB_RAILWAY_TIME_FROM")
	   private String spl_rb_railway_time_from;

	   @Column(name = "SPL_RB_RAILWAY_TIME_TO")
	   private String spl_rb_railway_time_to;

	   @Column(name = "SPL_RB_TOTAL")
	   private String spl_rb_total;

	   @Column(name = "SPL_RB_BEFORE_FUMIGATION")
	   private String spl_rb_before_fumigation;

	   @Column(name = "SPL_RB_AFTER_FUMIGATION")
	   private String spl_rb_after_fumigation;

	   @Column(name = "SPL_RB_ANALYTICAL_REQUEST_NUMBER")
	   private String spl_rb_analytical_request_number;

	   @Column(name = "SPL_RB_TOTAL_VIABLE_BEFORE")
	   private String spl_rb_total_viable_before;

	   @Column(name = "SPL_RB_TOTAL_VIABLE_AFTER")
	   private String spl_rb_total_viable_after;

	   @Column(name = "SPL_RB_VIABLE_REDUCTION")
	   private String spl_rb_viable_reduction;

	   @Column(name = "SPL_RB_TOTAL_FUNGAL_BEFORE")
	   private String spl_rb_total_fungal_before;

	   @Column(name = "SPL_RB_TOTAL_FUNGAL_AFTER")
	   private String spl_rb_total_fungal_after;

	   @Column(name = "SPL_RB_FUNGAL_REDUCTION")
	   private String spl_rb_fungal_reduction;

	   @Column(name = "SPL_RB_REMARK")
	   private String spl_rb_remark;

	   // - - -- 
	   
	   @Column(name = "LAB_NO_MC_USED")
	   private String lab_no_mc_used;

	   @Column(name = "LAB_RAILWAY_TIME_FROM")
	   private String lab_railway_time_from;

	   @Column(name = "LAB_RAILWAY_TIME_TO")
	   private String lab_railway_time_to;

	   @Column(name = "LAB_TOTAL")
	   private String lab_total;

	   @Column(name = "LAB_BEFORE_FUMIGATION")
	   private String lab_before_fumigation;

	   @Column(name = "LAB_AFTER_FUMIGATION")
	   private String lab_after_fumigation;

	   @Column(name = "LAB_ANALYTICAL_REQUEST_NUMBER")
	   private String lab_analytical_request_number;

	   @Column(name = "LAB_TOTAL_VIABLE_BEFORE")
	   private String lab_total_viable_before;

	   @Column(name = "LAB_TOTAL_VIABLE_AFTER")
	   private String lab_total_viable_after;

	   @Column(name = "LAB_VIABLE_REDUCTION")
	   private String lab_viable_reduction;

	   @Column(name = "LAB_TOTAL_FUNGAL_BEFORE")
	   private String lab_total_fungal_before;

	   @Column(name = "LAB_TOTAL_FUNGAL_AFTER")
	   private String lab_total_fungal_after;

	   @Column(name = "LAB_FUNGAL_REDUCTION")
	   private String lab_fungal_reduction;

	   @Column(name = "LAB_REMARK")
	   private String lab_remark;

	   @Column(name = "CHAN_NO_MC_USED")
	   private String chan_no_mc_used;

	   @Column(name = "CHAN_RAILWAY_TIME_FROM")
	   private String chan_railway_time_from;

	   @Column(name = "CHAN_RAILWAY_TIME_TO")
	   private String chan_railway_time_to;

	   @Column(name = "CHAN_TOTAL")
	   private String chan_total;

	   @Column(name = "CHAN_BEFORE_FUMIGATION")
	   private String chan_before_fumigation;

	   @Column(name = "CHAN_AFTER_FUMIGATION")
	   private String chan_after_fumigation;

	   @Column(name = "CHAN_ANALYTICAL_REQUEST_NUMBER")
	   private String chan_analytical_request_number;

	   @Column(name = "CHAN_TOTAL_VIABLE_BEFORE")
	   private String chan_total_viable_before;

	   @Column(name = "CHAN_TOTAL_VIABLE_AFTER")
	   private String chan_total_viable_after;

	   @Column(name = "CHAN_VIABLE_REDUCTION")
	   private String chan_viable_reduction;

	   @Column(name = "CHAN_TOTAL_FUNGAL_BEFORE")
	   private String chan_total_fungal_before;

	   @Column(name = "CHAN_TOTAL_FUNGAL_AFTER")
	   private String chan_total_fungal_after;

	   @Column(name = "CHAN_FUNGAL_REDUCTION")
	   private String chan_fungal_reduction;
	   
	   @Column(name = "CHAN_REMARK")
	   private String chan_remark;
	   
	   @Column(name = "CHN_LCR_NO_MC_USED")
	   private String chn_lcr_no_mc_used;

	   @Column(name = "CHN_LCR_RAILWAY_TIME_FROM")
	   private String chn_lcr_railway_time_from;

	   @Column(name = "CHN_LCR_RAILWAY_TIME_TO")
	   private String chn_lcr_railway_time_to;

	   @Column(name = "CHN_LCR_TOTAL")
	   private String chn_lcr_total;

	   @Column(name = "CHN_LCR_BEFORE_FUMIGATION")
	   private String chn_lcr_before_fumigation;

	   @Column(name = "CHN_LCR_AFTER_FUMIGATION")
	   private String chn_lcr_after_fumigation;

	   @Column(name = "CHN_LCR_ANALYTICAL_REQUEST_NUMBER")
	   private String chn_lcr_analytical_request_number;

	   @Column(name = "CHN_LCR_TOTAL_VIABLE_BEFORE")
	   private String chn_lcr_total_viable_before;

	   @Column(name = "CHN_LCR_TOTAL_VIABLE_AFTER")
	   private String chn_lcr_total_viable_after;

	   @Column(name = "CHN_LCR_VIABLE_REDUCTION")
	   private String chn_lcr_viable_reduction;

	   @Column(name = "CHN_LCR_TOTAL_FUNGAL_BEFORE")
	   private String chn_lcr_total_fungal_before;

	   @Column(name = "CHN_LCR_TOTAL_FUNGAL_AFTER")
	   private String chn_lcr_total_fungal_after;

	   @Column(name = "CHN_LCR_FUNGAL_REDUCTION")
	   private String chn_lcr_fungal_reduction;

	   @Column(name = "CHN_LCR_REMARK")
	   private String chn_lcr_remark;

	   @Column(name = "RESULT")
	   private String result;
	   
	   @Column(name = "ISEFFECTIVE")
	   private String isEffective;
	   
	   @Column(name = "ACTION_DECIDED")
	   private String action_decided;
	   
	   @Column(name = "TEST_ID")
	   private long test_id;
	
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private fumigationARF011 fumigationARF011;

}
