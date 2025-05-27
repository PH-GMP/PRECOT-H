package com.focusr.Precot.mssql.database.model.bleaching;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BMR_SUMMARY",schema=AppConstants.schema, uniqueConstraints = {@UniqueConstraint(columnNames = {"bmr_no", "date"})})
public class BmrSummary extends UserDateAudit {

	@Column(name = "ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "BMR_NO")
	private String bmr_no;

	@Column(name = "DATE")
	private String date;
	
	@Column(name = "STATUS")
	private String status;
	
	@OneToMany(targetEntity = ChemicalDetails_BMR.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<ChemicalDetails_BMR> chemicalDetails;
	
	@OneToMany(targetEntity = PackingDetails_BMR.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<PackingDetails_BMR> packingDetails;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getBmr_no() {
		return bmr_no;
	}

	public void setBmr_no(String bmr_no) {
		this.bmr_no = bmr_no;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public List<ChemicalDetails_BMR> getChemicalDetails() {
		return chemicalDetails;
	}

	public void setChemicalDetails(List<ChemicalDetails_BMR> chemicalDetails) {
		this.chemicalDetails = chemicalDetails;
	}

	public List<PackingDetails_BMR> getPackingDetails() {
		return packingDetails;
	}

	public void setPackingDetails(List<PackingDetails_BMR> packingDetails) {
		this.packingDetails = packingDetails;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	
	
	
}
