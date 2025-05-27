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
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_BMR_05_EQUP_USED_LINES", schema = AppConstants.schema)
public class BMR05GoodsEquipmentUsedLine extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long Id;

	@Column(name = "EQUP_ID")
	private Long equp_id;

	@Column(name = "EQUIPMENT_NAME")
	private String equipmentName;

	@Column(name = "EQUIPMENT_CODE")
	private String equipmentCode;

	@Column(name = "CALIBRATION_DATE")
	private String calibrationDate;

	@Column(name = "DUE_DATE")
	private String dueDate;

	@Column(name = "CHECKED_BY")
	private String checked_by;

	@Column(name = "REMARKS")
	private String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "EQUP_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR05GoodsEquipmentUsed goodsEqupDetails;

}
