package com.focusr.Precot.mssql.database.model.splunance;

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
@Table(name = "SPUNLACE_BMR_11_LIST_OF_ENCLOSURES", schema = AppConstants.schema)
public class BMR11ListsOfEnclosures {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;
	
	@Column(name = "REMARKS_1")
	private String remarks_1;
	
	@Column(name = "REMARKS_2")
	private String remarks_2;
	
	@Column(name = "REMARKS_3")
	private String remarks_3;
	
	@Column(name = "REMARKS_4")
	private String remarks_4;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	


	

}
