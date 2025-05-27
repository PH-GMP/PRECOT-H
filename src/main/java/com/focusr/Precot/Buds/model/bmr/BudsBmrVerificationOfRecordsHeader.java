package com.focusr.Precot.Buds.model.bmr;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_BMR_VERIFICATION_OF_RECORDS_HEADER", schema = AppConstants.schema)
public class BudsBmrVerificationOfRecordsHeader  extends SpunlaceSummerySubmit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@OneToMany(mappedBy = "verificationRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BudsBmrVerificationOfRecordsLine> details;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public List<BudsBmrVerificationOfRecordsLine> getDetails() {
		return details;
	}

	public void setDetails(List<BudsBmrVerificationOfRecordsLine> details) {
		this.details = details;
	}
	
	
	
}
