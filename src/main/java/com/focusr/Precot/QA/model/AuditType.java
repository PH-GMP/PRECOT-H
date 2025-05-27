package com.focusr.Precot.QA.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_AUDIT_SCHEDULE_AUDIT_TYPE", schema = AppConstants.schema,
uniqueConstraints=@UniqueConstraint(columnNames= {"AUDIT_TYPE"}))
public class AuditType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "AUDIT_TYPE")
	private String auditType;
}
