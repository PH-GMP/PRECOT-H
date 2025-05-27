package com.focusr.Precot.Buds.model.bmr;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.Buds.model.BudsBmrSignature;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_BMR_POST_PRODUCTION_REVIEW", schema = AppConstants.schema)
public class BudsBmrPostProductionReview extends BudsBmrSignature {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "HOD_NAME")
	private String hodName;
	
	@Column(name = "HOD_STATUS")
	private String hodStatus;
	
	@Column(name = "HOD_ID")
	private Long hodId;
	
	@Column(name = "HOD_SUBMITTED_DATE")
	private String hodDate;
	
}
