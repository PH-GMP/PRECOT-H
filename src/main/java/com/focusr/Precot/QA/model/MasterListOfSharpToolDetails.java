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
@Table(name = "MASTER_LIST_OF_SHARP_TOOL_DETAILS", schema = AppConstants.schema)
public class MasterListOfSharpToolDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DETAILS_ID")
	private Long detailsId;

	@Column(name = "SNO")
	private Long sno;
	
	@Column(name = "ITEM_DESCRIPTION")
	private String itemDescription;
	
	@Column(name = "IDENTIFICATION_NO_ON_THE_TOOL")
	private String identificationNoOnTheTool;
	
	@Column(name = "LOCATION")
	private String location;
	
	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "ID")
	private Long id;


}
