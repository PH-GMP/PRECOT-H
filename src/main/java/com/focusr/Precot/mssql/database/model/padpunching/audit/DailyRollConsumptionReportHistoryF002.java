package com.focusr.Precot.mssql.database.model.padpunching.audit;

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
import com.focusr.Precot.mssql.database.model.SaveSubmitOperatorSupervisorHod;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_HISTORY_F002", schema = AppConstants.schema)
public class DailyRollConsumptionReportHistoryF002 extends SaveSubmitOperatorSupervisorHod{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long historyId;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "MACHINE_NAME")
	private String machineName;
	
	@OneToMany(targetEntity = MachineDetailsHistoryF002.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<MachineDetailsHistoryF002> machineDetails;

	@OneToMany(targetEntity = RollConsumptionDetailsHistoryF002.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<RollConsumptionDetailsHistoryF002> rollConsumptionDetails;

	@OneToMany(targetEntity = StoppageDetailsHistoryF002.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<StoppageDetailsHistoryF002> stoppageDetails;

	@Column(name = "PRODUCTION_DETAILS_IN_BAGS")
	private String prodDetailsInBags;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;

}
