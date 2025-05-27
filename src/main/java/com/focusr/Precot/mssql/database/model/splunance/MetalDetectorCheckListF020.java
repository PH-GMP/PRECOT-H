package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_METAL_DETECTOR_CHECK_LIST_F020", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "MONTH", "YEAR" }) })
public class MetalDetectorCheckListF020 extends SpunlaceSaveSumbitSupervisor{

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
	
	@Column(name = "FREQUENCY")
	private String frequency;
	
	@Column(name = "METAL_CONTAMINATED_MATERIALS_CCP4A")
	private String metalContaminatedMaterials4A;
	
	@Column(name = "METAL_CONTAMINATED_MATERIALS_CCP4B")
	private String metalContaminatedMaterials4B;
	
	@Column(name = "NO_OF_METAL_CONTAMINANTS_CCP4A")
	private String noOfMetalContaminants4A;
	
	@Column(name = "NO_OF_METAL_CONTAMINANTS_CCP4B")
	private String noOfMetalContaminants4B;
	
	@Column(name = "USING_FERROUS")
	private String usingFerrous;

	@Column(name = "USING_COPPER")
	private String usingCopper;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "CLEANED_BY")
	private String cleanedBy;
	
	@Column(name = "REASON")
	private String reason;
}
