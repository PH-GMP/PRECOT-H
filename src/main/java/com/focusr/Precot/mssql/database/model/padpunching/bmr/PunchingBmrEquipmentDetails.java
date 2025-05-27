package com.focusr.Precot.mssql.database.model.padpunching.bmr;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_BMR_EQUIPMENT_DETAILS", schema = AppConstants.schema)
public class PunchingBmrEquipmentDetails extends SpunlaceSummerySubmit {

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
	
//	@OneToMany(targetEntity = PunchingBmrEquipmentDetailsLine.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "EQUIPMENT_ID", referencedColumnName = "EQUIPMENT_ID")
//	private List<PunchingBmrEquipmentDetailsLine> details;
	
	@OneToMany(mappedBy = "equipmentRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PunchingBmrEquipmentDetailsLine> details;
}
