package com.focusr.Precot.mssql.database.model.padpunching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SaveSubmitSupervisorHod;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_F007",schema=AppConstants.schema,uniqueConstraints = {
		@UniqueConstraint(columnNames = {"DATE"})})
public class MetalDetectorCheckList007 extends SaveSubmitSupervisorHod{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIST_ID")
	private Long listId;
	
	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name = "REVISION_NO")
	private Long revisionNo;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "UNIT")
	private String unit ;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "EQUIPMENT_NAME")
	private String equipmentName;
	
	@Column(name = "FREQUENCY")
	private String frequency;
	
	@Column(name = "METAL_CONTAMINATED_MATERIALS")
	private String metalContaminatedMaterials;
	
	@Column(name = "NO_OF_METAL_CONTAMINANTS")
	private String noOfMetalContaminants;
	
	@Column(name = "CLEANED_BY")
	private String cleanedBy;
	
	@Column(name = "FUNCTION_CHECK")
	private String functionCheck;
	
	@Column(name = "REMARKS")
	private String remarks;	
	
	@Column(name = "REASON")
	private String reason;
}
