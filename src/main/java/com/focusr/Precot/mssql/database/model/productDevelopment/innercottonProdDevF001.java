package com.focusr.Precot.mssql.database.model.productDevelopment;

import java.util.List;

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
@Table(name = "INNER_COTTON_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class innercottonProdDevF001 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
    
    @Column(name = "PARENT_ID")
    private Long parentId;
    
    @Column(name = "PARAMETER")
    private String parameter;
    
//    @Column(name = "INNER_CARTON_TYPE")
//    private String innercartonType;
//
//    @Column(name = "INNER_DIMENSION_OUTER_MM")
//    private String innerdimensionOuterMm;
//
//    @Column(name = "INNER_NO_OF_PLY")
//    private String innernumberOfPly;
//    
//    @Column(name = "INNER_FLUTE")
//    private String innerflute;
//    
//    @Column(name = "INNER_BURSTING_STRENGHT")
//    private String innerburstingstrenght;
    
    @Column(name = "INNER_BOARD_GSM")
    private String innerboardgsm;
    
    
    //maped to ProductDevelopmentSheetF001 parent table 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevinnercotton;

}
