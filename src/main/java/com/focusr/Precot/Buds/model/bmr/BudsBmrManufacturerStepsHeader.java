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

import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_BMR_MANUFACTURER_STEPS_HEADER", schema = AppConstants.schema)
public class BudsBmrManufacturerStepsHeader  extends  SpunlaceSummerySubmit {

	@Column(name = "ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "MACHINE_NAME")
	private String machineName2;
	
	@Column(name = "MACHINE_START_TIME")
	private String machineStartTime2;
	
	@Column(name = "MACHINE_END_TIME")
	private String machineEndTime2;
	
	@Column(name = "MACHINE_SPEED")
	private String machineSpeed2;
	
	@Column(name = "RPM2")
	private String rpm2;
	
	@Column(name = "PDS_NUMBER4")
	private String pdsNumber4;
	
	@OneToMany(mappedBy = "manufactureRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BudsBmrManufacturerStepsLine> details;
	
}
