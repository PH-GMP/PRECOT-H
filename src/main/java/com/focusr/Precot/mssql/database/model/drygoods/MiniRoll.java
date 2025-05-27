package com.focusr.Precot.mssql.database.model.drygoods;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.DryGoodsOperatorHodOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "MINI_ROLL_F05", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "SHIFT" ,"ORDER_NO"}) })
public class MiniRoll extends DryGoodsOperatorHodOperator {

	@Id
	@Column(name = "ROLL_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long roll_id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	//

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "LAYDOWN_NO")
	private String laydown_no;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "PRODUCT_NAME")
	private String product_name;

	@Column(name = "CUSTOMER_NAME")
	private String customer_name;

	@Column(name = "USABLE_KG")
	private String usable_kg;

	@Column(name = "SALEABLE_KG")
	private String saleable_kg;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "OPERATOR_SIGN")
	private String operator_sign;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

}
