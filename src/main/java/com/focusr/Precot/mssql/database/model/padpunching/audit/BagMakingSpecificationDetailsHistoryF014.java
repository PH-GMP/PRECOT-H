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

import com.focusr.Precot.mssql.database.model.SaveSubmitOperatorHod;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_HISTORY_F014", schema = AppConstants.schema)
public class BagMakingSpecificationDetailsHistoryF014 extends SaveSubmitOperatorHod {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

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

	// PRODUCT & MACHINE DETAILS
	@Column(name = "MACHINE_NAME")
	private String machineName;

	@Column(name = "PRODUCT_NAME")
	private String productName;

	@OneToMany(targetEntity = ProcessProductControlDetailsLineHistoryF014.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<ProcessProductControlDetailsLineHistoryF014> details;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "VERSION")
	private int version;
}
