package com.focusr.Precot.mssql.database.model.Qc;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "WIRA_FIBER_DETAILS", schema = AppConstants.schema)
public class WiraFiberDetails extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

	@Column(name = "REF_COTTON_MICRO_VALUE")
	private Long refCottonMicroValue;

	@Column(name = "OBSR")
	private Long obsr;

	@Column(name = "RATIO")
	private Long ratio;

	@Column(name = "PL_GAIN")
	private Long plGain;

	@Column(name = "NEW_PL_GAIN")
	private Long newPlGain;

    @Column(name = "PARENT_ID")
    private Long parentId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private Qc_WiraFiberFinenessTesterReportF010 wiraFiberFinenessTesterReportF010;

}
