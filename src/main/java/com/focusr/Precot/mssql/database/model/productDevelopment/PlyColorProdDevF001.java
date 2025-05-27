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
@Table(name = "PLY_COTTON_PROD_DEVF001",schema = AppConstantsproductdevelopment.schema)
public class PlyColorProdDevF001 {

	
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id;

	    @Column(name = "COLOR_NAME")
	    private String colorName;

	    @Column(name = "PARENT_ID")
	    private Long parentId;
	
	
	@Column(name = "PLY_COLOR_1")
    private String plycolor1;
    
    @Column(name = "PLY_COLOR_2")
    private String plycolor2;
    
    @Column(name = "PLY_COLOR_3")
    private String plycolor3;
    
    
    // Many-to-One relationship with outercottonProdDevF001
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private ProductDevelopmentSheetF001 productDevplyColor;
}


