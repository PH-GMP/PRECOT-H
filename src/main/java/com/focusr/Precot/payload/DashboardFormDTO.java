package com.focusr.Precot.payload;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DashboardFormDTO {

	private String form;
	private String department_id;
	private String formName;
	private List<Object> userRole;
	private List<Long> formStatus;

}

