package com.focusr.Precot.util.drygoods;

import java.util.List;

import com.focusr.Precot.Buds.model.bmr.BudsBmrRework;
import com.focusr.Precot.mssql.database.model.drygoods.BMR001GoodsProductionDetails;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.drygoods.BMR05GoodsEquipmentUsed;
import com.focusr.Precot.mssql.database.model.drygoods.BMR06GoodsVerificationOfRecords;
import com.focusr.Precot.mssql.database.model.drygoods.BMR07GoodsManufacturingStepsCottonBalls;
import com.focusr.Precot.mssql.database.model.drygoods.BMR09GoodsProcessDevRecord;
import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProcessDelayEqupment;
import com.focusr.Precot.mssql.database.model.drygoods.BMR11GoodsListOfEnclouser;
import com.focusr.Precot.mssql.database.model.drygoods.BMR12GoodsPostProdReview;
import com.focusr.Precot.mssql.database.model.drygoods.BMR13GoodsQaRelease;
import com.focusr.Precot.mssql.database.model.drygoods.BMR14GoodsProductRelease;

import lombok.Data;

@Data
public class BMRCottonPleatResponsePrint {

	List<BMR001GoodsProductionDetails> bmr001goodsproductiondetails;
	List<BMR03GoodsPackingMeterialIssue> bmr03goodspackingmeterialissue;
	List<BMR05GoodsEquipmentUsed> bmr05goodsequipmentused;
	List<BMR06GoodsVerificationOfRecords> bmr06goodsverificationofrecords;
	List<BMR07GoodsManufacturingStepsCottonBalls> bmr07goodsmanufacturingstepscottonballs;
	List<BMR09GoodsProcessDevRecord> bmr09goodsprocessdevrecord;
	List<BMR10GoodsProcessDelayEqupment> bmr10goodsprocessdelayequpment;
	List<BMR11GoodsListOfEnclouser> bmr11goodslistofenclouser;
	List<BMR12GoodsPostProdReview> bmr12goodspostprodreview;
	List<BMR13GoodsQaRelease> bmr13goodsqarelease;
	List<BMR14GoodsProductRelease> bmr14goodsproductrelease;
	List<BudsBmrRework> reworkList;
	public BMRCottonPleatResponsePrint(List<BMR001GoodsProductionDetails> bmr001goodsproductiondetails,
			List<BMR03GoodsPackingMeterialIssue> bmr03goodspackingmeterialissue,
			List<BMR05GoodsEquipmentUsed> bmr05goodsequipmentused,
			List<BMR06GoodsVerificationOfRecords> bmr06goodsverificationofrecords,
			List<BMR07GoodsManufacturingStepsCottonBalls> bmr07goodsmanufacturingstepscottonballs,
			List<BMR09GoodsProcessDevRecord> bmr09goodsprocessdevrecord,
			List<BMR10GoodsProcessDelayEqupment> bmr10goodsprocessdelayequpment,
			List<BMR11GoodsListOfEnclouser> bmr11goodslistofenclouser,
			List<BMR12GoodsPostProdReview> bmr12goodspostprodreview, List<BMR13GoodsQaRelease> bmr13goodsqarelease,
			List<BMR14GoodsProductRelease> bmr14goodsproductrelease, List<BudsBmrRework> reworkList) {
		super();
		this.bmr001goodsproductiondetails = bmr001goodsproductiondetails;
		this.bmr03goodspackingmeterialissue = bmr03goodspackingmeterialissue;
		this.bmr05goodsequipmentused = bmr05goodsequipmentused;
		this.bmr06goodsverificationofrecords = bmr06goodsverificationofrecords;
		this.bmr07goodsmanufacturingstepscottonballs = bmr07goodsmanufacturingstepscottonballs;
		this.bmr09goodsprocessdevrecord = bmr09goodsprocessdevrecord;
		this.bmr10goodsprocessdelayequpment = bmr10goodsprocessdelayequpment;
		this.bmr11goodslistofenclouser = bmr11goodslistofenclouser;
		this.bmr12goodspostprodreview = bmr12goodspostprodreview;
		this.bmr13goodsqarelease = bmr13goodsqarelease;
		this.bmr14goodsproductrelease = bmr14goodsproductrelease;
		this.reworkList = reworkList;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	

}
