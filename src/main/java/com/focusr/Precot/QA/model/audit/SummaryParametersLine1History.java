package com.focusr.Precot.QA.model.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "QA_SUMMARY_PARAMETER_LINE_1_HISTORY", schema = AppConstants.schema)
public class SummaryParametersLine1History {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "PARAMETER_VALUES")
	private String parameterValues;
	
	@Column(name = "MAXIMUM_VALUE")
	private String maximumValue;
	
	@Column(name = "MINIMUM_VALUE")
	private String minimumValue;
	
	@Column(name = "AVERAGE")
	private String average;
	
	@Column(name = "STD")
	private String std;
	
	@Column(name = "CPK")
	private String cpk;
	
	@Column(name = "HISTORY_ID")
	private Long historyId;
}
