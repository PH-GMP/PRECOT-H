package com.focusr.Precot.payload;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.focusr.Precot.mssql.database.model.Qc.QAqcObservations;
import com.focusr.Precot.mssql.database.model.Qc.microbiologicalTestF002;
import com.focusr.Precot.mssql.database.model.Qc.physicalandchemicaltest;

import lombok.Data;
@Data
public class arfo2payload {
	
	 private Long test_id;
	    private String ar_no;
	    private String samplingDate;
	    private String tested_Date;
	    private String sub_batch_no;
	    private String internal_export;
	    private String finishing;
	    private String mixing;
	    private String remarks;
	    private String result;
	    private String product;
	    private String material_passes;
	    private String format_no;
	    private String ref_sop_no;
	    private String revision_no;
	    private String format;
	    private String reason;
	    private String qc_sign;
	    private String chemist_status;
	    private Date chemist_saved_on;
	    private String chemist_saved_by;
	    private Long chemist_saved_id;
	    private Date chemist_submit_on;
	    private String chemist_submit_by;
	    private Long chemist_submit_id;
	    private String chemist_sign;
	    private String micro_status;
	    private Date MICROBIOLOGIST_SAVED_on;
	    private String MICROBIOLOGIST_SAVED_by;
	    private Long MICROBIOLOGIST_SAVED_id;
	    private Date micro_submit_on;
	    private String micro_submit_by;
	    private Long micro_submit_id;
	    private String micro_sign;
	    private String qc_status;
	    private Date qc_submit_on;
	    private String qc_submit_by;
	    private Long qc_submit_id;
	    private String prepared_by;

	    private String bmr_no;
	    // Nested lists
	    private List<QAQCObservationOutput> qaqc;
	    private List<MicrobiologicalTestOutput> micro;
	    public void fromDto(physicalandchemicaltest dto , arfo2payload arfo2payload) {
	    	
	    	
		if (dto.getQaqc() != null) {
			arfo2payload.setAr_no(dto.getAr_no());
			arfo2payload.setSamplingDate(dto.getSamplingDate());
			arfo2payload.setTest_id(dto.getTest_id());
			arfo2payload.setTested_Date(dto.getTested_Date());
			arfo2payload.setSub_batch_no(dto.getSub_batch_no());
		       arfo2payload.setInternal_export(dto.getInternal_export());
		        arfo2payload.setFinishing(dto.getFinishing());
		        arfo2payload.setMixing(dto.getMixing());
		        arfo2payload.setRemarks(dto.getRemarks());
		        arfo2payload.setResult(dto.getResult());
		        arfo2payload.setProduct(dto.getProduct());
		        arfo2payload.setMaterial_passes(dto.getMaterial_passes());
		        arfo2payload.setFormat_no(dto.getFormat_no());
		        arfo2payload.setRef_sop_no(dto.getRef_sop_no());
		        arfo2payload.setRevision_no(dto.getRevision_no());
		        
		        arfo2payload.setTest_id(dto.getTest_id());
		        arfo2payload.setAr_no(dto.getAr_no());
		        arfo2payload.setSamplingDate(dto.getSamplingDate());
		        arfo2payload.setTested_Date(dto.getTested_Date());
		        arfo2payload.setSub_batch_no(dto.getSub_batch_no());
		        arfo2payload.setInternal_export(dto.getInternal_export());
		        arfo2payload.setFinishing(dto.getFinishing());
		        arfo2payload.setMixing(dto.getMixing());
		        arfo2payload.setRemarks(dto.getRemarks());
		        arfo2payload.setResult(dto.getResult());
		        arfo2payload.setProduct(dto.getProduct());
		        arfo2payload.setMaterial_passes(dto.getMaterial_passes());
		        arfo2payload.setFormat_no(dto.getFormat_no());
		        arfo2payload.setRef_sop_no(dto.getRef_sop_no());
		        arfo2payload.setRevision_no(dto.getRevision_no());

		        // Mapping newly added fields
		     
		        arfo2payload.setQc_sign(dto.getQc_sign());
		        arfo2payload.setChemist_status(dto.getChemist_status());
		        arfo2payload.setChemist_saved_on(dto.getChemist_saved_on());
		        arfo2payload.setChemist_saved_by(dto.getChemist_saved_by());
		        arfo2payload.setChemist_saved_id(dto.getChemist_saved_id());
		        arfo2payload.setChemist_submit_on(dto.getChemist_submit_on());
		        arfo2payload.setChemist_submit_by(dto.getChemist_submit_by());
		        arfo2payload.setChemist_submit_id(dto.getChemist_submit_id());
		        arfo2payload.setChemist_sign(dto.getChemist_sign());
		        arfo2payload.setMicro_status(dto.getMicro_status());
		        arfo2payload.setMICROBIOLOGIST_SAVED_on(dto.getMicrobiologist_saved_on());
		        arfo2payload.setMICROBIOLOGIST_SAVED_by(dto.getMicrobiologist_saved_by());
		        arfo2payload.setMICROBIOLOGIST_SAVED_id(dto.getMicrobiologist_saved_id());
		        arfo2payload.setMicro_submit_on(dto.getMicro_submit_on());
		        arfo2payload.setMicro_submit_by(dto.getMicro_submit_by());
		        arfo2payload.setMicro_submit_id(dto.getMicro_submit_id());
		        arfo2payload.setMicro_sign(dto.getMicro_sign());
		        arfo2payload.setQc_status(dto.getQc_status());
		        arfo2payload.setQc_submit_on(dto.getQc_submit_on());
		        arfo2payload.setQc_submit_by(dto.getQc_submit_by());
		        arfo2payload.setQc_submit_id(dto.getQc_submit_id());
		        arfo2payload.setPrepared_by(dto.getPrepared_by());

		    this.qaqc = dto.getQaqc().stream()
		            .map(qaqcDto -> {
		            	QAQCObservationOutput qaqc = new QAQCObservationOutput();
		                qaqc.setObs_id(qaqcDto.getObs_id());
		                qaqc.setTest_id(dto.getTest_id()); // Assuming test_id is the same for child

		                // Manually set each field
		                qaqc.setDescriptionObr(qaqcDto.getDescriptionObr());
		                qaqc.setDescriptionremark(qaqcDto.getDescriptionremark());
		                qaqc.setIdentificationObr(qaqcDto.getIdentificationObr());
		                qaqc.setIdentificationrmk(qaqcDto.getIdentificationrmk());
		                qaqc.setFibre_obs(qaqcDto.getFibre_obs());
		                qaqc.setFibre_rmk(qaqcDto.getFibre_rmk());
		                qaqc.setAcid_obs(qaqcDto.getAcid_obs());
		                qaqc.setACID_RMK(qaqcDto.getAcid_rmk());
		                qaqc.setSurface_obs(qaqcDto.getSurface_obs());
		                qaqc.setSurface_rmk(qaqcDto.getSurface_rmk());
		                qaqc.setForeign_obs(qaqcDto.getForeign_obs());
		                qaqc.setForeign_rmk(qaqcDto.getForeign_rmk());
		                qaqc.setFluorescence_obs(qaqcDto.getFluorescence_obs());
		                qaqc.setFluorescence_rmk(qaqcDto.getFluorescence_rmk());
		                qaqc.setNeps_obs(qaqcDto.getNeps_obs());
		                qaqc.setNeps_rmk(qaqcDto.getNeps_rmk());
		                qaqc.setNeps_count_obs(qaqcDto.getNeps_count_obs());
		                qaqc.setNeps_count_rmk(qaqcDto.getNeps_count_rmk());
		                qaqc.setUQL_w_obs(qaqcDto.getUQL_w_obs());
		                qaqc.setUQL_w_rmk(qaqcDto.getUQL_w_rmk());
		                qaqc.setLn_obs(qaqcDto.getLn_obs());
		                qaqc.setLn_rmk(qaqcDto.getLn_rmk());
		                qaqc.setLw_obs(qaqcDto.getLw_obs());
		                qaqc.setLw_rmk(qaqcDto.getLw_rmk());
		                qaqc.setSFC_n_obs(qaqcDto.getSFC_n_obs());
		                qaqc.setSFC_n_rmk(qaqcDto.getSFC_n_rmk());
		                qaqc.setSFC_w_obs(qaqcDto.getSFC_w_obs());
		                qaqc.setSFC_w_rmk(qaqcDto.getSFC_w_rmk());
		                qaqc.setMicronaire_obs(qaqcDto.getMicronaire_obs());
		                qaqc.setMicronaire_rmk(qaqcDto.getMicronaire_rmk());
		                qaqc.setWhiteness_obs(qaqcDto.getWhiteness_obs());
		                qaqc.setWhiteness_rmk(qaqcDto.getWhiteness_rmk());
		                qaqc.setExtractable_obs(qaqcDto.getExtractable_obs());
		                qaqc.setExtractable_rmk(qaqcDto.getExtractable_rmk());
		                qaqc.setAbs_1(qaqcDto.getAbs_1());
		                qaqc.setAbs_2(qaqcDto.getAbs_2());
		                qaqc.setAbs_3(qaqcDto.getAbs_3());
		                qaqc.setAbs_4(qaqcDto.getAbs_4());
		                qaqc.setAbs_5(qaqcDto.getAbs_5());
		                qaqc.setAbs_6(qaqcDto.getAbs_6());
		                qaqc.setAbs_avg(qaqcDto.getAbs_avg());
		                qaqc.setAbs_avg_2(qaqcDto.getAbs_avg_2());
		                qaqc.setRemark(qaqcDto.getRemark());
		                qaqc.setSulphatedFlWtObr(qaqcDto.getSulphatedFlWtObr());
		                qaqc.setSulphatedIlWtObr(qaqcDto.getSulphatedIlWtObr());
		                qaqc.setSulphatedBaObr(qaqcDto.getSulphatedBaObr());
		                qaqc.setSulphatedResObr(qaqcDto.getSulphatedResObr());
		                qaqc.setWatersolubleFlWtObr(qaqcDto.getWatersolubleFlWtObr());
		                qaqc.setWatersolubleIlWtObr(qaqcDto.getWatersolubleIlWtObr());
		                qaqc.setWatersolubleNmObr(qaqcDto.getWatersolubleNmObr());
		                qaqc.setWatersolubleResObr(qaqcDto.getWatersolubleResObr());
		                qaqc.setEthersolubleFlWtObr(qaqcDto.getEthersolubleFlWtObr());
		                qaqc.setEthersolubleIlWtObr(qaqcDto.getEthersolubleIlWtObr());
		                qaqc.setEthersolubleYxObr(qaqcDto.getEthersolubleYxObr());
		                qaqc.setEthersolubleResObr(qaqcDto.getEthersolubleResObr());
		                qaqc.setLossondryingFlWtObr(qaqcDto.getLossondryingFlWtObr());
		                qaqc.setLossondryingIlWtObr(qaqcDto.getLossondryingIlWtObr());
		                qaqc.setLossondryingKlObr(qaqcDto.getLossondryingKlObr());
		                qaqc.setLossondryingResObr(qaqcDto.getLossondryingResObr());
		                qaqc.setFinal_remark(qaqcDto.getFinal_remark());
		                qaqc.setSub_batch_no(qaqcDto.getSub_batch_no());
		                
		                return qaqc;
		            })
		            .collect(Collectors.toList());
		}
		arfo2payload.setQaqc(qaqc);

		if (dto.getMicro() != null) {
		    this.micro = dto.getMicro().stream()
		            .map(microDto -> {
		            	MicrobiologicalTestOutput microTest = new MicrobiologicalTestOutput();
		                microTest.setMicro_id(microDto.getMicro_id());
		                microTest.setTest_id(dto.getTest_id()); // Assuming test_id is the same for child
		                microTest.setSampled_on(microDto.getSampled_on());
		                microTest.setTested(microDto.getTested());
		                microTest.setTf_count(microDto.getTf_count());
		                microTest.setTf_viable_count(microDto.getTf_viable_count());
		                microTest.setP_field_a(microDto.getP_field_a());
		                microTest.setP_field_b(microDto.getP_field_b());
		                microTest.setP_field_c(microDto.getP_field_c());
		                microTest.setP_field_d(microDto.getP_field_d());
		                microTest.setP_field_e(microDto.getP_field_e());
		                microTest.setMoisture(microDto.getMoisture());
		                microTest.setSub_batch_no(microDto.getSub_batch_no());
		                microTest.setCompletion_date(microDto.getCompletion_date());
		                microTest.setRemarks(microDto.getRemarks());
		                microTest.setProduct(microDto.getProduct());
		                microTest.setMicro_id(microTest.getMicro_id());
		                microTest.setTest_id(microTest.getTest_id());

		                return microTest;
		            })
		            .collect(Collectors.toList());
		}
		arfo2payload.setMicro(micro);
	    }
	    

	

}
