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
@Table(name = "GSM_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class GsmProdDevF001  {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "GSM_SPEC")
    private String gsmSpec; 
	
	@Column(name = "PARAMETER")
    private String parameter;
    
    @Column(name = "GSM_TOLERENCE_LIMIT")
    private String gsmTolerenceLimit; 
    
    @Column(name = "GSM_TOLERENCE_MIN")
    private String gsmTolerenceMin; 
    
    @Column(name = "GSM_TOLERENCE_MAX")
    private String gsmTolerenceMax;
    
   
    
    @Column(name = "PARENT_ID")
    private Long parentId;
	 
    
    //maped to ProductDevelopmentSheetF001 parent table 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevGsm;
    
   

	 
}
