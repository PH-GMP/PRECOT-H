package com.focusr.Precot.QA.model.audit;

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
import com.focusr.Precot.QA.model.ListOfSharpTools;
import com.focusr.Precot.QA.model.ListOfSharpToolsLines;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_LIST_OF_SHARP_TOOLS_LINES_HISTORY", schema = AppConstants.schema)
	
public class ListOfSharpToolsLinesHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;
	
	@Column(name = "ITEM_DESCRIPTION")
	private String item_description;
	
	@Column(name = "IDENTIFICATION_NO")
	private String identification_no;
	
	@Column(name = "VERIFICATION_FREQUENCY")
	private String verification_frequency;
	
	@Column(name = "LOCATION")
	private String location;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "HISTORY_ID")
	private Long history_id;
	
	
//	  @ManyToOne(fetch = FetchType.EAGER)
//	    @JoinColumn(name = "HISTORY_ID", insertable = false, updatable = false)
//	    @JsonIgnore
//	    private ListOfSharpToolsHistory listofsharptoolshistory;
}
