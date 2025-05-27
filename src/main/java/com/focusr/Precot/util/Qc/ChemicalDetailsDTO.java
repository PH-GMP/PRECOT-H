package com.focusr.Precot.util.Qc;

import lombok.Data;

@Data
public class ChemicalDetailsDTO {

	private Long id;
	private String chemical;
	private String colour;
	private String odour;
	private String appearance;
	private String ph;
	private String purity;
	private String relativeDensity;
	private String solubilityInwater;
	private String specificGravity;
	private String totalSolids;
	private String visualInsolubleImpurity;
}
