package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpulanceSaveSubmitOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS_F013", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "SHIFT", "ORDER_NO" }) })
public class ProcessSetupVerificationRpBalePressF013 extends SpulanceSaveSubmitOperator{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROCESS_ID")
	private Long processId;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "NO_OF_TWIST_WITH_NEEDLES")
	private int twistWithNeedles;
	
	@Column(name = "NO_OF_TWIST_WITHOUT_NEEDLES")
	private int twistWithoutNeedles;
	
	@Column(name = "ACTUAL_NO_OF_TWIST")
	private int actualNoOftwist;
	
	@Column(name = "LENGTH_OF_BALE")
	private int lenOfBales;
	
	@Column(name = "ACTUAL_LENGTH_OF_BALE")
	private int actualLenOfBales;
	
	//setting press
	@Column(name = "PRESSURE_PRESS_PLATE")
	private int pressurePressPlate;
	
	@Column(name = "PRESSURE_COMPENSATOR")
	private int pressureCompensator;
	
	@Column(name = "DE_PRESSURIZED_PRESS_PLATE")
	private int dePressurizedPressPlate;
	
	@Column(name = "TIME_OUT_MOTOR")
	private int timeOutMotor;
	
	@Column(name = "ODT_FILL_LEVEL")
	private int odtFillLevel;
	
	@Column(name = "ODT_HIGH_LEVEL")
	private int odtHighLevel;
	
	//hopper setting
	@Column(name = "BEATER_SPEED")
	private int beaterSpeed;
	
	@Column(name = "FEED_ROLLER_SPEED")
	private int feedRollerSpeed;
	
	@Column(name = "TRANSPORT_FAN_SPEED")
	private int transportFanSpeed;

	@Column(name = "REASON")
	private String reason;
}
