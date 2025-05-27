package com.focusr.Precot.mssql.database.model.QcAudit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "OBERVATION_CLF007_HISTORY", schema = AppConstants.schema)
public class obervationHistoryCLF007 extends UserDateAudit{
	
	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id;
	   
	   @Column(name = "S_NO")
	   private String s_no;
	   
	   @Column(name = "STANDARD_WEIGHT")
	   private String standard_weight;
	   
	   @Column(name = "TEST_LOV")
	   private String test_lov;
	   
	   @Column(name = "NUMBER_A")
	   private String number_a;
	   
	   @Column(name = "NUMBER_B")
	   private String number_b;
	   
	   @Column(name = "REMARK")
		private String remark;
	   
	   @Column(name = "STATUS")
		private String status;
	   
	   @Column(name = "CALIBRATED_BY")
		private String calibrated_by;
	   
	   @Column(name = "VERIFIED_BY")
		private String verified_by;
	   
	   @Column(name = "LAB_ID")
	    private Long lab_id;
	
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LAB_ID", insertable = false, updatable = false)
	@JsonIgnore
	private weighingscalecalibrationreportHistoryCLF007 weighingscalecalibrationreportCLF007;

}
