package com.focusr.Precot.mssql.database.model.productDevelopment;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Entity
@Table(name = "PRODUCT_DEVELOPMENT_SHEET_IMAGE",schema = AppConstantsproductdevelopment.schema, uniqueConstraints = {
        @UniqueConstraint(columnNames = {"PDS_NO"})
})
@Data
public class ProductDevelopmentLob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "PDS_NO")
    private String pdsNo;

    @Lob
    @Column(name = "INNER_FILM_I")
    private byte[] innerFilmI;

    @Lob
    @Column(name = "OUTER_FILM_II")
    private byte[] outerFilmII;

    @Lob
    @Column(name = "INNER_CARTON_III")
    private byte[] innerCartonIII;

    @Lob
    @Column(name = "OUTER_CARTON_IV")
    private byte[] outerCartonIV;
    
    @Lob
    @Column(name = "SLIP_SHEET")
    private byte[] slipSheet;
    
 

 
}

