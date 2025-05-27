package com.focusr.Precot.mssql.database.service.engineering.audit;






import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationHistoryF016;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;


@Entity
@Table(name = "ENG_WEIGHING_SCALES_CALIBRATION_DETAIL_HISTORY_F016",schema = AppConstantsproductdevelopment.schema)
@Data
public class WeightScalesCalibrationDetailHistory {
	
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id;

	    @ManyToOne
	    @JoinColumn(name = "PARENT_ID")
	    @JsonBackReference
	    private WeightScalesCalibrationHistoryF016 parentRecord;

//	    @Column(name = "DATE")
//	    private String date;

	    @Column(name = "WEIGHT_IN_G_KG")
	    private String weightInGKg;

	    @Column(name = "OBSERVED_WEIGHT_IN_G_KG")
	    private String observedWeightInGKg;

	    @Column(name = "RANGE_IN_G_KG")
	    private String rangeInGKg;

	    @Column(name = "STATUS")
	    private String status; 

	    @Column(name = "REMARKS")
	    private String remarks;

}
