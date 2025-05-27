package com.focusr.Precot.mssql.database.model.Qc;

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
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QC_RAW_COTTON_CONSOLIDATED_DETAILS", schema = AppConstants.schema)
public class Qc_RawCottenConsolidatedDetails extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "AR_NO")
	private Long arNo;
	
	@Column(name = "DATE_OF_RECEIPT")
	private String dateOfReceipt;
	
	@Column(name = "TESTED_DATE")
	private String testedDate;
	
	@Column(name = "MB_NO")
	private String mbNo;
	
	@Column(name = "SUPPLIER")
	private String supplier;
	
	@Column(name = "STATION")
	private String station;

	@Column(name = "VERITY")
	private String verity; 
	
	@Column(name = "INVOICE_NO")
	private String invoiceNo;
	
	@Column(name = "NO_OF_BALE")
	private String noOfBale;

	@Column(name = "QUANTITY")
	private String quantity;
	
	@Column(name = "FLOURESCENCE")
	private String flourescence;
	
	@Column(name = "WHITENESS")
	private Double whiteness;
	
	@Column(name = "MICRONAIRE")
	private Double micronaire;
	
	@Column(name = "NEPS_COUNT")
	private Double nepsCount;
	
	@Column(name = "UQL")
	private Double uql;
	
	@Column(name = "LENGTH_BY_WEIGHT_MM")
	private Double lengthByWeightMm;
	
	@Column(name = "LENGTH_BY_NO_MM")
	private Double lengthByNoMm;
	
	@Column(name = "SFC_W")
	private String sfc_w;
	
	@Column(name = "SFC_N")
	private String sfc_n;
	
	@Column(name = "ASH")
	private Double ash;
	
	@Column(name = "ESS_EXT")
	private Double ess_ext;
	
	@Column(name = "MOISTURE")
	private Double moisture;
	
	@Column(name = "TRASH")
	private Double trash;

	@Column(name = "REMARK")
	private String remark;
	
	 @Column(name = "PARENT_ID")
    private Long parentId;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private Qc_RawCottenConsolidatedAnalyticalReportF004 rawCottenConsolidatedAnalyticalReportF004;
	
}	