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

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "DRYGOODS_BMR_10_PROCESS_DELAY_EQUP", schema = AppConstants.schema)
public class BMR10GoodsProcessDelayEqupment extends UserDateAudit {

	@Column(name = "PROCESS_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long process_id;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;
	
	
	//NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;



	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "delayDetails")
	private List<BMR10GoodsProcessDelayEqupmentLine> detailsDly;

}
