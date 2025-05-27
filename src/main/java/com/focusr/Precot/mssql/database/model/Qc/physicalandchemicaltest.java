package com.focusr.Precot.mssql.database.model.Qc;


import java.util.Date;

import java.util.List;
import java.util.stream.Collectors;

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
import com.focusr.Precot.payload.QAQCObservationOutput;
import com.focusr.Precot.payload.arfo2payload;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Table(name = "PHYSICAL_AND_CHEMCAL_TEST", schema = AppConstants.schema)
@Entity
@Data
public class physicalandchemicaltest extends UserDateAudit{

	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;

	@Column(name = "AR_NO")
	private String ar_no;
	
	@Column(name = "FORMAT")
	private String format;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String format_no;
	
	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "REVISION_NO")
	private String revision_no;

	@Column(name = "SAMPLING_DATE")
	private String samplingDate;

	@Column(name = "TESTED_DATE")
	private String tested_Date;

	@Column(name = "SUB_BATCH_NO")
	private String sub_batch_no;

	@Column(name = "INTERNAL_EXPORT")
	private String internal_export;

	@Column(name = "FINISHING")
	private String finishing;

	@Column(name = "MIXING")
	private String mixing;

	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "BMR_NO")
	private String bmr_no;
	


	@Column(name = "RESULT")
	private String result;

	@Column(name = "PRODUCT")
	private String product;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "QC_SIGN")
	private String qc_sign;
	

	@Column(name = "MATERIAL_PASSES")
	private String material_passes;

	@Column(name = "chemist_STATUS")
	private String chemist_status;

	@Column(name = "chemist_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "chemist_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "chemist_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "chemist_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "chemist_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "chemist_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "chemist_SIGN")
	private String chemist_sign;
	
	//---------------------------------------------------------------------------
	
	@Column(name = "micro_STATUS")
	private String micro_status;

	@Column(name = "MICROBIOLOGIST_SAVED_ON")
	private Date microbiologist_saved_on;

	@Column(name = "MICROBIOLOGIST_SAVED_BY")
	private String microbiologist_saved_by;

	@Column(name = "MICROBIOLOGIST_SAVED_ID")
	private Long microbiologist_saved_id;

	@Column(name = "micro_SUBMIT_ON")
	private Date micro_submit_on;

	@Column(name = "micro_SUBMIT_BY")
	private String micro_submit_by;

	@Column(name = "micro_SUBMIT_ID")
	private Long micro_submit_id;

	@Column(name = "micro_SIGN")
	private String micro_sign;

	// HOD

	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;
	
	@Column(name = "PREPARED_BY")
	private String prepared_by;
	

	
//	public void fromDto(arfo2payload dto) {
//		
//		if (dto.getQaqc() != null) {
//		    this.qaqc = dto.getQaqc().stream()
//		            .map(qaqcDto -> {
//		                QAqcObservations qaqc = new QAqcObservations();
//		                qaqc.setObs_id(qaqcDto.getObs_id());
//		                qaqc.setTest_id(dto.getTest_id()); // Assuming test_id is the same for child
//
//		                // Manually set each field
//		                qaqc.setDescriptionObr(qaqcDto.getDescriptionObr());
//		                qaqc.setDescriptionremark(qaqcDto.getDescriptionremark());
//		                qaqc.setIdentificationObr(qaqcDto.getIdentificationObr());
//		                qaqc.setIdentificationrmk(qaqcDto.getIdentificationrmk());
//		                qaqc.setFibre_obs(qaqcDto.getFibre_obs());
//		                qaqc.setFibre_rmk(qaqcDto.getFibre_rmk());
//		                qaqc.setAcid_obs(qaqcDto.getAcid_obs());
//		                qaqc.setAcid_rmk(qaqcDto.getACID_RMK());
//		                qaqc.setSurface_obs(qaqcDto.getSurface_obs());
//		                qaqc.setSurface_rmk(qaqcDto.getSurface_rmk());
//		                qaqc.setForeign_obs(qaqcDto.getForeign_obs());
//		                qaqc.setForeign_rmk(qaqcDto.getForeign_rmk());
//		                qaqc.setFluorescence_obs(qaqcDto.getFluorescence_obs());
//		                qaqc.setFluorescence_rmk(qaqcDto.getFluorescence_rmk());
//		                qaqc.setNeps_obs(qaqcDto.getNeps_obs());
//		                qaqc.setNeps_rmk(qaqcDto.getNeps_rmk());
//		                qaqc.setNeps_count_obs(qaqcDto.getNeps_count_obs());
//		                qaqc.setNeps_count_rmk(qaqcDto.getNeps_count_rmk());
//		                qaqc.setUQL_w_obs(qaqcDto.getUQL_w_obs());
//		                qaqc.setUQL_w_rmk(qaqcDto.getUQL_w_rmk());
//		                qaqc.setLn_obs(qaqcDto.getLn_obs());
//		                qaqc.setLn_rmk(qaqcDto.getLn_rmk());
//		                qaqc.setLw_obs(qaqcDto.getLw_obs());
//		                qaqc.setLw_rmk(qaqcDto.getLw_rmk());
//		                qaqc.setSFC_n_obs(qaqcDto.getSFC_n_obs());
//		                qaqc.setSFC_n_rmk(qaqcDto.getSFC_n_rmk());
//		                qaqc.setSFC_w_obs(qaqcDto.getSFC_w_obs());
//		                qaqc.setSFC_w_rmk(qaqcDto.getSFC_w_rmk());
//		                qaqc.setMicronaire_obs(qaqcDto.getMicronaire_obs());
//		                qaqc.setMicronaire_rmk(qaqcDto.getMicronaire_rmk());
//		                qaqc.setWhiteness_obs(qaqcDto.getWhiteness_obs());
//		                qaqc.setWhiteness_rmk(qaqcDto.getWhiteness_rmk());
//		                qaqc.setExtractable_obs(qaqcDto.getExtractable_obs());
//		                qaqc.setExtractable_rmk(qaqcDto.getExtractable_rmk());
//		                qaqc.setAbs_1(qaqcDto.getAbs_1());
//		                qaqc.setAbs_2(qaqcDto.getAbs_2());
//		                qaqc.setAbs_3(qaqcDto.getAbs_3());
//		                qaqc.setAbs_4(qaqcDto.getAbs_4());
//		                qaqc.setAbs_5(qaqcDto.getAbs_5());
//		                qaqc.setAbs_6(qaqcDto.getAbs_6());
//		                qaqc.setAbs_avg(qaqcDto.getAbs_avg());
//		                qaqc.setAbs_avg_2(qaqcDto.getAbs_avg_2());
//		                qaqc.setRemark(qaqcDto.getRemark());
//		                qaqc.setSulphatedFlWtObr(qaqcDto.getSulphatedFlWtObr());
//		                qaqc.setSulphatedIlWtObr(qaqcDto.getSulphatedIlWtObr());
//		                qaqc.setSulphatedBaObr(qaqcDto.getSulphatedBaObr());
//		                qaqc.setSulphatedResObr(qaqcDto.getSulphatedResObr());
////		                qaqc.setWatersolubleflwtobr(qaqcDto.getWatersolubleFlWtObr());
////		                qaqc.setWatersolubleilwtobr(qaqcDto.getWatersolubleIlWtObr());
//		                qaqc.setWatersolubleNmObr(qaqcDto.getWatersolubleNmObr());
//		                qaqc.setWatersolubleResObr(qaqcDto.getWatersolubleResObr());
//		                qaqc.setEthersolubleFlWtObr(qaqcDto.getEthersolubleFlWtObr());
//		                qaqc.setEthersolubleIlWtObr(qaqcDto.getEthersolubleIlWtObr());
//		                qaqc.setEthersolubleYxObr(qaqcDto.getEthersolubleYxObr());
//		                qaqc.setEthersolubleResObr(qaqcDto.getEthersolubleResObr());
//		                qaqc.setLossondryingFlWtObr(qaqcDto.getLossondryingFlWtObr());
//		                qaqc.setLossondryingIlWtObr(qaqcDto.getLossondryingIlWtObr());
//		                qaqc.setLossondryingKlObr(qaqcDto.getLossondryingKlObr());
//		                qaqc.setLossondryingResObr(qaqcDto.getLossondryingResObr());
//		                qaqc.setFinal_remark(qaqcDto.getFinal_remark());
//		                qaqc.setSub_batch_no(qaqcDto.getSub_batch_no());
//		                
//		                return qaqc;
//		            })
//		            .collect(Collectors.toList());
//		}
//
//
//		if (dto.getMicro() != null) {
//		    this.micro = dto.getMicro().stream()
//		            .map(microDto -> {
//		                microbiologicalTestF002 microTest = new microbiologicalTestF002();
//		                microTest.setMicro_id(microDto.getMicro_id());
//		                microTest.setTest_id(dto.getTest_id()); // Assuming test_id is the same for child
//		                microTest.setSampled_on(microDto.getSampled_on());
//		                microTest.setTested(microDto.getTested());
//		                microTest.setTf_count(microDto.getTf_count());
//		                microTest.setTf_viable_count(microDto.getTf_viable_count());
//		                microTest.setP_field_a(microDto.getP_field_a());
//		                microTest.setP_field_b(microDto.getP_field_b());
//		                microTest.setP_field_c(microDto.getP_field_c());
//		                microTest.setP_field_d(microDto.getP_field_d());
//		                microTest.setP_field_e(microDto.getP_field_e());
//		                microTest.setMoisture(microDto.getMoisture());
//		                microTest.setSub_batch_no(microDto.getSub_batch_no());
//		                microTest.setCompletion_date(microDto.getCompletion_date());
//		                microTest.setRemarks(microDto.getRemarks());
//		                microTest.setProduct(microDto.getProduct());
//		                microTest.setMicro_id(microTest.getMicro_id());
//		                microTest.setTest_id(microTest.getTest_id());
//
//		                return microTest;
//		            })
//		            .collect(Collectors.toList());
//		}
//
//	    
//
//	}

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "physicalandchemicaltest")
	private List<QAqcObservations> qaqc;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "physicalandchemicaltest")
	private List<microbiologicalTestF002> micro;

	public physicalandchemicaltest() {
		
	}
	
	


	
}
