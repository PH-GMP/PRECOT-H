package com.focusr.Precot.mssql.database.model.drygoods;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "DRYGOODS_LAYDOWN_GENERATION",schema=AppConstants.schema)
public class DryGoodsLayDownGeneration extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "DRYGOODS_LAYDOWN_NUMBER")
	private String drygoods_laydown_number;

	@Column(name = "STATUS")
	private String status;

	@Column(name = "DEPARTMENT_ID")
	private Long department_id;
}
