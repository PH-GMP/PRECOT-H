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

import com.focusr.Precot.mssql.database.model.SaveSubmitSupervisorHod;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_HISTORY_F004",schema=AppConstants.schema)
public class DailyProdPackingDetailsHistoryF004 extends SaveSubmitSupervisorHod{

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
	private String unit ;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@OneToMany(targetEntity = DailyProdPackingDetailsLineHistoryF004.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<DailyProdPackingDetailsLineHistoryF004> details;
	
	@Column(name = "NO_OF_CARTON_PACKED")
	private String noOfCartonPacked;
	
	@Column(name = "NO_OF_BAGS_PACKED")
	private String noOfBagsPacked;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
	
}
