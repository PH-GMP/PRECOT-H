package com.focusr.Precot.mssql.database.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "PASSWORD_HISTORY", schema = AppConstants.schema)
public class PasswordHistory extends UserDateAudit {

	@Id
	@Column(name = "PASSWORD_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long passwordId;
	
	@Column(name = "PASSWORD_HASH")
	private String passwordHash;
	
	@Column(name = "PASSWORD_CHANGED_DATE")
	private Date passwordChangedDate;
	
	@Column(name = "USER_ID")
	private Long userId;
	
//	@ManyToOne
//	@JoinColumn(name = "ID", nullable = false)
//	@JsonIgnore
//	private User passwordAudit;
	
}
