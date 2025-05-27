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
@Table(name = "PADPUNCHING_BMR_MANUFACTURING_STEPS", schema = AppConstants.schema)
public class PunchingBmrManufacturingSteps extends SpunlaceSummerySubmit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MANUFACTURE_ID")
	private Long manufactureId;

	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
//	@OneToMany(targetEntity = PunchingBmrManufacturingStepsLine.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "MANUFACTURE_ID", referencedColumnName = "MANUFACTURE_ID")
//	private List<PunchingBmrManufacturingStepsLine> details;
	
	@OneToMany(mappedBy = "manufactureRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PunchingBmrManufacturingStepsLine> details;

}
