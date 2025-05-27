package com.focusr.Precot.mssql.database.model.Qc;

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
@Table(name = "CHEMICAL_SPECIFICATION_F003", schema = AppConstants.schema)
public class ChemicalSpecificationF003 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "CHEMICAL")
	private String Chemical;

	@Column(name = "APPEARANCE")
	private String appearance;

	@Column(name = "COLOUR")
	private String Colour;

	@Column(name = "ODOUR")
	private String Odour;

	@Column(name = "SOLUBILITY_IN_WATER")
	private String solubilityInWater;

	@Column(name = "VISUAL_INSOLUBLE_IMPURITY")
	private String visualInsolubleImpurity;

	@Column(name = "PH")
	private String ph;

	@Column(name = "PURITY")
	private String purity;

	@Column(name = "RELATIVE_DENSITY")
	private String relativeDensity;

	@Column(name = "SPECIFIC_GRAVITY")
	private String specificGravity;

	@Column(name = "TOTAL_SOLIDS_NON_VOLATILE_MATTER_BY_WEIGHT")
	private String totalSolidsNonVolatileMatterByWeight;

}
