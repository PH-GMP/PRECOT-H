package com.focusr.Precot.mssql.database.model.drygoods;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "DRYGOODS_LAYDOWN_BALENO_MAPPING", schema=AppConstants.schema,uniqueConstraints = {
		@UniqueConstraint(columnNames = { "BALE_NO", "LAYDOWN_NO" }) })
public class LayDownBaleNoMapping extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "LAYDOWN_NO")
	private String laydown_no;
	
	@Column(name = "BALE_NO")
	private String bale_no;

	@Column(name = "STATUS")
	private String status;

	@Column(name = "DEPARTMENT_ID")
	private Long department_id;

	@Column(name = "START_DATE")
	private String startDate;

	@Column(name = "END_DATE")
	private String endDate;
	
	@Column(name = "SHIFT")
	private String shift;

}
