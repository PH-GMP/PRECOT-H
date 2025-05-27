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
@Table(name = "QA_LIST_OF_EQUIPMENT_AND_QUALIFICATION", schema = AppConstants.schema)
public class ListOfEquipmentAndQualificationLine4 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "UTILITY")
	private String utility;
	
	@Column(name = "EQUIPMENT_NO")
	private String equipmentNo;
	
	@Column(name = "QUALIFICATION_DONE_DATE")
	private String qualificationDoneDate;
	
	@Column(name = "QUALIFICATION_DUE_DATE")
	private String qualificationDueDate;
	
	@Column(name = "QUALIFICATION_REMARKS")
	private String qualificationRemarks;
	
	@Column(name = "ID")
	private Long id;
}
