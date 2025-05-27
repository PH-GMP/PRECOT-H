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

@Table(name="QC_REAGENT_PREPARATION_RECORD_F017_CHEMICAL_TABLE", schema =AppConstants.schema)
@Entity
@Data
public class QcReagentPreparationRecordF017ChemTable extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SNO")
    private Long sno;

	@Column(name = "CHEMICAL_NAME")
	private String chemicalName;

	@Column(name = "CHEMICAL_QUANTITY_USED")
	private String chemicalQuantityUsed;

	@Column(name = "PREPARED_SOLUTION_QUANTITY")
	private String preparedSolutionQuantity;

	@Column(name = "DILUTION_NORMALITY_MORALITY")
	private String dilution_normality_morality;

	@Column(name = "EXPIRY_DATE")
	private String expiryDate;

	@Column(name = "PREPARED_DATE")
	private String preparedDate;
	
	@Column(name="REAGENT_PREP_ID")
	private Long reagentPrepId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="REAGENT_PREP_ID", insertable = false, updatable = false)
	@JsonIgnore
	private QcReagentPreparationRecordF017 qcReagentPreparationRecordF017;
}
