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
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "WATER_ANALYSIS_REPORT_MICRO_F007_HISTORY", schema = AppConstants.schema)
public class WaterAnalysisReportMicroF007History {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HIS_MICRO_ID")
	private Long his_micro_id;

	@Column(name = "EQUALIZATION_SAMPLED")
	private String equalization_sampled;

	@Column(name = "EQUALIZATION_INCUBATION")
	private String equalization_incubation;

	@Column(name = "EQUALIZATION_TEST_COMPLETION")
	private String equalization_test_completion;

	// RO_TANK

	@Column(name = "RO_TANK_TOTAL_VAIBLE")
	private String ro_tank_total_vaible;

	@Column(name = "RO_TANK_TOTAL_FUNGAL")
	private String ro_tank_total_fungal;

	@Column(name = "RO_TANK_GRAM")
	private String ro_tank_gram;

	@Column(name = "RO_TANK_ESCHERECHIA")
	private String ro_tank_escherechia;

	@Column(name = "RO_TANK_STAPHYLOCOCCOS")
	private String ro_tank_staphylococcos;

	@Column(name = "RO_TANK_PSEUDOMONAS")
	private String ro_tank_pseudomonas;

	@Column(name = "RO_TANK_SALMONELLA")
	private String ro_tank_salmonella;

	// SOFT_WATER

	@Column(name = "SOFT_WATER_TOTAL_VAIBLE")
	private String soft_water_total_vaible;

	@Column(name = "SOFT_WATER_TOTAL_FUNGAL")
	private String soft_water_total_fungal;

	@Column(name = "SOFT_WATER_GRAM")
	private String soft_water_gram;

	@Column(name = "SOFT_WATER_ESCHERECHIA")
	private String soft_water_escherechia;

	@Column(name = "SOFT_WATER_STAPHYLOCOCCOS")
	private String soft_water_staphylococcos;

	@Column(name = "SOFT_WATER_PSEUDOMONAS")
	private String soft_water_pseudomonas;

	@Column(name = "SOFT_WATER_SALMONELLA")
	private String soft_water_salmonella;

	// BAG FILTER

	@Column(name = "BAG_FILTER_TOTAL_VAIBLE")
	private String bag_filter_total_vaible;

	@Column(name = "BAG_FILTER_TOTAL_FUNGAL")
	private String bag_filter_total_fungal;

	@Column(name = "BAG_FILTER_GRAM")
	private String bag_filter_gram;

	@Column(name = "BAG_FILTER_ESCHERECHIA")
	private String bag_filter_escherechia;

	@Column(name = "BAG_FILTER_STAPHYLOCOCCOS")
	private String bag_filter_staphylococcos;

	@Column(name = "BAG_FILTER_PSEUDOMONAS")
	private String bag_filter_pseudomonas;

	@Column(name = "BAG_FILTER_SALMONELLA")
	private String bag_filter_salmonella;

	// STORAGE TANK

	@Column(name = "STORAGE_TANK_TOTAL_VAIBLE")
	private String storage_tank_total_vaible;

	@Column(name = "STORAGE_TANK_TOTAL_FUNGAL")
	private String storage_tank_total_fungal;

	@Column(name = "STORAGE_TANK_GRAM")
	private String storage_tank_gram;

	@Column(name = "STORAGE_TANK_ESCHERECHIA")
	private String storage_tank_escherechia;

	@Column(name = "STORAGE_TANK_STAPHYLOCOCCOS")
	private String storage_tank_staphylococcos;

	@Column(name = "STORAGE_TANK_PSEUDOMONAS")
	private String storage_tank_pseudomonas;

	@Column(name = "STORAGE_TANK_SALMONELLA")
	private String storage_tank_salmonella;

	// WATER FOR BLEACHING

	@Column(name = "WATER_BLEACHING_TOTAL_VAIBLE")
	private String water_bleaching_total_vaible;

	@Column(name = "WATER_BLEACHING_TOTAL_FUNGAL")
	private String water_bleaching_total_fungal;

	@Column(name = "WATER_BLEACHING_GRAM")
	private String water_bleaching_gram;

	@Column(name = "WATER_BLEACHING_ESCHERECHIA")
	private String water_bleaching_escherechia;

	@Column(name = "WATER_BLEACHING_STAPHYLOCOCCOS")
	private String water_bleaching_staphylococcos;

	@Column(name = "WATER_BLEACHING_PSEUDOMONAS")
	private String water_bleaching_pseudomonas;

	@Column(name = "WATER_BLEACHING_SALMONELLA")
	private String water_bleaching_salmonella;

	// PPD AHU INLET

	@Column(name = "PPD_AHU_INLET_TOTAL_VAIBLE")
	private String ppd_ahu_inlet_total_vaible;

	@Column(name = "PPD_AHU_INLET_TOTAL_FUNGAL")
	private String ppd_ahu_inlet_total_fungal;

	@Column(name = "PPD_AHU_INLET_GRAM")
	private String ppd_ahu_inlet_gram;

	@Column(name = "PPD_AHU_INLET_ESCHERECHIA")
	private String ppd_ahu_inlet_escherechia;

	@Column(name = "PPD_AHU_INLET_STAPHYLOCOCCOS")
	private String ppd_ahu_inlet_staphylococcos;

	@Column(name = "PPD_AHU_INLET_PSEUDOMONAS")
	private String ppd_ahu_inlet_pseudomonas;

	@Column(name = "PPD_AHU_INLET_SALMONELLA")
	private String ppd_ahu_inlet_salmonella;

	// PPD AHU FOG

	@Column(name = "PPD_AHU_FOG_TOTAL_VAIBLE")
	private String ppd_ahu_fog_total_vaible;

	@Column(name = "PPD_AHU_FOG_TOTAL_FUNGAL")
	private String ppd_ahu_fog_total_fungal;

	@Column(name = "PPD_AHU_FOG_GRAM")
	private String ppd_ahu_fog_gram;

	@Column(name = "PPD_AHU_FOG_ESCHERECHIA")
	private String ppd_ahu_fog_escherechia;

	@Column(name = "PPD_AHU_FOG_STAPHYLOCOCCOS")
	private String ppd_ahu_fog_staphylococcos;

	@Column(name = "PPD_AHU_FOG_PSEUDOMONAS")
	private String ppd_ahu_fog_pseudomonas;

	@Column(name = "PPD_AHU_FOG_SALMONELLA")
	private String ppd_ahu_fog_salmonella;

	// UV INLET

	@Column(name = "UV_INLET_TOTAL_VAIBLE")
	private String uv_inlet_total_vaible;

	@Column(name = "UV_INLET_TOTAL_FUNGAL")
	private String uv_inlet_total_fungal;

	@Column(name = "UV_INLET_GRAM")
	private String uv_inlet_gram;

	@Column(name = "UV_INLET_ESCHERECHIA")
	private String uv_inlet_escherechia;

	@Column(name = "UV_INLET_STAPHYLOCOCCOS")
	private String uv_inlet_staphylococcos;

	@Column(name = "UV_INLET_PSEUDOMONAS")
	private String uv_inlet_pseudomonas;

	@Column(name = "UV_INLET_SALMONELLA")
	private String uv_inlet_salmonella;

	// UV OUTLET

	@Column(name = "UV_OUTLET_TOTAL_VAIBLE")
	private String uv_outlet_total_vaible;

	@Column(name = "UV_OUTLET_TOTAL_FUNGAL")
	private String uv_outlet_total_fungal;

	@Column(name = "UV_OUTLET_GRAM")
	private String uv_outlet_gram;

	@Column(name = "UV_OUTLET_ESCHERECHIA")
	private String uv_outlet_escherechia;

	@Column(name = "UV_OUTLET_STAPHYLOCOCCOS")
	private String uv_outlet_staphylococcos;

	@Column(name = "UV_OUTLET_PSEUDOMONAS")
	private String uv_outlet_pseudomonas;

	@Column(name = "UV_OUTLET_SALMONELLA")
	private String uv_outlet_salmonella;

	// COMMON

	@Column(name = "HIS_WATER_ID")
	private Long his_water_id;

	// REMARKS

	@Column(name = "REMARKS")
	private String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HIS_WATER_ID", referencedColumnName = "HIS_WATER_ID", insertable = false, updatable = false)
	@JsonIgnore
	private WaterAnalysisReportF007History micro;

}
