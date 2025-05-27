package com.focusr.Precot.QA.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_AGENDA_FOR_MANAGEMENT_ATTENDEES", schema = AppConstants.schema)
public class AgendaForManagementAttendees {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "SIGN")
	private String sign;
	
	@Column(name = "ID")
	private Long id;
	
}
