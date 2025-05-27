package com.focusr.Precot.payload.padpunching;

import lombok.Data;

@Data
public class PackingDetailsResponse {

	private String date;
    private int shift;
    private String orderNo;
    private String poNo;
    private String machineName;
    private String julianDay;
    private String productName;
    private String gsm;
    private String patternDesc;
    private String padsPerBag;
    private String edge;
    private String pattern;
    private String typeOfPad;

}
