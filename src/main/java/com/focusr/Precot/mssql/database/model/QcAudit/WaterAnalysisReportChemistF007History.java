package com.focusr.Precot.mssql.database.model.QcAudit;

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
import com.focusr.Precot.mssql.database.model.Qc.WaterAnalysisReportF007;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "WATER_ANALYSIS_REPORT_CHEMIST_F007_HISTORY", schema = AppConstants.schema)
public class WaterAnalysisReportChemistF007History {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HIS_CHEMIST_ID")
	private Long his_chemist_id;

	// EQUALIZATION

	@Column(name = "EQUALIZATION_PH_ACT")
	private String equalization_ph_act;

	@Column(name = "EQUALIZATION_HARDNESS_ACT")
	private String equalization_hardness_act;

	@Column(name = "EQUALIZATION_TDS_ACT")
	private String equalization_tds_act;

	@Column(name = "EQUALIZATION_TURBIDITY_ACT")
	private String equalization_turbidity_act;

	@Column(name = "EQUALIZATION_FRC_ACT")
	private String equalization_frc_act;

	@Column(name = "EQUALIZATION_TSS_ACT")
	private String equalization_tss_act;

	@Column(name = "EQUALIZATION_DO_ACT")
	private String equalization_do_act;

	@Column(name = "EQUALIZATION_COD_ACT")
	private String equalization_cod_act;

	@Column(name = "EQUALIZATION_BOD_ACT")
	private String equalization_bod_act;

	@Column(name = "EQUALIZATION_MLSS_ACT")
	private String equalization_mlss_act;

	@Column(name = "EQUALIZATION_MLVSS_ACT")
	private String equalization_mlvss_act;

	@Column(name = "EQUALIZATION_SV_ACT")
	private String equalization_sv_act;

	// PRIMARY CLARIFIER I/L

	@Column(name = "PRIMARY_IL_PH_ACT")
	private String primary_il_ph_act;

	@Column(name = "PRIMARY_IL_HARDNESS_ACT")
	private String primary_il_hardness_act;

	@Column(name = "PRIMARY_IL_TDS_ACT")
	private String primary_il_tds_act;

	@Column(name = "PRIMARY_IL_TURBIDITY_ACT")
	private String primary_il_turbidity_act;

	@Column(name = "PRIMARY_IL_FRC_ACT")
	private String primary_il_frc_act;

	@Column(name = "PRIMARY_IL_TSS_ACT")
	private String primary_il_tss_act;

	@Column(name = "PRIMARY_IL_DO_ACT")
	private String primary_il_do_act;

	@Column(name = "PRIMARY_IL_COD_ACT")
	private String primary_il_cod_act;

	@Column(name = "PRIMARY_IL_BOD_ACT")
	private String primary_il_bod_act;

	@Column(name = "PRIMARY_IL_MLSS_ACT")
	private String primary_il_mlss_act;

	@Column(name = "PRIMARY_IL_MLVSS_ACT")
	private String primary_il_mlvss_act;

	@Column(name = "PRIMARY_IL_SV_ACT")
	private String primary_il_sv_act;

	// PRIMARY CLARIFIER O/L

	@Column(name = "PRIMARY_OL_PH_ACT")
	private String primary_ol_ph_act;

	@Column(name = "PRIMARY_OL_HARDNESS_ACT")
	private String primary_ol_hardness_act;

	@Column(name = "PRIMARY_OL_TDS_ACT")
	private String primary_ol_tds_act;

	@Column(name = "PRIMARY_OL_TURBIDITY_ACT")
	private String primary_ol_turbidity_act;

	@Column(name = "PRIMARY_OL_FRC_ACT")
	private String primary_ol_frc_act;

	@Column(name = "PRIMARY_OL_TSS_ACT")
	private String primary_ol_tss_act;

	@Column(name = "PRIMARY_OL_DO_ACT")
	private String primary_ol_do_act;

	@Column(name = "PRIMARY_OL_COD_ACT")
	private String primary_ol_cod_act;

	@Column(name = "PRIMARY_OL_BOD_ACT")
	private String primary_ol_bod_act;

	@Column(name = "PRIMARY_OL_MLSS_ACT")
	private String primary_ol_mlss_act;

	@Column(name = "PRIMARY_OL_MLVSS_ACT")
	private String primary_ol_mlvss_act;

	@Column(name = "PRIMARY_OL_SV_ACT")
	private String primary_ol_sv_act;

	// AERATION TANK 1

	@Column(name = "AERATION_TANT_1_PH_ACT")
	private String aeration_tant_1_ph_act;

	@Column(name = "AERATION_TANT_1_HARDNESS_ACT")
	private String aeration_tant_1_hardness_act;

	@Column(name = "AERATION_TANT_1_TDS_ACT")
	private String aeration_tant_1_tds_act;

	@Column(name = "AERATION_TANT_1_TURBIDITY_ACT")
	private String aeration_tant_1_turbidity_act;

	@Column(name = "AERATION_TANT_1_FRC_ACT")
	private String aeration_tant_1_frc_act;

	@Column(name = "AERATION_TANT_1_TSS_ACT")
	private String aeration_tant_1_tss_act;

	@Column(name = "AERATION_TANT_1_DO_ACT")
	private String aeration_tant_1_do_act;

	@Column(name = "AERATION_TANT_1_COD_ACT")
	private String aeration_tant_1_cod_act;

	@Column(name = "AERATION_TANT_1_BOD_ACT")
	private String aeration_tant_1_bod_act;

	@Column(name = "AERATION_TANT_1_MLSS_ACT")
	private String aeration_tant_1_mlss_act;

	@Column(name = "AERATION_TANT_1_MLVSS_ACT")
	private String aeration_tant_1_mlvss_act;

	@Column(name = "AERATION_TANT_1_SV_ACT")
	private String aeration_tant_1_sv_act;

	// AERATION TANK 6

	@Column(name = "AERATION_TANT_6_PH_ACT")
	private String aeration_tant_6_ph_act;

	@Column(name = "AERATION_TANT_6_HARDNESS_ACT")
	private String aeration_tant_6_hardness_act;

	@Column(name = "AERATION_TANT_6_TDS_ACT")
	private String aeration_tant_6_tds_act;

	@Column(name = "AERATION_TANT_6_TURBIDITY_ACT")
	private String aeration_tant_6_turbidity_act;

	@Column(name = "AERATION_TANT_6_FRC_ACT")
	private String aeration_tant_6_frc_act;

	@Column(name = "AERATION_TANT_6_TSS_ACT")
	private String aeration_tant_6_tss_act;

	@Column(name = "AERATION_TANT_6_DO_ACT")
	private String aeration_tant_6_do_act;

	@Column(name = "AERATION_TANT_6_COD_ACT")
	private String aeration_tant_6_cod_act;

	@Column(name = "AERATION_TANT_6_BOD_ACT")
	private String aeration_tant_6_bod_act;

	@Column(name = "AERATION_TANT_6_MLSS_ACT")
	private String aeration_tant_6_mlss_act;

	@Column(name = "AERATION_TANT_6_MLVSS_ACT")
	private String aeration_tant_6_mlvss_act;

	@Column(name = "AERATION_TANT_6_SV_ACT")
	private String aeration_tant_6_sv_act;

	// SECONDARY CLARIFIER OL

	@Column(name = "SECONDARY_OL_PH_ACT")
	private String secondary_ol_ph_act;

	@Column(name = "SECONDARY_OL_HARDNESS_ACT")
	private String secondary_ol_hardness_act;

	@Column(name = "SECONDARY_OL_TDS_ACT")
	private String secondary_ol_tds_act;

	@Column(name = "SECONDARY_OL_TURBIDITY_ACT")
	private String secondary_ol_turbidity_act;

	@Column(name = "SECONDARY_OL_FRC_ACT")
	private String secondary_ol_frc_act;

	@Column(name = "SECONDARY_OL_TSS_ACT")
	private String secondary_ol_tss_act;

	@Column(name = "SECONDARY_OL_DO_ACT")
	private String secondary_ol_do_act;

	@Column(name = "SECONDARY_OL_COD_ACT")
	private String secondary_ol_cod_act;

	@Column(name = "SECONDARY_OL_BOD_ACT")
	private String secondary_ol_bod_act;

	@Column(name = "SECONDARY_OL_MLSS_ACT")
	private String secondary_ol_mlss_act;

	@Column(name = "SECONDARY_OL_MLVSS_ACT")
	private String secondary_ol_mlvss_act;

	@Column(name = "SECONDARY_OL_SV_ACT")
	private String secondary_ol_sv_act;

	// UF FEED

	@Column(name = "UF_FEED_PH_ACT")
	private String uf_feed_ph_act;

	@Column(name = "UF_FEED_HARDNESS_ACT")
	private String uf_feed_hardness_act;

	@Column(name = "UF_FEED_TDS_ACT")
	private String uf_feed_tds_act;

	@Column(name = "UF_FEED_TURBIDITY_ACT")
	private String uf_feed_turbidity_act;

	@Column(name = "UF_FEED_FRC_ACT")
	private String uf_feed_frc_act;

	@Column(name = "UF_FEED_TSS_ACT")
	private String uf_feed_tss_act;

	@Column(name = "UF_FEED_DO_ACT")
	private String uf_feed_do_act;

	@Column(name = "UF_FEED_COD_ACT")
	private String uf_feed_cod_act;

	@Column(name = "UF_FEED_BOD_ACT")
	private String uf_feed_bod_act;

	@Column(name = "UF_FEED_MLSS_ACT")
	private String uf_feed_mlss_act;

	@Column(name = "UF_FEED_MLVSS_ACT")
	private String uf_feed_mlvss_act;

	@Column(name = "UF_FEED_SV_ACT")
	private String uf_feed_sv_act;

	// RO 01 FEED

	@Column(name = "RO_01_FEED_PH_ACT")
	private String ro_01_feed_ph_act;

	@Column(name = "RO_01_FEED_HARDNESS_ACT")
	private String ro_01_feed_hardness_act;

	@Column(name = "RO_01_FEED_TDS_ACT")
	private String ro_01_feed_tds_act;

	@Column(name = "RO_01_FEED_TURBIDITY_ACT")
	private String ro_01_feed_turbidity_act;

	@Column(name = "RO_01_FEED_FRC_ACT")
	private String ro_01_feed_frc_act;

	@Column(name = "RO_01_FEED_TSS_ACT")
	private String ro_01_feed_tss_act;

	@Column(name = "RO_01_FEED_DO_ACT")
	private String ro_01_feed_do_act;

	@Column(name = "RO_01_FEED_COD_ACT")
	private String ro_01_feed_cod_act;

	@Column(name = "RO_01_FEED_BOD_ACT")
	private String ro_01_feed_bod_act;

	@Column(name = "RO_01_FEED_MLSS_ACT")
	private String ro_01_feed_mlss_act;

	@Column(name = "RO_01_FEED_MLVSS_ACT")
	private String ro_01_feed_mlvss_act;

	@Column(name = "RO_01_FEED_SV_ACT")
	private String ro_01_feed_sv_act;

	// RO 01 PERMEATE

	@Column(name = "RO_01_PERMEATE_PH_ACT")
	private String ro_01_permeate_ph_act;

	@Column(name = "RO_01_PERMEATE_HARDNESS_ACT")
	private String ro_01_permeate_hardness_act;

	@Column(name = "RO_01_PERMEATE_TDS_ACT")
	private String ro_01_permeate_tds_act;

	@Column(name = "RO_01_PERMEATE_TURBIDITY_ACT")
	private String ro_01_permeate_turbidity_act;

	@Column(name = "RO_01_PERMEATE_FRC_ACT")
	private String ro_01_permeate_frc_act;

	@Column(name = "RO_01_PERMEATE_TSS_ACT")
	private String ro_01_permeate_tss_act;

	@Column(name = "RO_01_PERMEATE_DO_ACT")
	private String ro_01_permeate_do_act;

	@Column(name = "RO_01_PERMEATE_COD_ACT")
	private String ro_01_permeate_cod_act;

	@Column(name = "RO_01_PERMEATE_BOD_ACT")
	private String ro_01_permeate_bod_act;

	@Column(name = "RO_01_PERMEATE_MLSS_ACT")
	private String ro_01_permeate_mlss_act;

	@Column(name = "RO_01_PERMEATE_MLVSS_ACT")
	private String ro_01_permeate_mlvss_act;

	@Column(name = "RO_01_PERMEATE_SV_ACT")
	private String ro_01_permeate_sv_act;

	// RO 02 FEED

	@Column(name = "RO_02_FEED_PH_ACT")
	private String ro_02_feed_ph_act;

	@Column(name = "RO_02_FEED_HARDNESS_ACT")
	private String ro_02_feed_hardness_act;

	@Column(name = "RO_02_FEED_TDS_ACT")
	private String ro_02_feed_tds_act;

	@Column(name = "RO_02_FEED_TURBIDITY_ACT")
	private String ro_02_feed_turbidity_act;

	@Column(name = "RO_02_FEED_FRC_ACT")
	private String ro_02_feed_frc_act;

	@Column(name = "RO_02_FEED_TSS_ACT")
	private String ro_02_feed_tss_act;

	@Column(name = "RO_02_FEED_DO_ACT")
	private String ro_02_feed_do_act;

	@Column(name = "RO_02_FEED_COD_ACT")
	private String ro_02_feed_cod_act;

	@Column(name = "RO_02_FEED_BOD_ACT")
	private String ro_02_feed_bod_act;

	@Column(name = "RO_02_FEED_MLSS_ACT")
	private String ro_02_feed_mlss_act;

	@Column(name = "RO_02_FEED_MLVSS_ACT")
	private String ro_02_feed_mlvss_act;

	@Column(name = "RO_02_FEED_SV_ACT")
	private String ro_02_feed_sv_act;

	// RO_02_PERMEATE

	@Column(name = "RO_02_PERMEATE_PH_ACT")
	private String ro_02_permeate_ph_act;

	@Column(name = "RO_02_PERMEATE_HARDNESS_ACT")
	private String ro_02_permeate_hardness_act;

	@Column(name = "RO_02_PERMEATE_TDS_ACT")
	private String ro_02_permeate_tds_act;

	@Column(name = "RO_02_PERMEATE_TURBIDITY_ACT")
	private String ro_02_permeate_turbidity_act;

	@Column(name = "RO_02_PERMEATE_FRC_ACT")
	private String ro_02_permeate_frc_act;

	@Column(name = "RO_02_PERMEATE_TSS_ACT")
	private String ro_02_permeate_tss_act;

	@Column(name = "RO_02_PERMEATE_DO_ACT")
	private String ro_02_permeate_do_act;

	@Column(name = "RO_02_PERMEATE_COD_ACT")
	private String ro_02_permeate_cod_act;

	@Column(name = "RO_02_PERMEATE_BOD_ACT")
	private String ro_02_permeate_bod_act;

	@Column(name = "RO_02_PERMEATE_MLSS_ACT")
	private String ro_02_permeate_mlss_act;

	@Column(name = "RO_02_PERMEATE_MLVSS_ACT")
	private String ro_02_permeate_mlvss_act;

	@Column(name = "RO_02_PERMEATE_SV_ACT")
	private String ro_02_permeate_sv_act;

	// RO 03 FEED

	@Column(name = "RO_03_FEED_PH_ACT")
	private String ro_03_feed_ph_act;

	@Column(name = "RO_03_FEED_HARDNESS_ACT")
	private String ro_03_feed_hardness_act;

	@Column(name = "RO_03_FEED_TDS_ACT")
	private String ro_03_feed_tds_act;

	@Column(name = "RO_03_FEED_TURBIDITY_ACT")
	private String ro_03_feed_turbidity_act;

	@Column(name = "RO_03_FEED_FRC_ACT")
	private String ro_03_feed_frc_act;

	@Column(name = "RO_03_FEED_TSS_ACT")
	private String ro_03_feed_tss_act;

	@Column(name = "RO_03_FEED_DO_ACT")
	private String ro_03_feed_do_act;

	@Column(name = "RO_03_FEED_COD_ACT")
	private String ro_03_feed_cod_act;

	@Column(name = "RO_03_FEED_BOD_ACT")
	private String ro_03_feed_bod_act;

	@Column(name = "RO_03_FEED_MLSS_ACT")
	private String ro_03_feed_mlss_act;

	@Column(name = "RO_03_FEED_MLVSS_ACT")
	private String ro_03_feed_mlvss_act;

	@Column(name = "RO_03_FEED_SV_ACT")
	private String ro_03_feed_sv_act;

	// RO 03 PERMEATE

	@Column(name = "RO_03_PERMEATE_PH_ACT")
	private String ro_03_permeate_ph_act;

	@Column(name = "RO_03_PERMEATE_HARDNESS_ACT")
	private String ro_03_permeate_hardness_act;

	@Column(name = "RO_03_PERMEATE_TDS_ACT")
	private String ro_03_permeate_tds_act;

	@Column(name = "RO_03_PERMEATE_TURBIDITY_ACT")
	private String ro_03_permeate_turbidity_act;

	@Column(name = "RO_03_PERMEATE_FRC_ACT")
	private String ro_03_permeate_frc_act;

	@Column(name = "RO_03_PERMEATE_TSS_ACT")
	private String ro_03_permeate_tss_act;

	@Column(name = "RO_03_PERMEATE_DO_ACT")
	private String ro_03_permeate_do_act;

	@Column(name = "RO_03_PERMEATE_COD_ACT")
	private String ro_03_permeate_cod_act;

	@Column(name = "RO_03_PERMEATE_BOD_ACT")
	private String ro_03_permeate_bod_act;

	@Column(name = "RO_03_PERMEATE_MLSS_ACT")
	private String ro_03_permeate_mlss_act;

	@Column(name = "RO_03_PERMEATE_MLVSS_ACT")
	private String ro_03_permeate_mlvss_act;

	@Column(name = "RO_03_PERMEATE_SV_ACT")
	private String ro_03_permeate_sv_act;

	// RO 04 FEED

	@Column(name = "RO_04_FEED_PH_ACT")
	private String ro_04_feed_ph_act;

	@Column(name = "RO_04_FEED_HARDNESS_ACT")
	private String ro_04_feed_hardness_act;

	@Column(name = "RO_04_FEED_TDS_ACT")
	private String ro_04_feed_tds_act;

	@Column(name = "RO_04_FEED_TURBIDITY_ACT")
	private String ro_04_feed_turbidity_act;

	@Column(name = "RO_04_FEED_FRC_ACT")
	private String ro_04_feed_frc_act;

	@Column(name = "RO_04_FEED_TSS_ACT")
	private String ro_04_feed_tss_act;

	@Column(name = "RO_04_FEED_DO_ACT")
	private String ro_04_feed_do_act;

	@Column(name = "RO_04_FEED_COD_ACT")
	private String ro_04_feed_cod_act;

	@Column(name = "RO_04_FEED_BOD_ACT")
	private String ro_04_feed_bod_act;

	@Column(name = "RO_04_FEED_MLSS_ACT")
	private String ro_04_feed_mlss_act;

	@Column(name = "RO_04_FEED_MLVSS_ACT")
	private String ro_04_feed_mlvss_act;

	@Column(name = "RO_04_FEED_SV_ACT")
	private String ro_04_feed_sv_act;

	// RO 04 PERMEATE

	@Column(name = "RO_04_PERMEATE_PH_ACT")
	private String ro_04_permeate_ph_act;

	@Column(name = "RO_04_PERMEATE_HARDNESS_ACT")
	private String ro_04_permeate_hardness_act;

	@Column(name = "RO_04_PERMEATE_TDS_ACT")
	private String ro_04_permeate_tds_act;

	@Column(name = "RO_04_PERMEATE_TURBIDITY_ACT")
	private String ro_04_permeate_turbidity_act;

	@Column(name = "RO_04_PERMEATE_FRC_ACT")
	private String ro_04_permeate_frc_act;

	@Column(name = "RO_04_PERMEATE_TSS_ACT")
	private String ro_04_permeate_tss_act;

	@Column(name = "RO_04_PERMEATE_DO_ACT")
	private String ro_04_permeate_do_act;

	@Column(name = "RO_04_PERMEATE_COD_ACT")
	private String ro_04_permeate_cod_act;

	@Column(name = "RO_04_PERMEATE_BOD_ACT")
	private String ro_04_permeate_bod_act;

	@Column(name = "RO_04_PERMEATE_MLSS_ACT")
	private String ro_04_permeate_mlss_act;

	@Column(name = "RO_04_PERMEATE_MLVSS_ACT")
	private String ro_04_permeate_mlvss_act;

	@Column(name = "RO_04_PERMEATE_SV_ACT")
	private String ro_04_permeate_sv_act;

	// MEE FEED

	@Column(name = "MEE_FEED_PH_ACT")
	private String mee_feed_ph_act;

	@Column(name = "MEE_FEED_HARDNESS_ACT")
	private String mee_feed_hardness_act;

	@Column(name = "MEE_FEED_TDS_ACT")
	private String mee_feed_tds_act;

	@Column(name = "MEE_FEED_TURBIDITY_ACT")
	private String mee_feed_turbidity_act;

	@Column(name = "MEE_FEED_FRC_ACT")
	private String mee_feed_frc_act;

	@Column(name = "MEE_FEED_TSS_ACT")
	private String mee_feed_tss_act;

	@Column(name = "MEE_FEED_DO_ACT")
	private String mee_feed_do_act;

	@Column(name = "MEE_FEED_COD_ACT")
	private String mee_feed_cod_act;

	@Column(name = "MEE_FEED_BOD_ACT")
	private String mee_feed_bod_act;

	@Column(name = "MEE_FEED_MLSS_ACT")
	private String mee_feed_mlss_act;

	@Column(name = "MEE_FEED_MLVSS_ACT")
	private String mee_feed_mlvss_act;

	@Column(name = "MEE_FEED_SV_ACT")
	private String mee_feed_sv_act;

	// MEE CONDENSATE

	@Column(name = "MEE_CONDENSATE_PH_ACT")
	private String mee_condensate_ph_act;

	@Column(name = "MEE_CONDENSATE_HARDNESS_ACT")
	private String mee_condensate_hardness_act;

	@Column(name = "MEE_CONDENSATE_TDS_ACT")
	private String mee_condensate_tds_act;

	@Column(name = "MEE_CONDENSATE_TURBIDITY_ACT")
	private String mee_condensate_turbidity_act;

	@Column(name = "MEE_CONDENSATE_FRC_ACT")
	private String mee_condensate_frc_act;

	@Column(name = "MEE_CONDENSATE_TSS_ACT")
	private String mee_condensate_tss_act;

	@Column(name = "MEE_CONDENSATE_DO_ACT")
	private String mee_condensate_do_act;

	@Column(name = "MEE_CONDENSATE_COD_ACT")
	private String mee_condensate_cod_act;

	@Column(name = "MEE_CONDENSATE_BOD_ACT")
	private String mee_condensate_bod_act;

	@Column(name = "MEE_CONDENSATE_MLSS_ACT")
	private String mee_condensate_mlss_act;

	@Column(name = "MEE_CONDENSATE_MLVSS_ACT")
	private String mee_condensate_mlvss_act;

	@Column(name = "MEE_CONDENSATE_SV_ACT")
	private String mee_condensate_sv_act;

	// MEE CONCENTRATE

	@Column(name = "MEE_CONCENTRATE_PH_ACT")
	private String mee_concentrate_ph_act;

	@Column(name = "MEE_CONCENTRATE_HARDNESS_ACT")
	private String mee_concentrate_hardness_act;

	@Column(name = "MEE_CONCENTRATE_TDS_ACT")
	private String mee_concentrate_tds_act;

	@Column(name = "MEE_CONCENTRATE_TURBIDITY_ACT")
	private String mee_concentrate_turbidity_act;

	@Column(name = "MEE_CONCENTRATE_FRC_ACT")
	private String mee_concentrate_frc_act;

	@Column(name = "MEE_CONCENTRATE_TSS_ACT")
	private String mee_concentrate_tss_act;

	@Column(name = "MEE_CONCENTRATE_DO_ACT")
	private String mee_concentrate_do_act;

	@Column(name = "MEE_CONCENTRATE_COD_ACT")
	private String mee_concentrate_cod_act;

	@Column(name = "MEE_CONCENTRATE_BOD_ACT")
	private String mee_concentrate_bod_act;

	@Column(name = "MEE_CONCENTRATE_MLSS_ACT")
	private String mee_concentrate_mlss_act;

	@Column(name = "MEE_CONCENTRATE_MLVSS_ACT")
	private String mee_concentrate_mlvss_act;

	@Column(name = "MEE_CONCENTRATE_SV_ACT")
	private String mee_concentrate_sv_act;

	// RO TANK 19

	@Column(name = "RO_TANK_PH_ACT")
	private String ro_tank_ph_act;

	@Column(name = "RO_TANK_HARDNESS_ACT")
	private String ro_tank_hardness_act;

	@Column(name = "RO_TANK_TDS_ACT")
	private String ro_tank_tds_act;

	@Column(name = "RO_TANK_TURBIDITY_ACT")
	private String ro_tank_turbidity_act;

	@Column(name = "RO_TANK_FRC_ACT")
	private String ro_tank_frc_act;

	@Column(name = "RO_TANK_TSS_ACT")
	private String ro_tank_tss_act;

	@Column(name = "RO_TANK_DO_ACT")
	private String ro_tank_do_act;

	@Column(name = "RO_TANK_COD_ACT")
	private String ro_tank_cod_act;

	@Column(name = "RO_TANK_BOD_ACT")
	private String ro_tank_bod_act;

	@Column(name = "RO_TANK_MLSS_ACT")
	private String ro_tank_mlss_act;

	@Column(name = "RO_TANK_MLVSS_ACT")
	private String ro_tank_mlvss_act;

	@Column(name = "RO_TANK_SV_ACT")
	private String ro_tank_sv_act;

	// SOFT WATER 20

	@Column(name = "SOFT_WATER_PH_ACT")
	private String soft_water_ph_act;

	@Column(name = "SOFT_WATER_HARDNESS_ACT")
	private String soft_water_hardness_act;

	@Column(name = "SOFT_WATER_TDS_ACT")
	private String soft_water_tds_act;

	@Column(name = "SOFT_WATER_TURBIDITY_ACT")
	private String soft_water_turbidity_act;

	@Column(name = "SOFT_WATER_FRC_ACT")
	private String soft_water_frc_act;

	@Column(name = "SOFT_WATER_TSS_ACT")
	private String soft_water_tss_act;

	@Column(name = "SOFT_WATER_DO_ACT")
	private String soft_water_do_act;

	@Column(name = "SOFT_WATER_COD_ACT")
	private String soft_water_cod_act;

	@Column(name = "SOFT_WATER_BOD_ACT")
	private String soft_water_bod_act;

	@Column(name = "SOFT_WATER_MLSS_ACT")
	private String soft_water_mlss_act;

	@Column(name = "SOFT_WATER_MLVSS_ACT")
	private String soft_water_mlvss_act;

	@Column(name = "SOFT_WATER_SV_ACT")
	private String soft_water_sv_act;

	// KIADB 21

	@Column(name = "KIADB_PH_ACT")
	private String kiadb_ph_act;

	@Column(name = "KIADB_HARDNESS_ACT")
	private String kiadb_hardness_act;

	@Column(name = "KIADB_TDS_ACT")
	private String kiadb_tds_act;

	@Column(name = "KIADB_TURBIDITY_ACT")
	private String kiadb_turbidity_act;

	@Column(name = "KIADB_FRC_ACT")
	private String kiadb_frc_act;

	@Column(name = "KIADB_TSS_ACT")
	private String kiadb_tss_act;

	@Column(name = "KIADB_DO_ACT")
	private String kiadb_do_act;

	@Column(name = "KIADB_COD_ACT")
	private String kiadb_cod_act;

	@Column(name = "KIADB_BOD_ACT")
	private String kiadb_bod_act;

	@Column(name = "KIADB_MLSS_ACT")
	private String kiadb_mlss_act;

	@Column(name = "KIADB_MLVSS_ACT")
	private String kiadb_mlvss_act;

	@Column(name = "KIADB_SV_ACT")
	private String kiadb_sv_act;

	// SOFTNER 22

	@Column(name = "SOFTNER_PH_ACT")
	private String softner_ph_act;

	@Column(name = "SOFTNER_HARDNESS_ACT")
	private String softner_hardness_act;

	@Column(name = "SOFTNER_TDS_ACT")
	private String softner_tds_act;

	@Column(name = "SOFTNER_TURBIDITY_ACT")
	private String softner_turbidity_act;

	@Column(name = "SOFTNER_FRC_ACT")
	private String softner_frc_act;

	@Column(name = "SOFTNER_TSS_ACT")
	private String softner_tss_act;

	@Column(name = "SOFTNER_DO_ACT")
	private String softner_do_act;

	@Column(name = "SOFTNER_COD_ACT")
	private String softner_cod_act;

	@Column(name = "SOFTNER_BOD_ACT")
	private String softner_bod_act;

	@Column(name = "SOFTNER_MLSS_ACT")
	private String softner_mlss_act;

	@Column(name = "SOFTNER_MLVSS_ACT")
	private String softner_mlvss_act;

	@Column(name = "SOFTNER_SV_ACT")
	private String softner_sv_act;

	// STP TREATED 23

	@Column(name = "STP_TREATED_PH_ACT")
	private String stp_treated_ph_act;

	@Column(name = "STP_TREATED_HARDNESS_ACT")
	private String stp_treated_hardness_act;

	@Column(name = "STP_TREATED_TDS_ACT")
	private String stp_treated_tds_act;

	@Column(name = "STP_TREATED_TURBIDITY_ACT")
	private String stp_treated_turbidity_act;

	@Column(name = "STP_TREATED_FRC_ACT")
	private String stp_treated_frc_act;

	@Column(name = "STP_TREATED_TSS_ACT")
	private String stp_treated_tss_act;

	@Column(name = "STP_TREATED_DO_ACT")
	private String stp_treated_do_act;

	@Column(name = "STP_TREATED_COD_ACT")
	private String stp_treated_cod_act;

	@Column(name = "STP_TREATED_BOD_ACT")
	private String stp_treated_bod_act;

	@Column(name = "STP_TREATED_MLSS_ACT")
	private String stp_treated_mlss_act;

	@Column(name = "STP_TREATED_MLVSS_ACT")
	private String stp_treated_mlvss_act;

	@Column(name = "STP_TREATED_SV_ACT")
	private String stp_treated_sv_act;

	// BAG FILTER 24

	@Column(name = "BAG_FILTER_PH_ACT")
	private String bag_filter_ph_act;

	@Column(name = "BAG_FILTER_HARDNESS_ACT")
	private String bag_filter_hardness_act;

	@Column(name = "BAG_FILTER_TDS_ACT")
	private String bag_filter_tds_act;

	@Column(name = "BAG_FILTER_TURBIDITY_ACT")
	private String bag_filter_turbidity_act;

	@Column(name = "BAG_FILTER_FRC_ACT")
	private String bag_filter_frc_act;

	@Column(name = "BAG_FILTER_TSS_ACT")
	private String bag_filter_tss_act;

	@Column(name = "BAG_FILTER_DO_ACT")
	private String bag_filter_do_act;

	@Column(name = "BAG_FILTER_COD_ACT")
	private String bag_filter_cod_act;

	@Column(name = "BAG_FILTER_BOD_ACT")
	private String bag_filter_bod_act;

	@Column(name = "BAG_FILTER_MLSS_ACT")
	private String bag_filter_mlss_act;

	@Column(name = "BAG_FILTER_MLVSS_ACT")
	private String bag_filter_mlvss_act;

	@Column(name = "BAG_FILTER_SV_ACT")
	private String bag_filter_sv_act;

	// STORAGE TANK 25

	@Column(name = "STORAGE_TANK_PH_ACT")
	private String storage_tank_ph_act;

	@Column(name = "STORAGE_TANK_HARDNESS_ACT")
	private String storage_tank_hardness_act;

	@Column(name = "STORAGE_TANK_TDS_ACT")
	private String storage_tank_tds_act;

	@Column(name = "STORAGE_TANK_TURBIDITY_ACT")
	private String storage_tank_turbidity_act;

	@Column(name = "STORAGE_TANK_FRC_ACT")
	private String storage_tank_frc_act;

	@Column(name = "STORAGE_TANK_TSS_ACT")
	private String storage_tank_tss_act;

	@Column(name = "STORAGE_TANK_DO_ACT")
	private String storage_tank_do_act;

	@Column(name = "STORAGE_TANK_COD_ACT")
	private String storage_tank_cod_act;

	@Column(name = "STORAGE_TANK_BOD_ACT")
	private String storage_tank_bod_act;

	@Column(name = "STORAGE_TANK_MLSS_ACT")
	private String storage_tank_mlss_act;

	@Column(name = "STORAGE_TANK_MLVSS_ACT")
	private String storage_tank_mlvss_act;

	@Column(name = "STORAGE_TANK_SV_ACT")
	private String storage_tank_sv_act;

	@Column(name = "HIS_WATER_ID")
	private Long his_water_id;
	
	
	@Column(name = "REMARKS")
	private String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HIS_WATER_ID", referencedColumnName = "HIS_WATER_ID", insertable = false, updatable = false)
	@JsonIgnore
	private WaterAnalysisReportF007History chemist;

}
