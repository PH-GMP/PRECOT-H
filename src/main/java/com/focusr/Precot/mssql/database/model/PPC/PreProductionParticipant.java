package com.focusr.Precot.mssql.database.model.PPC;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PPC_PRE_PRODUCTION_PARTICIPANT", schema = AppConstants.schema, 
uniqueConstraints = @UniqueConstraint(columnNames = {"PARTICIPANT" }))
public class PreProductionParticipant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "PARTICIPANT")
	private String participant;

}
