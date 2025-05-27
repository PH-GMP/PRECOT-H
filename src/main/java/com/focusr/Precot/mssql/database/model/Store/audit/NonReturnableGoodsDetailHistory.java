package com.focusr.Precot.mssql.database.model.Store.audit;

import javax.persistence.*;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "STORE_NON_RETURNABLE_GATE_PASS_GOODS_HISTORY_DETAIL_F006",schema = AppConstants.schema)
public class NonReturnableGoodsDetailHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "GATE_PASS_ID" )
    private NonReturnableGatePassHistoryF006 gatePass;
    
    @Column(name = "S_NO")
    private String Sno;

    @Column(name = "DESCRIPTION", length = 200)
    private String description;

    @Column(name = "QUANTITY", length = 50)
    private String quantity;

    @Column(name = "REASON_FOR_SENDING_OUT", length = 200)
    private String reasonForSendingOut;

    @Column(name = "REMARK", length = 200)
    private String remark;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public NonReturnableGatePassHistoryF006 getGatePass() {
		return gatePass;
	}

	public void setGatePass(NonReturnableGatePassHistoryF006 gatePass) {
		this.gatePass = gatePass;
	}

	public String getSno() {
		return Sno;
	}

	public void setSno(String sno) {
		Sno = sno;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getReasonForSendingOut() {
		return reasonForSendingOut;
	}

	public void setReasonForSendingOut(String reasonForSendingOut) {
		this.reasonForSendingOut = reasonForSendingOut;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
    
    

}
