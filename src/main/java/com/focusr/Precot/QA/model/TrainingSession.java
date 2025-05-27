package com.focusr.Precot.QA.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;
import lombok.Data;

@Data
@Entity
@Table(name = "QA_TRAINING_SESSION", schema = AppConstants.schema)
public class TrainingSession extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SESSION_ID")
	private Long sessionId;
	
	@Column(name = "TRAINING_TOPIC")
	private String trainingTopic;
	
	@Column(name = "JANUARY_PLAN")
	private String januaryPlan;

	@Column(name = "JANUARY_ACTUAL")
	private String januaryActual;

	@Column(name = "FEBRAUARY_PLAN")
	private String februaryPlan;

	@Column(name = "FEBRAUARY_ACTUAL")
	private String februaryActual;

	@Column(name = "MARCH_PLAN")
	private String marchPlan;

	@Column(name = "MARCH_ACTUAL")
	private String marchActual;

	@Column(name = "APRIL_PLAN")
	private String aprilPlan;

	@Column(name = "APRIL_ACTUAL")
	private String aprilActual;

	@Column(name = "MAY_PLAN")
	private String mayPlan;

	@Column(name = "MAY_ACTUAL")
	private String mayActual;

	@Column(name = "JUNE_PLAN")
	private String junePlan;

	@Column(name = "JUNE_ACTUAL")
	private String juneActual;

	@Column(name = "JULY_PLAN")
	private String julyPlan;

	@Column(name = "JULY_ACTUAL")
	private String julyActual;

	@Column(name = "AUGUST_PLAN")
	private String augustPlan;

	@Column(name = "AUGUST_ACTUAL")
	private String augustActual;

	@Column(name = "SEPTEMBER_PLAN")
	private String septemberPlan;

	@Column(name = "SEPTEMBER_ACTUAL")
	private String septemberActual;

	@Column(name = "OCTOBER_PLAN")
	private String octoberPlan;

	@Column(name = "OCTOBER_ACTUAL")
	private String octoberActual;

	@Column(name = "NOVEMBER_PLAN")
	private String novemberPlan;

	@Column(name = "NOVEMBER_ACTUAL")
	private String novemberActual;

	@Column(name = "DECEMBER_PLAN")
	private String decemberPlan;

	@Column(name = "DECEMBER_ACTUAL")
	private String decemberActual;

	@Column(name = "CALENDAR_ID")
	private Long calendarId;
}
