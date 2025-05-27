package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "PREPARATION_DATE","LOAD_NO"}) })
public class Qc_MediaPreparationAndConsumptionRecordF019 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "PREPARATION_DATE")
	private String preparationDate;

	@Column(name = "LOAD_NO")
	private String loadNo;

	@Column(name = "SCDA_MEDIA_WEIGHT")
	private String scdaMediaWeight;

	@Column(name = "SCDA_DISTILLED_WATER")
	private String scdaDistilledWater;

	@Column(name = "SCDA_MEDIA_QUANTITY")
	private String scdaMediaQuantity;

	@Column(name = "SCDA_PH_OF_MEDIA_REQUIRED")
	private String scdaPhOfMediaRequired;

	@Column(name = "SCDA_PH_MEDIA_OBSERVED")
	private String scdaPhMediaObserved;

	@Column(name = "SCDA_NO_OF_PLATES")
	private String scdaNoOfPlates;

	@Column(name = "SCDA_MEDIA_POURED")
	private String scdaMediaPoured;

	@Column(name = "SCDA_QUANTITY_USED")
	private String scdaQuantityUsed;

	@Column(name = "SCDA_REMAINING_QUANTITY")
	private String scdaRemainingQuantiy;

	@Column(name = "SCDA_REMARKS")
	private String scdaRemarks;

	@Column(name = "SCDA_PREPARED_BY")
	private String scdaPreparedBy;

	@Column(name = "SCDA_VERIFIED_BY")
	private String scdaVerifiedBy;

	@Column(name = "SDA_MEDIA_WEIGHT")
	private String sdaMediaWeight;

	@Column(name = "SDA_DISTILLED_WATER")
	private String sdaDistilledWater;

	@Column(name = "SDA_MEDIA_QUANTITY")
	private String sdaMediaQuantity;

	@Column(name = "SDA_PH_OF_MEDIA_REQUIRED")
	private String sdaPhOfMediaRequired;

	@Column(name = "SDA_PH_MEDIA_OBSEREVED")
	private String sdaPhMediaObsereved;

	@Column(name = "SDA_NO_OF_PLATES")
	private String sdaNoOfPlates;

	@Column(name = "SDA_MEDIA_POURED")
	private String sdaMediaPoured;

	@Column(name = "SDA_QUANTITY_USED")
	private String sdaQuantityUsed;

	@Column(name = "SDA_REMAINING_QUANTITY")
	private String sdaRemainingQuantiy;

	@Column(name = "SDA_REMARKS")
	private String sdaRemarks;

	@Column(name = "SDA_PREPARED_BY")
	private String sdaPreparedBy;

	@Column(name = "SDA_VERIFIED_BY")
	private String sdaVerifiedBy;

	@Column(name = "VRBA_MEDIA_WEIGHT")
	private String vrbaMediaWeight;

	@Column(name = "VRBA_DISTILLED_WATER")
	private String vrbaDistilledWater;

	@Column(name = "VRBA_MEDIA_QUANTITY")
	private String vrbaMediaQuantity;

	@Column(name = "VRBA_PH_OF_MEDIA_REQUIRED")
	private String vrbaPhOfMediaRequired;

	@Column(name = "VRBA_PH_MEDIA_OBSEREVED")
	private String vrbaPhMediaObsereved;

	@Column(name = "VRBA_NO_OF_PLATES")
	private String vrbaNoOfPlates;

	@Column(name = "VRBA_MEDIA_POURED")
	private String vrbaMediaPoured;

	@Column(name = "VRBA_QUANTITY_USED")
	private String vrbaQuantityUsed;

	@Column(name = "VRBA_REMAINING_QUANTITY")
	private String vrbaRemainingQuantiy;

	@Column(name = "VRBA_REMARKS")
	private String vrbaRemarks;

	@Column(name = "VRBA_PREPARED_BY")
	private String vrbaPreparedBy;

	@Column(name = "VRBA_VERIFIED_BY")
	private String vrbaVerifiedBy;

	@Column(name = "MACCON_MEDIA_WEIGHT")
	private String maccOnMediaWeight;

	@Column(name = "MACCON_DISTILLED_WATER")
	private String maccOnDistilledWater;

	@Column(name = "MACCON_MEDIA_QUANTITY")
	private String maccOnMediaQuantity;

	@Column(name = "MACCON_PH_OF_MEDIA_REQUIRED")
	private String maccOnPhOfMediaRequired;

	@Column(name = "MACCON_PH_OF_MEDIA_OBSEREVED")
	private String maccOnPhMediaObsereved;

	@Column(name = "MACCON_NO_OF_PLATES")
	private String maccOnNoOfPlates;

	@Column(name = "MACCON_MEDIA_POURED")
	private String maccOnMediaPoured;

	@Column(name = "MACCON_QUANTITY_USED")
	private String maccOnQuantityUsed;

	@Column(name = "MACCON_REMAINING_QUANTITY")
	private String maccOnRemainingQuantiy;

	@Column(name = "MACCON_REMARKS")
	private String maccOnRemarks;

	@Column(name = "MACCON_PREPARED_BY")
	private String maccOnPreparedBy;

	@Column(name = "MACCON_VERIFIED_BY")
	private String maccOnVerifiedBy;

	@Column(name = "CITRIC_MEDIA_WEIGHT")
	private String citricMediaWeight;

	@Column(name = "CITRIC_DISTILLED_WATER")
	private String citricDistilledWater;

	@Column(name = "CITRIC_MEDIA_QUALITY")
	private String citricMediaQuantity;

	@Column(name = "CITRIC_PH_OF_MEDIA_REQUIRED")
	private String citricPhOfMediaRequired;

	@Column(name = "CITRIC_PH_MEDIA_OBSEREVED")
	private String citricPhMediaObsereved;

	@Column(name = "CITRIC_NO_OF_PLATES")
	private String citricNoOfPlates;

	@Column(name = "CITRIC_MEDIA_POURED")
	private String citricMediaPoured;

	@Column(name = "CITRIC_QUANTITY_USED")
	private String citricQuantityUsed;

	@Column(name = "CITRIC_REMAINING_QUANTITY")
	private String citricRemainingQuantiy;

	@Column(name = "CITRIC_REMARKS")
	private String citricRemarks;

	@Column(name = "CITRIC_PREPARED_BY")
	private String citricPreparedBy;

	@Column(name = "CITRIC_VERIFIED_BY")
	private String citricVerifiedBy;

	@Column(name = "VJ_MEDIA_WEIGHT")
	private String vjMediaWeight;

	@Column(name = "VJ_DISTILLED_WATER")
	private String vjDistilledWater;

	@Column(name = "VJ_MEDIA_QUANTITY")
	private String vjMediaQuantity;

	@Column(name = "VJ_PH_OF_MEDIA_REQUIRED")
	private String vjPhOfMediaRequired;

	@Column(name = "VJ_PH_MEDIA_OBSEREVED")
	private String vjPhMediaObsereved;

	@Column(name = "VJ_NO_OF_PLATES")
	private String vjNoOfPlates;

	@Column(name = "VJ_MEDIA_POURED")
	private String vjMediaPoured;

	@Column(name = "VJ_QUANTITY_USED")
	private String vjQuantityUsed;

	@Column(name = "VJ_REMAINING_QUANTITY")
	private String vjRemainingQuantiy;

	@Column(name = "VJ_REMARKS")
	private String vjRemarks;

	@Column(name = "VJ_PREPARED_BY")
	private String vjPreparedBy;

	@Column(name = "VJ_VERIFIED_BY")
	private String vjVerifiedBy;

	@Column(name = "BGA_MEDIA_WEIGHT")
	private String bgaMediaWeight;

	@Column(name = "BGA_DISTILLED_WATER")
	private String bgaDistilledWater;

	@Column(name = "BGA_MEDIA_QUANTITY")
	private String bgaMediaQuantity;

	@Column(name = "BGA_PH_OF_MEDIA_REQUIRED")
	private String bgaPhOfMediaRequired;

	@Column(name = "BGA_PH_MEDIA_OBSEREVED")
	private String bgaPhMediaObsereved;

	@Column(name = "BGA_NO_OF_PLATES")
	private String bgaNoOfPlates;

	@Column(name = "BGA_MEDIA_POURED")
	private String bgaMediaPoured;

	@Column(name = "BGA_QUANTITY_USED")
	private String bgaQuantityUsed;

	@Column(name = "BGA_REMAINING_QUANTITY")
	private String bgaRemainingQuantiy;

	@Column(name = "BGA_REMARKS")
	private String bgaRemarks;

	@Column(name = "BGA_PREPARED_BY")
	private String bgaPreparedBy;

	@Column(name = "BGA_VERIFIED_BY")
	private String bgaVerifiedBy;

	@Column(name = "NACL_MEDIA_WEIGHT")
	private String naclMediaWeight;

	@Column(name = "NACL_DISTILLED_WATER")
	private String naclDistilledWater;

	@Column(name = "NACL_MEDIA_QUANTITY")
	private String naclMediaQuantity;

	@Column(name = "KH2PO_MEDIA_WEIGHT")
	private String kh2po4MediaWeight;

	@Column(name = "KH2PO_DISTILLED_WATER")
	private String kh2po4DistilledWater;

	@Column(name = "KH2PO_MEDIA_QUANTITY")
	private String kh2po4MediaQuantity;

	@Column(name = "PEPTONE_WATER_MEDIA_WEIGHT")
	private String peptoneWaterMediaWeight;

	@Column(name = "PEPTONE_WATER_DISTILLED_WATER")
	private String peptoneWaterDistilledWater;

	@Column(name = "PEPTONE_WATER_MEDIA_QUANTITY")
	private String peptoneWaterMediaQuantity;

	@Column(name = "TWEEN80_MEDIA_WEIGHT")
	private String tween80MediaWeight;

	@Column(name = "TWEEN80_DISTILLED_WATER")
	private String tween80DistilledWater;

	@Column(name = "TWEEN80_MEDIA_QUANTITY")
	private String tween80MediaQuantity;

	@Column(name = "BUFFER_SOL_PH_MEDIA_REQUIRED")
	private String bufferSolPhMediaRequired;

	@Column(name = "BUFFER_SOL_PH_MEDIA_OBSEREVED")
	private String bufferSolPhMediaObsereved;

	@Column(name = "BUFFER_SOL_NO_OF_PLATES")
	private String bufferSolNoOfPlates;

	@Column(name = "BUFFER_SOL_MEDIA_POURED")
	private String bufferSolMediaPoured;

	@Column(name = "BUFFER_SOL_QUANTITY_USED")
	private String bufferSolQuantityUsed;

	@Column(name = "BUFFER_SOL_REMAINING_QUANTITY")
	private String bufferSolRemainingQuantiy;

	@Column(name = "BUFFER_SOL_REMARKS")
	private String bufferSolRemarks;

	@Column(name = "BUFFER_SOL_PREPARED_BY")
	private String bufferSolPreparedBy;

	@Column(name = "BUFFER_SOL_VERIFIED_BY")
	private String bufferSolVerifiedBy;

	@Column(name = "MICROBIOLOGIST_STATUS")
	private String microbiologist_status;

	@Column(name = "MICROBIOLOGIST_SAVED_ON")
	private Date microbiologist_saved_on;

	@Column(name = "MICROBIOLOGIST_SAVED_BY")
	private String microbiologist_saved_by;

	@Column(name = "MICROBIOLOGIST_SAVED_ID")
	private Long microbiologist_saved_id;

	@Column(name = "MICROBIOLOGIST_SUBMIT_ON")
	private Date microbiologist_submit_on;

	@Column(name = "MICROBIOLOGIST_SUBMIT_BY")
	private String microbiologist_submit_by;

	@Column(name = "MICROBIOLOGIST_SUBMIT_ID")
	private Long microbiologist_submit_id;

	@Column(name = "MICROBIOLOGIST_SIGN")
	private String microbiologist_sign;
	
	@Column(name = "MANAGER_STATUS")
	private String manager_status;
 
	@Column(name = "MANAGER_SUBMIT_ON")
	private Date manager_submit_on;
 
	@Column(name = "MANAGER_SUBMIT_BY")
	private String manager_submit_by;
 
	@Column(name = "MANAGER_SUBMIT_ID")
	private Long manager_submit_id;
 
	@Column(name = "MANAGER_SIGN")
	private String manager_sign;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "MAIL_STATUS")
	private String mail_status;


}
