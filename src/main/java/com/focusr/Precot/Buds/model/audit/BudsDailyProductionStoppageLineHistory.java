package com.focusr.Precot.Buds.model.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.Buds.model.BudsDailyProductionSliverHeader;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BUDS_DAILY_PRODUCTION_STOPPAGE_LINE_HISTORY", schema = AppConstants.schema)
public class BudsDailyProductionStoppageLineHistory extends UserDateAudit{

	@Column(name = "STOPPAGE_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long stoppageId;
	
	@Column(name = "NATURE_OF_PROBLEM")
	private String problemNature;
	
	@Column(name = "STOP_TIME")
	private String stopTime;
	
	@Column(name = "RESTART_TIME")
	private String restartTime;
	
	@Column(name = "IDLE_TIME")
	private String idleTime;
	
	// MAPPINGS
	
//	@ManyToOne
//    @JoinColumn(name = "ID", nullable = false)
//	@JsonIgnore
//    private BudsDailyProductionSliverHeaderHistory stoppage;
	
	@Column(name = "ID")
	private Long id;
	
	// GETTERS AND SETTERS

	public Long getStoppageId() {
		return stoppageId;
	}

	public void setStoppageId(Long stoppageId) {
		this.stoppageId = stoppageId;
	}

	public String getProblemNature() {
		return problemNature;
	}

	public void setProblemNature(String problemNature) {
		this.problemNature = problemNature;
	}

	public String getStopTime() {
		return stopTime;
	}

	public void setStopTime(String stopTime) {
		this.stopTime = stopTime;
	}

	public String getRestartTime() {
		return restartTime;
	}

	public void setRestartTime(String restartTime) {
		this.restartTime = restartTime;
	}

	public String getIdleTime() {
		return idleTime;
	}

	public void setIdleTime(String idleTime) {
		this.idleTime = idleTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	

	
}
