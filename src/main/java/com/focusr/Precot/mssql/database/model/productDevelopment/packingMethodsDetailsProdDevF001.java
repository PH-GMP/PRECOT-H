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
@Table(name = "PACKING_METHOD_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class packingMethodsDetailsProdDevF001 {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
    
    @Column(name = "PARENT_ID")
    private Long parentId;
    
    
//    @Column(name = "ALIGNMENT_OF_INNER_CARTON")
//    private String alighmentofinnercarton;
//    
//    @Column(name = "ORIENTATION_OF_INNER_CARTON")
//    private String orienatationofinnercarton;
//    
//    @Column(name = "ALIGNMENT_OF_PACKS")
//    private String alighmentofpacks;
    
    @Column(name = "ORIENTATION_OF_PACKS")
    private String orientationofpacks;
    
    @Column(name = "PARAMETER")
    private String parameter;
    
    @Column(name = "PARAMETER_VALUE")
    private String parameterValue;
    
    
    //maped to ProductDevelopmentSheetF001 parent table 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevPackingMethods;


}
