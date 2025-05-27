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
@Table(name = "SECONDARY_PACKING_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class secondaryPackingDetailsProdDevF001 {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
    
    @Column(name = "PARENT_ID")
    private Long parentId;
    
    @Column(name = "PACKING_DETAILS")
    private String packingDetails;

    @Column(name = "FILM_TYPE")
    private String filmType;

    @Column(name = "FILM_THICKNESS_MICRON")
    private String filmThicknessMicron;

    @Column(name = "FILM_THICKNESS_MICRON_LIMIT")
    private String filmThicknessMicronLimit;

    @Column(name = "FILM_THICKNESS_MICRON_MIN")
    private String filmThicknessMicronMin;

    @Column(name = "FILM_THICKNESS_MICRON_MAX")
    private String filmThicknessMicronMax;

    @Column(name = "BAG_TYPE")
    private String bagType;

    @Column(name = "BAG_DIMENSION")
    private String bagDimension;
    
    
    
    //maped to ProductDevelopmentSheetF001 parent table 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevSecondaryPacking;

}
