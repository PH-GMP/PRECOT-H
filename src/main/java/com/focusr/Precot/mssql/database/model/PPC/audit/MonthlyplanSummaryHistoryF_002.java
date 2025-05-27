package com.focusr.Precot.mssql.database.model.PPC.audit;



import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;



@Entity
@Table(name = "PPC_MONTHLY_PLAN_SUMMARY_HISTORY_F002", schema = AppConstants.schema)
@Data
public class MonthlyplanSummaryHistoryF_002  {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long Id;

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

    @Column(name = "MONTHYEAR")
    private String monthyear;
    
    @Column(name = "DATE")
    private String date;

    
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "monthlyPlan")
    @JsonManagedReference
    private List<MonthlyplanSummaryProductHistoryF_002> productionData;


    @Column(name = "challenges", length = 65535)
    @Size(max = 65535)
    private String challenges;
 
    @Column(name = "note", length = 65535)
    @Size(max = 65535)  
    private String note;
    
    
    @Column(name = "MAIL_STATUS")
	private String mail_status;
    
    
	
	
	
	@Column(name = "REASON")
	private String reason;
   
 
   @Column(name = "ASSISTANT_STATUS")
	private String Assistant_status;



	@Column(name = "ASSISTANT_SUBMIT_ON")
	private Date Assistant_submit_on;

	@Column(name = "ASSISTANT_SUBMIT_BY")
	private String Assistant_submit_by;

	@Column(name = "ASSISTANT_SUBMIT_ID")
	private Long Assistant_submit_id;

	@Column(name = "ASSISTANT_SIGN")
	private String Assistant_sign;
    
	// InchARGE

	@Column(name = "PPC_INCHARGE_SUBMIT_ON")
	private Date Ppc_Incharge_submit_on;

	@Column(name = "PPC_INCHARGE_SUBMIT_BY")
	private String Ppc_Incharge_submit_by;

	@Column(name = "PPC_INCHARGE_SUBMIT_ID")
	private Long Ppc_Incharge_submit_id;

	@Column(name = "PPC_INCHARGE_SIGN")
	private String Ppc_Incharge_sign;
	
	
	@Column(name = "PPC_INCHARGE_STATUS")
	private String Ppc_Incharge_status;
	
	@Column(name = "VERSION")
	private int version;

    public MonthlyplanSummaryHistoryF_002() {
    	
    	
    }

	public MonthlyplanSummaryHistoryF_002(Long id, String formatName, String formatNo, Long revisionNo, String refSopNo,
			String unit, String monthyear, String date, List<MonthlyplanSummaryProductHistoryF_002> productionData,
			String note, String challenges, String mail_status, String reason, String assistant_status,
			Date assistant_submit_on, String assistant_submit_by, Long assistant_submit_id, String assistant_sign,
			Date ppc_Incharge_submit_on, String ppc_Incharge_submit_by, Long ppc_Incharge_submit_id,
			String ppc_Incharge_sign, String ppc_Incharge_status, int version) {
		super();
		Id = id;
		this.formatName = formatName;
		this.formatNo = formatNo;
		this.revisionNo = revisionNo;
		this.refSopNo = refSopNo;
		this.unit = unit;
		this.monthyear = monthyear;
		this.date = date;
		this.productionData = productionData;
		this.note = note;
		this.challenges = challenges;
		this.mail_status = mail_status;
		this.reason = reason;
		Assistant_status = assistant_status;
		Assistant_submit_on = assistant_submit_on;
		Assistant_submit_by = assistant_submit_by;
		Assistant_submit_id = assistant_submit_id;
		Assistant_sign = assistant_sign;
		Ppc_Incharge_submit_on = ppc_Incharge_submit_on;
		Ppc_Incharge_submit_by = ppc_Incharge_submit_by;
		Ppc_Incharge_submit_id = ppc_Incharge_submit_id;
		Ppc_Incharge_sign = ppc_Incharge_sign;
		Ppc_Incharge_status = ppc_Incharge_status;
		this.version = version;
	}

	
    
    

    

}
