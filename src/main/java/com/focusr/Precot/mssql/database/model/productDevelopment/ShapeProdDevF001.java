package com.focusr.Precot.mssql.database.model.productDevelopment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.mssql.database.model.Qc.QcDistilledWaterAnalysisReportARF012;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Data
@Entity
@Table(name = "SHAPE_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class ShapeProdDevF001 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "PARAMETER")
    private String parameter;
	
	@Column(name = "SHAPE_SPEC")
    private String productsizeSpec;
    
    @Column(name = "SHAPE_TOLERENCE")
    private String productsizeTolerence; 
    
    @Column(name = "PARENT_ID")
    private Long parentId;
	 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevelopmentSheetF001;

	 
}
