package com.focusr.Precot.Buds.model.bmr;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEquipmentDetailsLine;
import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_BMR_EQUIPMENT_ANNEXURE_HEADER", schema = AppConstants.schema)
public class BudsBmrEquipmentAnnexureHeader  extends SpunlaceSummerySubmit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "EQUIPMENT_ID")
	private Long equipmentId;

	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@OneToMany(mappedBy = "equipmentRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BudsBmrEquipmentAnnexureLine> details;
	
}
