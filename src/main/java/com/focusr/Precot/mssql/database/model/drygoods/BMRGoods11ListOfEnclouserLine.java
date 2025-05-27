package com.focusr.Precot.mssql.database.model.drygoods;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_BMR_11_LIST_OF_ENCLOSURS_LINE", schema = AppConstants.schema)
public class BMRGoods11ListOfEnclouserLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "ENC_ID")
	private Long enc_id;

	@Column(name = "TITLE")
	private String title;

	@Column(name = "REMARKS")
	private String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENC_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR11GoodsListOfEnclouser bmrEncloserDetailRecords;

}
