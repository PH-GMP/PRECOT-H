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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Data
@Entity
@Table(name = "SLIP_SHEET_SPECTIFICATION_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class slipsheetSpecificationsProdDevF001 {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
    @Column(name = "PARENT_ID")
    private Long parentId;
	
    @Column(name = "PARAMETER")
    private String parameter;
    
    
//    @Column(name = "LENGTH")
//    private String length;
//
//    @Column(name = "WIDTH")
//    private String width;
//
//    @Column(name = "THICKNESS")
//    private String thickness;

    @Column(name = "PULL_SIDE")
    private String pullSide;

    
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevslipsheetSpecifications;
    

}
