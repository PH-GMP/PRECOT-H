package com.focusr.Precot.mssql.database.model.bleaching.lov;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name ="PH_BASED_SUPPLIER_LIST",schema=AppConstants.schema)
public class PhBasedSupplier {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
	private Long id;
	
	@Column(name = "PH_NO")
	private String phNo;
	
	@Column(name = "SUPPLIER_NAME")
	private String supplierName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPhNo() {
		return phNo;
	}

	public void setPhNo(String phNo) {
		this.phNo = phNo;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public PhBasedSupplier() {
		super();
	}

	public PhBasedSupplier(Long id, String phNo, String supplierName) {
		super();
		this.id = id;
		this.phNo = phNo;
		this.supplierName = supplierName;
	}

	@Override
	public String toString() {
		return "PhBasedSupplier [id=" + id + ", phNo=" + phNo + ", supplierName=" + supplierName + "]";
	}
	
	
}
