package com.focusr.Precot.mssql.database.model.drygoods;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.payload.spulance.GoodsSummerySubmit;
import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_BMR__06_VERIFICATION_OF_RECORDS", schema = AppConstants.schema)
public class BMR06GoodsVerificationOfRecords extends GoodsSummerySubmit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "VERIFICATION_ID")
	private Long verification_id;
	
	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "bmrVerificationDetail")
	private List<BMR06GoodsVerificationOfRecordsLine> detailsVerificationRecords;

}
