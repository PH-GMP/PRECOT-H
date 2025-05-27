package com.focusr.Precot.mssql.database.model.QcAudit;

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

@Entity
@Data
@Table(name="QC_REAGENT_PREPARATION_RECORD_F017_CHEMICAL_TABLE_HISTORY",schema=AppConstants.schema)
public class QcReagentPreparationRecordF017ChemTableHistory extends UserDateAudit{

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
	
	@Column(name = "PREPARATION_DATE")
	private String preparationDate;

	@Column(name = "EXPIRY_DATE")
	private String expiryDate;
	
	@Column(name="REAGENT_PREP_HISTORY_ID")
	private Long reagentPrepHistoryId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="REAGENT_PREP_HISTORY_ID",referencedColumnName = "ID",insertable = false,updatable = false)
	@JsonIgnore
	private QcReagentPreparationRecordF017History qcReagentPreparationRecordF017History;
}
