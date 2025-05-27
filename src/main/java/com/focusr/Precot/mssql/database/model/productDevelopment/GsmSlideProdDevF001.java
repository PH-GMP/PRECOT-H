package com.focusr.Precot.mssql.database.model.productDevelopment;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.mssql.database.model.Qc.QcDistilledWaterAnalysisReportARF012;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Data
@Entity
@Table(name = "GSM_SLIDE_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class GsmSlideProdDevF001  {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
    @Column(name = "PARENT_ID")
    private Long parentId;
	
	
    @Column(name = "PARAMETER")
    private String parameter;
	
	@Column(name = "GSM_PATTERN_SIDE_1_SPECIFICATION")
	private String gsmPatternSide1Specification;

	@Column(name = "GSM_PATTERN_SIDE_1_TOLERANCE")
	private String gsmPatternSide1Tolerance;

	@Column(name = "GSM_PATTERN_SIDE_1_SLIDE_PARAMETER")
	private String gsmPatternSide1SlideParameter;


	@Column(name = "GSM_PATTERN_SIDE_2_SPECIFICATION")
	private String gsmPatternSide2Specification;

	@Column(name = "GSM_PATTERN_SIDE_2_TOLERANCE")
	private String gsmPatternSide2Tolerance;

	@Column(name = "GSM_PATTERN_SIDE_2_SLIDE_PARAMETER")
	private String gsmPatternSide2SlideParameter;


   
	 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productGsmSlide;
    


	 
}
