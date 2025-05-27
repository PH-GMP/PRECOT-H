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
@Table(name = "SKU_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class SkuProdDevF001 {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	
	
    
    @Column(name = "PARENT_ID")
    private Long parentId;
    
    
	
	
	
//	  @Column(name = "WT_INNER_EMPTY_BAG")
//	    private String weightInnerEmptyBag;
//
//	    @Column(name = "WT_INNER_EMPTY_BAG_MIN")
//	    private String weightInnerEmptyBagMin;
//
//	    @Column(name = "WT_INNER_EMPTY_BAG_MAX")
//	    private String weightInnerEmptyBagMax;
//
//	    @Column(name = "WT_INNER_EMPTY_BAG_LIMIT")
//	    private String weightInnerEmptyBagLimit;
//
//	    // Weight of Outer Empty Bag
//	    @Column(name = "WT_OUTER_EMPTY_BAG")
//	    private String weightOuterEmptyBag;
//
//	    @Column(name = "WT_OUTER_EMPTY_BAG_MIN")
//	    private String weightOuterEmptyBagMin;
//
//	    @Column(name = "WT_OUTER_EMPTY_BAG_MAX")
//	    private String weightOuterEmptyBagMax;
//
//	    @Column(name = "WT_OUTER_EMPTY_BAG_LIMIT")
//	    private String weightOuterEmptyBagLimit;
//
//	    // Weight of Empty Inner Carton
//	    @Column(name = "WT_EMPTY_INNER_CARTON")
//	    private String weightEmptyInnerCarton;
//
//	    @Column(name = "WT_EMPTY_INNER_CARTON_MIN")
//	    private String weightEmptyInnerCartonMin;
//
//	    @Column(name = "WT_EMPTY_INNER_CARTON_MAX")
//	    private String weightEmptyInnerCartonMax;
//
//	    @Column(name = "WT_EMPTY_INNER_CARTON_LIMIT")
//	    private String weightEmptyInnerCartonLimit;
//
//	    // Weight of Empty Outer Carton
//	    @Column(name = "WT_EMPTY_OUTER_CARTON")
//	    private String weightEmptyOuterCarton;
//
//	    @Column(name = "WT_EMPTY_OUTER_CARTON_MIN")
//	    private String weightEmptyOuterCartonMin;
//
//	    @Column(name = "WT_EMPTY_OUTER_CARTON_MAX")
//	    private String weightEmptyOuterCartonMax;
//
//	    @Column(name = "WT_EMPTY_OUTER_CARTON_LIMIT")
//	    private String weightEmptyOuterCartonLimit;
//
//	    // Net Weight of Filled Pack
//	    @Column(name = "NET_WT_FILLED_PACK")
//	    private String netWtFilledPack;
//
//	    @Column(name = "NET_WT_FILLED_PACK_MIN")
//	    private String netWtFilledPackMin;
//
//	    @Column(name = "NET_WT_FILLED_PACK_MAX")
//	    private String netWtFilledPackMax;
//
//	    @Column(name = "NET_WT_FILLED_PACK_LIMIT")
//	    private String netWtFilledPackLimit;
//
//	    // Gross Weight of Filled Pack
//	    @Column(name = "GROSS_WT_FILLED_PACK")
//	    private String grossWtFilledPack;
//
//	    @Column(name = "GROSS_WT_FILLED_PACK_MIN")
//	    private String grossWtFilledPackMin;
//
//	    @Column(name = "GROSS_WT_FILLED_PACK_MAX")
//	    private String grossWtFilledPackMax;
//
//	    @Column(name = "GROSS_WT_FILLED_PACK_LIMIT")
//	    private String grossWtFilledPackLimit;
//
//	    // Net Weight of Filled Inner Carton
//	    @Column(name = "NET_WT_FILLED_INNER_CARTON")
//	    private String netWtFilledInnerCarton;
//
//	    @Column(name = "NET_WT_FILLED_INNER_CARTON_MIN")
//	    private String netWtFilledInnerCartonMin;
//
//	    @Column(name = "NET_WT_FILLED_INNER_CARTON_MAX")
//	    private String netWtFilledInnerCartonMax;
//
//	    @Column(name = "NET_WT_FILLED_INNER_CARTON_LIMIT")
//	    private String netWtFilledInnerCartonLimit;
//
//	    // Gross Weight of Filled Inner Carton
//	    @Column(name = "GROSS_WT_FILLED_INNER_CARTON")
//	    private String grossWtFilledInnerCarton;
//
//	    @Column(name = "GROSS_WT_FILLED_INNER_CARTON_MIN")
//	    private String grossWtFilledInnerCartonMin;
//
//	    @Column(name = "GROSS_WT_FILLED_INNER_CARTON_MAX")
//	    private String grossWtFilledInnerCartonMax;
//
//	    @Column(name = "GROSS_WT_FILLED_INNER_CARTON_LIMIT")
//	    private String grossWtFilledInnerCartonLimit;
//
//	    // Net Weight of Filled Outer Carton
//	    @Column(name = "NET_WT_FILLED_OUTER_CARTON")
//	    private String netWtFilledOuterCarton;
//
//	    @Column(name = "NET_WT_FILLED_OUTER_CARTON_MIN")
//	    private String netWtFilledOuterCartonMin;
//
//	    @Column(name = "NET_WT_FILLED_OUTER_CARTON_MAX")
//	    private String netWtFilledOuterCartonMax;
//
//	    @Column(name = "NET_WT_FILLED_OUTER_CARTON_LIMIT")
//	    private String netWtFilledOuterCartonLimit;

	    // Gross Weight of Filled Outer Carton
	    @Column(name = "GROSS_WT_FILLED_OUTER_CARTON")
	    private String grossWtFilledOuterCarton;

	    @Column(name = "GROSS_WT_FILLED_OUTER_CARTON_MIN")
	    private String grossWtFilledOuterCartonMin;

	    @Column(name = "GROSS_WT_FILLED_OUTER_CARTON_MAX")
	    private String grossWtFilledOuterCartonMax;

	    @Column(name = "GROSS_WT_FILLED_OUTER_CARTON_LIMIT")
	    private String grossWtFilledOuterCartonLimit;
	    
	    @Column(name = "PARAMETER")
	    private String parameter;
	    
	    
	    
	    
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
	    @JsonIgnore
	    private ProductDevelopmentSheetF001 productDevSKU;

}
