package com.focusr.Precot.mssql.database.model.PPC;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PPC_CONTRACT_REVIEW_PRODUCT_DETAIL_F003", schema = AppConstants.schema)
@Data
public class ContractReviewProductDetailF003 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "REVIEW_PRODUCT_ID")
	private Long reviewproductId;

	@Column(name = "SR_NO")
	private Integer srNo;
 
	@Column(name = "PRODUCT")
	private String productName;

	@Column(name = "PDS_NO")
	private String pdsNo;

//    @Column(name = "PO_QTY_IN_BAGS")
//    private Integer poQtyInBags;
//
//    @Column(name = "PRICE_PER_BAG")
//    private Double pricePerBag;

	@Column(name = "PO_QTY_IN_BAGS")
	private String poQtyInBags;

	@Column(name = "PRICE_PER_BAG")
	private String pricePerBag;

	@Column(name = "CURRENCY")
	private String currency;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CONTRACT_REVIEW_MEETING_ID")
	@JsonBackReference
	private ContractReviewMeetingF003 contractReviewMeeting;

	public ContractReviewProductDetailF003() {

	}
}
