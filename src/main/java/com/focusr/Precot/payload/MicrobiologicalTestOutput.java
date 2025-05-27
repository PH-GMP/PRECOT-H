package com.focusr.Precot.payload;

import java.sql.Date;
import java.util.List;

import lombok.Data;
@Data
public class MicrobiologicalTestOutput {
	private Long test_id;
	private Long micro_id;
    private String sampled_on;
    private String tested;
    private String tf_count;
    private String tf_viable_count;
    private String p_field_a;
    private String p_field_b;
    private String p_field_c;
    private String p_field_d;
    private String p_field_e;
    private String moisture;
    private String sub_batch_no;
    private String completion_date;
    private String remarks;
    private String product;
    private String physicalandchemicaltest;

    // Getters and Setters
    // ...
}