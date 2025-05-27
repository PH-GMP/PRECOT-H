package com.focusr.Precot.QA.model.audit;

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
@Table(name = "QA_RODENT_BOX_CHECK_LIST_DETAILS_HISTORY", schema = AppConstants.schema)
public class QaRodentBoxDetailsHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "RODENT_BOX_NO")
	private String rodent_box_no;
	
	@Column(name = "LOCATION")
	private String location;
	
	@Column(name = "RODENT_BOX_TYPE")
	private String rodent_box_type;
	
	@Column(name = "GLUE_PAPER_REPLACED")
	private String glue_paper_replaced;
	
	@Column(name = "RODENT_BOX_FIXED")
	private String rodent_box_fixed;
	
	@Column(name = "BOX_NO_IDENTIFIED")
	private String box_no_identified;
	
	@Column(name = "DEAD_RODENT_FOUND")
	private String dead_rodent_found;
	
	@Column(name = "HISTORY_ID")
	private Long history_id;
}
