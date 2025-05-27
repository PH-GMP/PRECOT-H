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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Data
@Entity
@Table(name = "OUTER_COTTON_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class outercottonProdDevF001 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
    
    @Column(name = "PARENT_ID")
    private Long parentId;
    
    
    @Column(name = "PARAMETER")
    private String parameter;
    
    
//    @Column(name = "OUTER_CARTON_TYPE")
//    private String outercartonname;
    
    @Column(name = "BOARD_GSM")
    private String boardgsm ;
    
//    @Column(name = "DIMENSION_OUTER_MM")
//    private String outerdimensionOuterMm;
//
//    @Column(name = "NO_OF_PLY")
//    private String outernumberOfPly;
//    
//    @Column(name = "FLUTE")
//    private String outerflute;
//    
//    @Column(name = "BURSTING_STRENGHT")
//    private String outerburstingstrenght;
//    
//    @Column(name = "OUTER_BOARD_GSM")
//    private String outerboardgsm;
    
    
    
    
//    // One-to-Many relationship with PlyColorProdDevF001
//    @OneToMany( cascade = CascadeType.ALL,mappedBy = "outerCottonProd")
//    private List<PlyColorProdDevF001> plyColors;
    
    
    //maped to ProductDevelopmentSheetF001 parent table 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevoutercotton;
    
    
    
    
    
    

}
