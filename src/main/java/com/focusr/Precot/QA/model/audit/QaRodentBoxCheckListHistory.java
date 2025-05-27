package com.focusr.Precot.QA.model.audit;

import java.util.Date;
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

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_RODENT_BOX_CHECK_LIST_HISTORY", schema = AppConstants.schema)
public class QaRodentBoxCheckListHistory extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long history_id;

	@Column(name = "FORMAT_NAME")
	private String format_name;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REVISION_NO")
	private Long revision_no;

	@Column(name = "REF_SOP_NO")
	private String sop_number;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FREQUENCY")
	private String frequency;

	@Column(name = "DATE")
	private String date;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "REMARKS")
	private String remarks;

	// PCI
	@Column(name = "PCI_STATUS")
	private String pci_status;

	@Column(name = "PCI_SUBMIT_ON")
	private Date pci_submit_on;

	@Column(name = "PCI_SUBMIT_BY")
	private String pci_submit_by;

	@Column(name = "PCI_SUBMIT_ID")
	private Long pci_submit_id;

	@Column(name = "PCI_SIGN")
	private String pci_sign;

	// QA_MR
	@Column(name = "QA_MR_STATUS")
	private String qa_mr_status;

	@Column(name = "QA_MR_SUBMIT_ON")
	private Date qa_mr_submit_on;

	@Column(name = "QA_MR_SUBMIT_BY")
	private String qa_mr_submit_by;

	@Column(name = "QA_MR_SUBMIT_ID")
	private Long qa_mr_submit_id;

	@Column(name = "QA_MR_SIGN")
	private String qa_mr_sign;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
	
	@OneToMany(targetEntity = QaRodentBoxDetailsHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<QaRodentBoxDetailsHistory> details;

}
