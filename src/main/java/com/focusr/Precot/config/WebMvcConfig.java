package com.focusr.Precot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

/**
 * Created by FocusR on 29-Sep-2019.
 */

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	private final long MAX_AGE_SECS = 3600;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*")
				.allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE").maxAge(MAX_AGE_SECS);
	}

	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("index");
		registry.addViewController("/index").setViewName("index");
		registry.addViewController("/index").setViewName("Dashboard");
		registry.addViewController("/index").setViewName("openpo");
		registry.addViewController("/index").setViewName("closedpo");
		registry.addViewController("/index").setViewName("rejectedpo");
		registry.addViewController("/index").setViewName("ack");
		registry.addViewController("/index").setViewName("rescheduledpo");
		registry.addViewController("/index").setViewName("asn");
		registry.addViewController("/index").setViewName("asnshipmentstatus");
		registry.addViewController("/index").setViewName("rtv");
		registry.addViewController("/index").setViewName("invoicedetails");
		registry.addViewController("/index").setViewName("paymentdetails");
		registry.addViewController("/index").setViewName("api/Caking/Service/UpdateMailStatus/**");
		registry.addViewController("/index").setViewName("Precot/**");
		registry.addViewController("/index").setViewName("/choosenScreen/**");
		registry.addViewController("/index").setViewName("/Report/Generation/**");

		registry.addViewController("/index").setViewName("/api/auth/forgetPassword/resetPwd/**");
		registry.addViewController("/index").setViewName("/welcome/**");
		registry.addViewController("/index").setViewName("/usercreate/**");
		registry.addViewController("/index").setViewName("/userlist/**");
		registry.addViewController("/index").setViewName("/useredit/**");
		registry.addViewController("/index").setViewName("/userEdit/**");
		registry.addViewController("/index").setViewName("/BleachingSummary/**");
		registry.addViewController("/index").setViewName("/Bleaching/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-01/Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-01/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-33/**");
		registry.addViewController("/index").setViewName("/storeusersummary/**");
		registry.addViewController("/index").setViewName("/storeuser/**");
		registry.addViewController("/index").setViewName("/api/auth/updateNewPassword/resetPwd/**");

		registry.addViewController("/index").setViewName("/Bleaching/F-04/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-05/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-05/Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-41/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-41/Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-41/edit/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-42/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-42/Summary/**");
		registry.addViewController("/index").setViewName("/Generate/**");
		registry.addViewController("/index").setViewName("/Mapping/**");

		registry.addViewController("/index").setViewName("/Bleaching/F-04/Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-33/Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-11/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-11/Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-18/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-18/Summary/**");
		registry.addViewController("/index").setViewName("/Closing/**");
		registry.addViewController("/index").setViewName("/RawMaterialIssue/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-08/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-08/Summary/**");

		registry.addViewController("/index").setViewName("/Bleaching/BMR/Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-36/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-36/Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-36/Edit/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-38/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-38/HOD_Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-36/Supervisor_Summary/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-36/Edit/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-02A/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-02A/Edit/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-09/**");
		registry.addViewController("/index").setViewName("/Bleaching/F-09/Summary/**");

		registry.addViewController("/index").setViewName("/Bleaching/F-02A/Summary/**");
		registry.addViewController("/index").setViewName("/Traceability");

		registry.addViewController("/index").setViewName("/Spunlace/F-01/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-01/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-02/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-02/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-03/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-03/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-04/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-04/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-05/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-05/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-06/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-06/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-07/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-07/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-08/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-08/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-09/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-09/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-10/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-10/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-11/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-11/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-12/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-12/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-13/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-13/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-14/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-14/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-15/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-15/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-16/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-16/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-17/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-17/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-18/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-18/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-19/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-19/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-20/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-20/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-21/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-21/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-22/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-22/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-23/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-23/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-24/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-24/Summary/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-25/**");
		registry.addViewController("/index").setViewName("/Spunlace/F-25/Summary/**");
		
		registry.addViewController("/index").setViewName("/Spunlace/PackingMaterial/**");
		

//		registry.addViewController("/Precot/Spunlace/F-01").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-01/Summary").setViewName("index");

//        registry.addViewController("/Precot/Spunlace/F-02").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-02/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-03").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-03/Summary").setViewName("index");
//		
//		registry.addViewController("/Precot/Spunlace/F-04").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-04/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-05").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-05/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-06").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-06/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-07").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-07/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-08").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-08/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-09").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-09/Summary").setViewName("index");
//		
//		registry.addViewController("/Precot/Spunlace/F-10").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-10/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-11").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-11/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-12").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-12/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-13").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-13/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-14").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-14/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-15").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-15/Summary").setViewName("index");
//		
//		registry.addViewController("/Precot/Spunlace/F-16").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-16/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-17").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-17/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-18").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-18/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-19").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-19/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-20").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-20/Summary").setViewName("index");
//		
//		registry.addViewController("/Precot/Spunlace/F-21").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-21/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-22").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-22/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-23").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-23/Summary").setViewName("index");
//
//        registry.addViewController("/Precot/Spunlace/F-24").setViewName("index");
//        registry.addViewController("/Precot/Spunlace/F-24/Summary").setViewName("index");

// Pad Punching

		registry.addViewController("/index").setViewName("/PadPunching/F-04/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-04/Summary/**");
		registry.addViewController("/index").setViewName("/Padpunching/F-04/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-14/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-14/Summary/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-05/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-05/Summary/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-05_f001/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-05_f001/Summary/**");
		registry.addViewController("/index").setViewName("/Padpunching/F-05_f001/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-08/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-08/Summary/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-06/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-06/Summary/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-06/edit/**");

		registry.addViewController("/index").setViewName("/PadPunching/houseKeepingF010/**");
		registry.addViewController("/index").setViewName("/PadPunching/houseKeepingSummaryF010/**");

		registry.addViewController("/index").setViewName("/PadPunching/houseKeepingF006/**");
		registry.addViewController("/index").setViewName("/PadPunching/houseKeepingSummaryF006/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-17/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-17/Summary/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-00/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-00/Summary/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-02/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-02/Summary/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-03/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-03/Summary/**");

		registry.addViewController("/index").setViewName("/PadPunching/F-01/**");
		registry.addViewController("/index").setViewName("/PadPunching/F-01/Summary/**");

		// Drygoods

		registry.addViewController("/index").setViewName("/DryGoods/F-01/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-01/Summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-011/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-011/Summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-03/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-03/Summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-002/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-002/Summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-06/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-06/Summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-05/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-05/Summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-10/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-10/Summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-14/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-14/summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-012/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-012/Summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-09/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-09/Summary/**");

		registry.addViewController("/index").setViewName("/DryGoods/F-013/**");
		registry.addViewController("/index").setViewName("/DryGoods/F-013/Summary/**");

		registry.addViewController("/index").setViewName("/api/auth/updateNewPassword/**");

		registry.addViewController("/index").setViewName("/Spunlace/F-26/**");
//

		registry.addViewController("/index").setViewName("/DryGoods/F-07/BMRSummary/Pleat");

		registry.addViewController("/index").setViewName("/DryGoods/F-08/BMRSummary/WoolRoll");

		registry.addViewController("/index").setViewName("/DryGoods/F-08/BMRSummary/CottonBall");

		registry.addViewController("/index").setViewName("/PadPunching/F-009");

//      PPC

		registry.addViewController("/index").setViewName("/PPC/F-003/Summary/**");
		registry.addViewController("/index").setViewName("/PPC/F-003/**");

		registry.addViewController("/index").setViewName("/PPC/F-002/Summary/**");
		registry.addViewController("/index").setViewName("/PPC/F-002/**");

		registry.addViewController("/index").setViewName("/PPC/F-004/Summary/**");
		registry.addViewController("/index").setViewName("/PPC/F-004/**");

		// QC 
		
		registry.addViewController("/index").setViewName("/QualityControl/AR-F-002");
		registry.addViewController("/index").setViewName("/QualityControl/AR-F-002/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-03/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-03");
		registry.addViewController("/index").setViewName("/QualityControl/Microbiology/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/Microbiology");
		registry.addViewController("/index").setViewName("/QualityControl/F-004/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-004");
		registry.addViewController("/index").setViewName("/QualityControl/F-005/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-005");
		registry.addViewController("/index").setViewName("/QualityControl/F-011/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-011");
		registry.addViewController("/index").setViewName("/QualityControl/F-13/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-13");
		registry.addViewController("/index").setViewName("/QualityControl/F-013/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-013");
		registry.addViewController("/index").setViewName("/QualityControl/AR_F-014/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/AR_F-014");
		registry.addViewController("/index").setViewName("/QualityControl/F-016/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-016");
		registry.addViewController("/index").setViewName("/QualityControl/F-017/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-017");
		registry.addViewController("/index").setViewName("/QualityControl/F-025/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-025");
		registry.addViewController("/index").setViewName("/QualityControl/F-028/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-028");
		registry.addViewController("/index").setViewName("/QualityControl/InwardBook/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-002");
		registry.addViewController("/index").setViewName("/QualityControl/F-001");
		registry.addViewController("/index").setViewName("/QualityControl/F-003");
		registry.addViewController("/index").setViewName("/QualityControl/AR_F-012");
		registry.addViewController("/index").setViewName("/QualityControl/AR_F-012/Summary");
		registry.addViewController("/index").setViewName("/PH-QCL01-AR-F-001/edit/");
		registry.addViewController("/index").setViewName("/PH-QCL01-AR-F-001/Summary/");
		registry.addViewController("/index").setViewName("/QualityControl/AR_F-005");
		registry.addViewController("/index").setViewName("/QualityControl/AR_F-005/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-026/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-026");
		registry.addViewController("/index").setViewName("/QualityControl/F-026A");
		registry.addViewController("/index").setViewName("/QualityControl/F-026A/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-026C/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-026C");
		registry.addViewController("/index").setViewName("/QualityControl/F-026B/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-026B");
		registry.addViewController("/index").setViewName("/QualityControl/F-026D/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-026D");
		registry.addViewController("/index").setViewName("/QualityControl/F-026E/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-026E");
		registry.addViewController("/index").setViewName("/QualityControl/F-026F/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-026F");
		registry.addViewController("/index").setViewName("/QualityControl/F-026G/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-026G");
		registry.addViewController("/index").setViewName("/QualityControl/F-024");
		registry.addViewController("/index").setViewName("/QualityControl/F-024/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-008");
		registry.addViewController("/index").setViewName("/QualityControl/F-008/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-010");
		registry.addViewController("/index").setViewName("/QualityControl/F-010/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-023/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-023");
		registry.addViewController("/index").setViewName("/QualityControl/F-014");
		registry.addViewController("/index").setViewName("/QualityControl/F-014/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-015/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-015");
		registry.addViewController("/index").setViewName("/QualityControl/F-006");
		registry.addViewController("/index").setViewName("/QualityControl/F-006/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-018");
		registry.addViewController("/index").setViewName("/QualityControl/F-018/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-021");
		registry.addViewController("/index").setViewName("/QualityControl/F-021/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/PH-QCF-027");
		registry.addViewController("/index").setViewName("/QualityControl/PH-QCF-027/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-009");
		registry.addViewController("/index").setViewName("/QualityControl/F-009/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-020/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-020");
		registry.addViewController("/index").setViewName("/QualityControl/F-018");
		
		registry.addViewController("/index").setViewName("/QualityControl/F-012/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/F-012");
		registry.addViewController("/index").setViewName("/QualityControl/ARF011/Summary");
		registry.addViewController("/index").setViewName("/QualityControl/ARF011");


		
		// QA
		
				registry.addViewController("/index").setViewName("/QualityAssurance/QA_F037_Summary/**");
		        registry.addViewController("/index").setViewName("/QualityAssurance/QA_F037/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-23/**");
		        registry.addViewController("/index").setViewName("/QA/F-23/Summary/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-03/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/F-03/**");
		        
		        registry.addViewController("/index").setViewName("/QA/PestControl/**");
		        registry.addViewController("/index").setViewName("/QA/PestControl/Summary/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-01/**");
		        registry.addViewController("/index").setViewName("/QA/F-01/Summary/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-60/**");
		        registry.addViewController("/index").setViewName("/QA/F-60/Summary/**");
		        
		        registry.addViewController("/index").setViewName("/QA/rodentFull/**");
		        registry.addViewController("/index").setViewName("/QA/rodentBoxSummary/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-18/**");
		        registry.addViewController("/index").setViewName("/QA/F-18/Summary/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-15/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/F-15/**");
		        
		        registry.addViewController("/index").setViewName("/QA/Inward029/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/Inward029/**");
		        
		        registry.addViewController("/index").setViewName("/QA/Inward030/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/Inward030/**");
		        
		        registry.addViewController("/index").setViewName("/QA/Inward031/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/Inward031/**");
		        
		        registry.addViewController("/index").setViewName("/QA/Inward032/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/Inward032/**");
		        
		        registry.addViewController("/index").setViewName("/QA/Inward033/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/Inward033/**");
		        
		        registry.addViewController("/index").setViewName("/QA/cusRegisterSummary/**");
		        registry.addViewController("/index").setViewName("/QA/customerComplaint/**");
		        
		        registry.addViewController("/index").setViewName("/QualityAssurance/F-010/internal_audit_schedule/**");
		        registry.addViewController("/index").setViewName("/QualityAssurance/F-010/internal_audit_schedule_summary/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-39/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/F-39/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-002/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/F-002/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-01/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/F-01/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-16/**");
		        registry.addViewController("/index").setViewName("/QA/F-16/Summary/**");
		        
		        registry.addViewController("/index").setViewName("/QA/QA_F017_Summary/**");
		        registry.addViewController("/index").setViewName("/QA/QA_F017/**");
		        
		        registry.addViewController("/index").setViewName("/QA/QA_F013_Summary/**");
		        registry.addViewController("/index").setViewName("/QA/QA_F013/**");
		        
		        registry.addViewController("/index").setViewName("/QA/QA_F020_Summary/**");
		        registry.addViewController("/index").setViewName("/QA/QA_F020/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-21/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/F-14/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-14/Summary/**");
		        registry.addViewController("/index").setViewName("/QA/F-22/**");
		        
		        registry.addViewController("/index").setViewName("/QA/F-22/Summary/**");
		        registry.addViewController("/index").setViewName("/QualityAssurance/F-034/inprocess_inspection_report/**");

		        registry.addViewController("/index").setViewName("/QualityAssurance/F-034/inprocess_inspection_report_summary/**");
		        registry.addViewController("/index").setViewName("/QualityAssurance/F-012/internal_audit_report/**");
		        
		        registry.addViewController("/index").setViewName("/QualityAssurance/F-012/internal_audit_report_summary/**");
		        registry.addViewController("/index").setViewName("/QualityAssurance/F-035/inprocess_inspection_report_summary/**");
		        
		        registry.addViewController("/index").setViewName("/QualityAssurance/F-035/inprocess_inspection_report/**");
		        registry.addViewController("/index").setViewName("/QualityAssurance/F-036/inprocess_inspection_report_summary/**");
		        
		        registry.addViewController("/index").setViewName("/QualityAssurance/F-036/inprocess_inspection_report/**");
		
		
		
//      dispatch
		registry.addViewController("/index").setViewName("/Dispatch/F-001/Summary/**");
		registry.addViewController("/index").setViewName("/Dispatch/F-001/**");

		// STORES

		registry.addViewController("/index").setViewName("/Stores/F-003/Summary/**");
		registry.addViewController("/index").setViewName("/Stores/F-003/**");

		registry.addViewController("/index").setViewName("/Stores/F-006/Summary/**");
		registry.addViewController("/index").setViewName("/Stores/F-006/**");

		registry.addViewController("/index").setViewName("/Stores/F-008/Summary/**");
		registry.addViewController("/index").setViewName("/Stores/F-008/**");

		registry.addViewController("/index").setViewName("/Stores/F-009/Summary/**");
		registry.addViewController("/index").setViewName("/Stores/F-009/**");
		
		
//      Product Development
      registry.addViewController("/index").setViewName("/Development/F-001/Summary/**");
      registry.addViewController("/index").setViewName("/Development/F-001/**");
      
//      Engineering
      
      registry.addViewController("/index").setViewName("/Engineering/FC-003/Summary/**");
      registry.addViewController("/index").setViewName("/Engineering/FC-003/**");
      
      registry.addViewController("/index").setViewName("/Engineering/FC-004/Summary/**");
      registry.addViewController("/index").setViewName("/Engineering/FC-004/**");
      
      registry.addViewController("/index").setViewName("/Engineering/FC-0016/Summary/**");
      registry.addViewController("/index").setViewName("/Engineering/FC-0016/**");
      
      registry.addViewController("/index").setViewName("/Engineering/FC-020/Summary/**");
      registry.addViewController("/index").setViewName("/Engineering/FC-020/**");
		
//   QA
      
      
      registry.addViewController("/index").setViewName("/QA/F-58/Summary/**");
      registry.addViewController("/index").setViewName("/QA/F-58/**");

      registry.addViewController("/index").setViewName("/QA/F-59/Summary/**");
      registry.addViewController("/index").setViewName("/QA/F-59/**");

      registry.addViewController("/index").setViewName("/QA/F-26/Summary/**");
      registry.addViewController("/index").setViewName("/QA/F-26/**");

      registry.addViewController("/index").setViewName("/QA/F-49/Summary/**");
      registry.addViewController("/index").setViewName("/QA/F-49/**");

      registry.addViewController("/index").setViewName("/QA/F-50/Summary/**");
      registry.addViewController("/index").setViewName("/QA/F-50/**");

      registry.addViewController("/index").setViewName("/QA/F-52/Summary/**");
      registry.addViewController("/index").setViewName("/QA/F-52/**");

      registry.addViewController("/index").setViewName("/QualityAssurance/F-043/Summary/**");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-043/**");

      registry.addViewController("/index").setViewName("/QualityAssurance/F-045/Summary/**");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-045/**");

      registry.addViewController("/index").setViewName("/QualityAssurance/F-051/Summary/**");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-051/**");
      
      registry.addViewController("/index").setViewName("/QA/QA_F047_Summary");
      registry.addViewController("/index").setViewName("/QA/QA_F047");
      registry.addViewController("/index").setViewName("/QualityAssurance/QA_F_046");
      registry.addViewController("/index").setViewName("/QualityAssurance/QA_F_046_Summary");
      registry.addViewController("/index").setViewName("/QA/F-06/Summary");
      registry.addViewController("/index").setViewName("/QA/F-06");
      registry.addViewController("/index").setViewName("/QA/F007/Summary");
      registry.addViewController("/index").setViewName("/QA/F007");
      registry.addViewController("/index").setViewName("/QA/QA_F008_Summary");
      registry.addViewController("/index").setViewName("/QA/QA_F008");
      registry.addViewController("/index").setViewName("/QA/F-09");
      registry.addViewController("/index").setViewName("/QA/F-09/Summary");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-027/Summary");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-027");
      registry.addViewController("/index").setViewName("/QA/F-044/corrective");
      registry.addViewController("/index").setViewName("/QA/F-044/corrective_summary");
      registry.addViewController("/index").setViewName("/QA/F-060");
      registry.addViewController("/index").setViewName("/QA/F-060/Summary");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-076/QA_f076_training_session_allotment_register_summary");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-076/QA_f076_training_session_allotment_register");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-029/QA_f029_new_sample_request_summary");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-029/QA_f029_new_sample_request");
      registry.addViewController("/index").setViewName("/QualityAssurance/QA_F005_Summary");
      registry.addViewController("/index").setViewName("/QA/F-09");
      registry.addViewController("/index").setViewName("/QA/F-09/Summary");
      registry.addViewController("/index").setViewName("/QA/F-62");
      registry.addViewController("/index").setViewName("/QA/F-028_summary");
      registry.addViewController("/index").setViewName("/QA/F-028");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-040/Summary");
      registry.addViewController("/index").setViewName("/QualityAssurance/F-040");
      registry.addViewController("/index").setViewName("/QualityAssurance/QA_F_041");
      registry.addViewController("/index").setViewName("/QualityAssurance/QA_F_041_Summary");
      registry.addViewController("/index").setViewName("/QA/QA_F042_Summary");
      registry.addViewController("/index").setViewName("/QA/QA_F042");
      registry.addViewController("/index").setViewName("/QA/F-25");
      registry.addViewController("/index").setViewName("/QA/F-25/Summary");
      registry.addViewController("/index").setViewName("/QA/F-048/Summary");
      registry.addViewController("/index").setViewName("/QA/F-048");
      registry.addViewController("/index").setViewName("/QualityAssurance/QA_F037");
      registry.addViewController("/index").setViewName("/QualityAssurance/QA_F037_Summary");

  

     
      registry.addViewController("/index").setViewName("/COTTON_BUDS/F-04");
      registry.addViewController("/index").setViewName("/COTTON_BUDS/F-04/Summary");
      registry.addViewController("/index").setViewName("/COTTON_BUDS/F-02");
      registry.addViewController("/index").setViewName("/COTTON_BUDS/F-02/Summary");
      registry.addViewController("/index").setViewName("/CottonBuds/BMR");
      registry.addViewController("/index").setViewName("/Buds/Buds_F038");
      registry.addViewController("/index").setViewName("/Buds/Buds_F038_Summary");
      registry.addViewController("/index").setViewName("/COTTON_BUDS/F-002");
      registry.addViewController("/index").setViewName("/COTTON_BUDS/F-002/Summary");
      registry.addViewController("/index").setViewName("/CottonBuds/F-001");
      registry.addViewController("/index").setViewName("/CottonBuds/F-001/Summary");



	}
}
