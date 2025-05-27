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
@Table(name = "CARTON_SLIP_SHEET_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class CartonsperSlipSheetProdDevF001 {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
    @Column(name = "PARENT_ID")
    private Long parentId;
	
    @Column(name = "PARAMETER")
    private String parameter;
    
    
//    @Column(name = "LENGTH_WISE")
//    private String lengthWise;
//
//    @Column(name = "WIDTH_WISE")
//    private String widthWise;

    @Column(name = "HEIGHT_WISE")
    private String heightWise;
    
//    
//    @Column(name = "LENGTH_WISE_DIMENSION")
//    private String lengthWiseDimension;
//
//    @Column(name = "WIDTH_WISE_DIMENSION")
//    private String widthWiseDimension;

    @Column(name = "HEIGHT_WISE_DIMENSION")
    private String heightWiseDimension;


//    @Column(name = "TOTAL")
//    private String total;
    
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevCartonsperSlipSheet;

}
