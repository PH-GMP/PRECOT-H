package com.focusr.Precot.util.Qc;

import java.util.Date;
import java.util.Map;

import lombok.Data;

@Data
public class CleaningOfAutoclavesF023Response {

    private Date createdAt;
    private Date updatedAt;
    private String createdBy;
    private String updatedBy;
    private Long id;
    private String formatNo;
    private String revisionNo;
    private String formatName;
    private String refSopNo;
    private String date;
    private String month;
    private String year;
    private String week;
    private String microbiologist_status;
    private Date microbiologist_saved_on;
    private String microbiologist_saved_by;
    private Long microbiologist_saved_id;
    private Date microbiologist_submit_on;
    private String microbiologist_submit_by;
    private Long microbiologist_submit_id;
    private String microbiologist_sign;
    private String mail_status;

    private Map<String, Object> lab7Details;
    private Map<String, Object> lab3Details;

    // Getters and Setters
}
