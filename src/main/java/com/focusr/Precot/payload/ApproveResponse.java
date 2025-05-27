package com.focusr.Precot.payload;

import java.util.List;

import lombok.Data;

@Data
public class ApproveResponse {

	private Long id;

	private String formatNo;

	private String status;

	private String remarks;

	private String approvlStatus;

	private String sample_requistion;

	private String remarks_a;

	private String status_of_action_taken;

	// annual product review

	private String recommendations;

//	DailyRollConsumption

	private String attendBy;

	private String remark;

	private List<RequestAndIssuenceOfDocChild> qaF002Details;
}
