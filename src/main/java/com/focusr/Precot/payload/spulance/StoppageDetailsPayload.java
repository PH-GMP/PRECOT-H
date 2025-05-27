package com.focusr.Precot.payload.spulance;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class StoppageDetailsPayload {

	private String pOrder;
    private BigDecimal maxRNwt;
    private String brand;
    private String shiftId;

    private BigDecimal lcTotalHours;
    private BigDecimal sclTotalHours;
    private BigDecimal clTotalHours;
    private BigDecimal miTotalHours;
    private BigDecimal erTotalHours;
    private BigDecimal mrTotalHours;
    private BigDecimal othersTotalHours;

    private Integer lcCount;
    private Integer sclCount;
    private Integer clCount;
    private Integer miCount;
    private Integer erCount;
    private Integer mrCount;
    private Integer othersCount;
    
    public StoppageDetailsPayload() {}

    public StoppageDetailsPayload(String pOrder, BigDecimal maxRNwt, String brand, String shiftId,
                                  BigDecimal lcTotalHours, BigDecimal sclTotalHours, BigDecimal clTotalHours,
                                  BigDecimal miTotalHours, BigDecimal erTotalHours, BigDecimal mrTotalHours,
                                  BigDecimal othersTotalHours, Integer lcCount, Integer sclCount, Integer clCount,
                                  Integer miCount, Integer erCount, Integer mrCount, Integer othersCount) {
        this.pOrder = pOrder;
        this.maxRNwt = maxRNwt;
        this.brand = brand;
        this.shiftId = shiftId;
        this.lcTotalHours = lcTotalHours;
        this.sclTotalHours = sclTotalHours;
        this.clTotalHours = clTotalHours;
        this.miTotalHours = miTotalHours;
        this.erTotalHours = erTotalHours;
        this.mrTotalHours = mrTotalHours;
        this.othersTotalHours = othersTotalHours;
        this.lcCount = lcCount;
        this.sclCount = sclCount;
        this.clCount = clCount;
        this.miCount = miCount;
        this.erCount = erCount;
        this.mrCount = mrCount;
        this.othersCount = othersCount;
    }

    // Getters and Setters
    public String getPOrder() {
        return pOrder;
    }

    public void setPOrder(String pOrder) {
        this.pOrder = pOrder;
    }

    public BigDecimal getMaxRNwt() {
        return maxRNwt;
    }

    public void setMaxRNwt(BigDecimal maxRNwt) {
        this.maxRNwt = maxRNwt;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getShiftId() {
        return shiftId;
    }

    public void setShiftId(String shiftId) {
        this.shiftId = shiftId;
    }

    public BigDecimal getLcTotalHours() {
        return lcTotalHours;
    }

    public void setLcTotalHours(BigDecimal lcTotalHours) {
        this.lcTotalHours = lcTotalHours;
    }

    public BigDecimal getSclTotalHours() {
        return sclTotalHours;
    }

    public void setSclTotalHours(BigDecimal sclTotalHours) {
        this.sclTotalHours = sclTotalHours;
    }

    public BigDecimal getClTotalHours() {
        return clTotalHours;
    }

    public void setClTotalHours(BigDecimal clTotalHours) {
        this.clTotalHours = clTotalHours;
    }

    public BigDecimal getMiTotalHours() {
        return miTotalHours;
    }

    public void setMiTotalHours(BigDecimal miTotalHours) {
        this.miTotalHours = miTotalHours;
    }

    public BigDecimal getErTotalHours() {
        return erTotalHours;
    }

    public void setErTotalHours(BigDecimal erTotalHours) {
        this.erTotalHours = erTotalHours;
    }

    public BigDecimal getMrTotalHours() {
        return mrTotalHours;
    }

    public void setMrTotalHours(BigDecimal mrTotalHours) {
        this.mrTotalHours = mrTotalHours;
    }

    public BigDecimal getOthersTotalHours() {
        return othersTotalHours;
    }

    public void setOthersTotalHours(BigDecimal othersTotalHours) {
        this.othersTotalHours = othersTotalHours;
    }

    public Integer getLcCount() {
        return lcCount;
    }

    public void setLcCount(Integer lcCount) {
        this.lcCount = lcCount;
    }

    public Integer getSclCount() {
        return sclCount;
    }

    public void setSclCount(Integer sclCount) {
        this.sclCount = sclCount;
    }

    public Integer getClCount() {
        return clCount;
    }

    public void setClCount(Integer clCount) {
        this.clCount = clCount;
    }

    public Integer getMiCount() {
        return miCount;
    }

    public void setMiCount(Integer miCount) {
        this.miCount = miCount;
    }

    public Integer getErCount() {
        return erCount;
    }

    public void setErCount(Integer erCount) {
        this.erCount = erCount;
    }

    public Integer getMrCount() {
        return mrCount;
    }

    public void setMrCount(Integer mrCount) {
        this.mrCount = mrCount;
    }

    public Integer getOthersCount() {
        return othersCount;
    }

    public void setOthersCount(Integer othersCount) {
        this.othersCount = othersCount;
    }

    @Override
    public String toString() {
        return "StoppageDetailsPayload{" +
               "pOrder='" + pOrder + '\'' +
               ", maxRNwt=" + maxRNwt +
               ", brand='" + brand + '\'' +
               ", shiftId='" + shiftId + '\'' +
               ", lcTotalHours=" + lcTotalHours +
               ", sclTotalHours=" + sclTotalHours +
               ", clTotalHours=" + clTotalHours +
               ", miTotalHours=" + miTotalHours +
               ", erTotalHours=" + erTotalHours +
               ", mrTotalHours=" + mrTotalHours +
               ", othersTotalHours=" + othersTotalHours +
               ", lcCount=" + lcCount +
               ", sclCount=" + sclCount +
               ", clCount=" + clCount +
               ", miCount=" + miCount +
               ", erCount=" + erCount +
               ", mrCount=" + mrCount +
               ", othersCount=" + othersCount +
               '}';
    }
}
