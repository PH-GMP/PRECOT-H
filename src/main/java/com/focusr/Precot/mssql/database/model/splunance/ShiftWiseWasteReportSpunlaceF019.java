package com.focusr.Precot.mssql.database.model.splunance;

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

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_F019", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "SHIFT" }) })
public class ShiftWiseWasteReportSpunlaceF019 extends SpunlaceSaveSumbitSupervisor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REPORT_ID")
	private Long reportId;
	
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
	
	@OneToMany(targetEntity = ShiftWiseWasteReportDetailsF019.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "REPORT_ID", referencedColumnName = "REPORT_ID")
	private List<ShiftWiseWasteReportDetailsF019> reportDetails;

	@Column(name = "COMPACTOR_WASTE_NO_OF_BAGS_SUM")
	private Long compactorWasteNoOfBagsSum;
	
	@Column(name = "COMPACTOR_WASTE_NET_WEIGHT_SUM")
	private Double compactorWasteNWtSum;
	
	@Column(name = "SWWS_WASTE_NO_OF_BAGS_SUM")
	private Long swwsWasteNoOfBagsSum;
	
	@Column(name = "SWWS_WASTE_NET_WEIGHT_SUM")
	private Double swwsWasteNWtSum;
	
	@Column(name = "SWWS_WASTE_TOTAL_WEIGHT_SUM")
	private Double swwsWasteTotalWtSum;
	
	@Column(name = "EXFOLATING_WASTE_NO_OF_BAGS_SUM")
	private Long exfolatingWasteNoOfBagsSum;
	
	@Column(name = "EXFOLATING_WASTE_NET_WEIGHT_SUM")
	private Double exfolatingWasteNWtSum;
	
	@Column(name = "REASON")
	private String reason;
}
