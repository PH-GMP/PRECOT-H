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
@Table(name = "QA_AGENDA_FOR_MANAGEMENT_TOPICS_LINES_HISTORY", schema = AppConstants.schema)
public class AgendaTopicsLinesHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "TOPICS", length = 1000)
	private String topics;
	
	@Column(name = "PRESENTED_BY")
	private String presentedBy;
	
	@Column(name = "TIME_ALLOTED")
	private String timeAlloted;
	
	@Column(name = "HISTORY_ID")
	private Long historyId;
}
