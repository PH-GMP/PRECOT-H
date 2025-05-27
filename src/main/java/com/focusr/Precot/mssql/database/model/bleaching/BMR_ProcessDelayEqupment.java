package com.focusr.Precot.mssql.database.model.bleaching;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "BMR_PROCESS_DELAY_EQUP", schema = AppConstants.schema)
public class BMR_ProcessDelayEqupment extends UserDateAudit {

	@Column(name = "PROCESS_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long process_id;

	@Column(name = "BMR_NO")
	private String bmr_no;
	
	@Column(name = "STATUS")
	private String status;
 
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "delayDetails", orphanRemoval = true)
	private List<BMR_ProcessDelayEqupmentLine> details;

}
