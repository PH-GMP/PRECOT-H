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
@Table(name = "PACKING_DETAILS_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class packingDetailsProdDevF001 {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
    
    @Column(name = "PARENT_ID")
    private Long parentId;
    
    @Column(name = "PARAMETER")
    private String parameter;
    
    
//    @Column(name = "INNER_BAG")
//    private String innerbag;
//    
//    @Column(name = "OUTER_BAG")
//    private String outerbag;
//    
//    @Column(name = "INNER_CARTON")
//    private String innercarton;
//    
//    @Column(name = "OUTER_CARTON")
//    private String outercarton;
    
    @Column(name = "BOPP_TAPE")
    private String bopptape;
    
    
    
  //maped to ProductDevelopmentSheetF001 parent table 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevPacking;

}
