package com.focusr.Precot.mssql.database.model.PPC;



import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PPC_CONTRACT_REVIEW_DEPARTMENT_DETAIL_F003",schema = AppConstants.schema)
@Data
public class ContractReviewMeetingDepartmentMemberF003 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REVIEW_DEPARTMENT_ID")
    private Long reviewDepartmentId;

    @Column(name = "DEPARTMENT")
    private String department;

    @Column(name = "NAME")
    private String name;
    
    @Lob
	@Column(name = "SIGNATURE")
	private byte[] Signature;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONTRACT_REVIEW_MEETING_ID")
    @JsonBackReference
    private ContractReviewMeetingF003 contractReviewMeeting;
    
    
    public ContractReviewMeetingDepartmentMemberF003() {
    	
    	
    }
}
