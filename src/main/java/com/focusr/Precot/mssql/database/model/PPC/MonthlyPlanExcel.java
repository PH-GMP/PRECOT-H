package com.focusr.Precot.mssql.database.model.PPC;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PPC_MONTHLY_PLAN_EXCEL", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "MONTHYEAR", "DETAILS" }) })
@Data
public class MonthlyPlanExcel extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

    @Column(name = "MONTHYEAR")
    private String monthyear;

	@Column(name = "DETAILS")
	private String details;

	@Column(name = "EXCEL_FILE")
	@Lob
	private byte[] excelFile;

	public MonthlyPlanExcel() {
	}

}
