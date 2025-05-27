package com.focusr.Precot.mssql.database.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping(value = "/")
	public String homeDefault(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/index")
	public String homePage(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/api/auth/forgetPassword/resetPwd/{token}")
	public String forgetPassword(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/api/auth/updateNewPassword/resetPwd/{token}")
	public String forgotPassword1(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/api/Caking/Service/UpdateMailStatus/**")
	public String updateMail(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Precot/**")
	public String Home(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/choosenScreen/**")
	public String choosenScreen(ModelMap modelMap) {

		return "index";
	}

	// ======= new ========

	@RequestMapping(value = "/welcome/**")
	public String welcomeScreen(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/usercreate/**")
	public String userCreate(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/userlist/**")
	public String userList(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/userEdit/**")
	public String userEdit(ModelMap modelMap) {

		return "index";
	}

//	@RequestMapping(value = "/Precot/choosenScreen/**")
//	public String choooseScreen(ModelMap modelMap) {
//
//		return "index";
//	}

	@RequestMapping(value = "/storeuser/**")
	public String storeuser(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Report/Generation/**")
	public String Audittrail(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Dashboard/**")
	public String dashboard(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/storeusersummary/**")
	public String storeusersummary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/BleachingSummary/**")
	public String bleachingSummary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/**")
	public String bleaching(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-01/Summary/**")
	public String bleachF01Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-01/**")
	public String bleachF01(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-33/**")
	public String bleachF33(ModelMap modelMap) {

		return "index";
	}

	// =====

	@RequestMapping(value = "/Bleaching/F-04/**")
	public String bleachF04(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-05/**")
	public String bleachF05(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-05/Summary/**")
	public String bleachF05Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-41/**")
	public String bleachF41(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-41/Summary/**")
	public String bleachF41Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-41/edit/**")
	public String bleachF41Edit(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-42/**")
	public String bleachF42(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-42/Summary/**")
	public String bleachF42Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Generate/**")
	public String generate(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Mapping/**")
	public String mapping(ModelMap modelMap) {

		return "index";
	}

	// =====

	@RequestMapping(value = "/Bleaching/F-04/Summary/**")
	public String bleachF04Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-33/Summary/**")
	public String bleachF33Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-11/**")
	public String bleachF11(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-11/Summary/**")
	public String bleachF11Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-18/**")
	public String bleachF18(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-18/Summary/**")
	public String bleachF18Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Closing/**")
	public String closing(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/RawMaterialIssue/**")
	public String rawMaterialIssue(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-08/**")
	public String bleachF08(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-08/Summary/**")
	public String bleachF08Summary(ModelMap modelMap) {

		return "index";
	}

	// =====

	@RequestMapping(value = "/Bleaching/BMR/Summary/**")
	public String bleachBmrSummary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-36/**")
	public String bleachF36(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-36/Summary/**")
	public String bleachF36Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-36/Edit/**")
	public String bleachF36Edit(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-38/**")
	public String bleachF38(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-38/HOD_Summary/**")
	public String bleachF38HodSummary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-36/Supervisor_Summary/**")
	public String bleachF36SupervisorSummary(ModelMap modelMap) {

		return "index";
	}

//	@RequestMapping(value = "/Precot/Bleaching/F-36/Edit/**")
//	public String bleachF36edit(ModelMap modelMap) {
//
//		return "index";
//	}

	@RequestMapping(value = "/Bleaching/F-02A/**")
	public String bleachF02A(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-02A/Edit/**")
	public String bleachF02AEdit(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-02A/Summary/**")
	public String bleachF02ASummary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-09**")
	public String bleachF09(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/Bleaching/F-09/Summary/**")
	public String bleachF09Summary(ModelMap modelMap) {

		return "index";
	}

	@RequestMapping(value = "/api/auth/updateNewPassword/**")
	public String updateNewPassword(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-01/**")
	public String handleF01(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-02/**")
	public String handleF02(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-03/**")
	public String handleF03(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-04/**")
	public String handleF04(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-05/**")
	public String handleF05(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-06/**")
	public String handleF06(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-07/**")
	public String handleF07(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-08/**")
	public String handleF08(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-09/**")
	public String handleF09(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-10/**")
	public String handleF10(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-11/**")
	public String handleF11(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-12/**")
	public String handleF12(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-13/**")
	public String handleF13(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-14/**")
	public String handleF14(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-15/**")
	public String handleF15(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-16/**")
	public String handleF16(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-17/**")
	public String handleF17(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-18/**")
	public String handleF18(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-19/**")
	public String handleF19(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-20/**")
	public String handleF20(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-21/**")
	public String handleF21(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-22/**")
	public String handleF22(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-23/**")
	public String handleF23(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-24/**")
	public String handleF24(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Spunlace/F-25/**")
	public String handleF25(ModelMap modelMap) {
		return "index";
	}

	// Pad Punching

// Pad Punching

	@RequestMapping(value = "/PadPunching/F-04/**")
	public String PadPunching04(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Padpunching/F-04/**")
	public String Padpunching04(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/F-14/**")
	public String PadPunching14(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/F-05/**")
	public String PadPunching05(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/F-05_f001/**")
	public String PadPunching05001(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Padpunching/F-05_f001/**")
	public String Padpunching05001(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/F-08/**")
	public String PadPunching08(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "PadPunching/F-06/**")
	public String PadPunching06(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/houseKeepingF010/**")
	public String PadPunchinghouseKeeping10(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/houseKeepingF006/**")
	public String PadPunchinghouseKeeping06(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/houseKeepingSummaryF010/**")
	public String PadPunchinghouseKeepingSummary10(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/houseKeepingSummaryF006/**")
	public String PadPunchinghouseKeepingSummary06(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/F-17/**")
	public String PadPunching17(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/F-00/**")
	public String PadPunching003(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/F-02/**")
	public String PadPunching02(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/F-01/**")
	public String PadPunching01(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PadPunching/F-03/**")
	public String PadPunching03(ModelMap modelMap) {
		return "index";
	}

	// drygoods

	@RequestMapping(value = "/DryGoods/F-01/**")
	public String dryGoodsF01(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-011/**")
	public String dryGoodsF011(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-03/**")
	public String dryGoodsF03(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-002/**")
	public String dryGoodsF002(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-06/**")
	public String dryGoodsF06(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-05/**")
	public String dryGoodsF05(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-10/**")
	public String dryGoodsF10(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-14/**")
	public String dryGoodsF14(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-012/**")
	public String dryGoodsF012(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-09/**")
	public String dryGoodsF09(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/DryGoods/F-013/**")
	public String dryGoodsF013(ModelMap modelMap) {
		return "index";
	}

	// Trace
	@RequestMapping(value = "/Traceability")
	public String Traceability(ModelMap modelMap) {
		return "index";
	}

	// BmrSummery
	@RequestMapping(value = "/Spunlace/F-26/**")
	public String spunlacesummery(ModelMap modelMap) {
		return "index";
	}

	//

	// BmrSummery
	@RequestMapping(value = "/DryGoods/F-07/BMRSummary/Pleat")
	public String spunlacesummery01(ModelMap modelMap) {
		return "index";
	}

	// BmrSummery
	@RequestMapping(value = "/DryGoods/F-08/BMRSummary/WoolRoll\"")
	public String spunlacesummery02(ModelMap modelMap) {
		return "index";
	}

	// BmrSummery
	@RequestMapping(value = "/DryGoods/F-08/BMRSummary/CottonBall")
	public String spunlacesummery03(ModelMap modelMap) {
		return "index";
	}

	// BmrSummery
	@RequestMapping(value = "/PadPunching/F-009")
	public String spunlacesummery04(ModelMap modelMap) {
		return "index";
	}

	// PPC

	@RequestMapping(value = "/PPC/F-003/Summary/**")
	public String PPC3(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PPC/F-003/**")
	public String PPCSummary3(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PPC/F-002/Summary/**")
	public String PPCSummary2(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PPC/F-002/**")
	public String PPP2(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PPC/F-004/Summary/**")
	public String PPCSummary4(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/PPC/F-004/**")
	public String PPC4(ModelMap modelMap) {
		return "index";
	}

// DISPATACH
	@RequestMapping(value = "/Dispatch/F-001/Summary**")
	public String DispatchSummary01(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Dispatch/F-001/**")
	public String Dispatch01(ModelMap modelMap) {
		return "index";
	}

//STORES

	@RequestMapping(value = "/Stores/F-003/Summary/**")
	public String storesummery03(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Stores/F-003/**")
	public String store03(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Stores/F-006/Summary/**")
	public String storeSummary06(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Stores/F-006/**")
	public String store06(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Stores/F-008/Summary/**")
	public String storeSummary08(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Stores/F-008/**")
	public String store08(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Stores/F-009/Summary/**")
	public String storeSummary09(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping(value = "/Stores/F-009/**")
	public String store9(ModelMap modelMap) {
		return "index";
	}
	
	
	@RequestMapping(value = "/Spunlace/PackingMaterial/**")
	public String punchingbmrPack(ModelMap modelMap) {
		return "index";
	}
	
	
	// QC
	
	@RequestMapping("/AR-F-002")
	public String arF002(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/AR-F-002/Summary")
	public String arF002Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-03/Summary")
	public String f03Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-03")
	public String f03(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/Microbiology/Summary")
	public String microbiologySummary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/Microbiology")
	public String microbiology(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-004/Summary")
	public String f004Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-004")
	public String f004(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-005/Summary")
	public String f005Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-005")
	public String f005(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-011/Summary")
	public String f011Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-011")
	public String f011(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-13/Summary")
	public String f13Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-13")
	public String f13(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-013/Summary")
	public String f013Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-013")
	public String f013(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/AR_F-014/Summary")
	public String arF014Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/AR_F-014")
	public String arF014(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-016/Summary")
	public String f016Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-016")
	public String f016(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-017/Summary")
	public String f017Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-017")
	public String f017(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-025/Summary")
	public String f025Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-025")
	public String f025(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-028/Summary")
	public String f028Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-028")
	public String f028(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/InwardBook/Summary")
	public String inwardBookSummary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-002")
	public String f002(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-001")
	public String f001(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-003")
	public String f003(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/AR_F-012")
	public String arF012(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/AR_F-012/Summary")
	public String arF012Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/PH-QCL01-AR-F-001/edit/")
	public String phQCL01ArF001Edit(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/PH-QCL01-AR-F-001/Summary/")
	public String phQCL01ArF001Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/AR_F-005")
	public String arF005(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/AR_F-005/Summary")
	public String arF005Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026/Summary")
	public String f026Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026")
	public String f026(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026A")
	public String f026A(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026A/Summary")
	public String f026ASummary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026C/Summary")
	public String f026CSummary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026C")
	public String f026C(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026B/Summary")
	public String f026BSummary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026B")
	public String f026B(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026D/Summary")
	public String f026DSummary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026D")
	public String f026D(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026E/Summary")
	public String f026ESummary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026E")
	public String f026E(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026F/Summary")
	public String f026FSummary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026F")
	public String f026F(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026G/Summary")
	public String f026GSummary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-026G")
	public String f026G(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-024")
	public String f024(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-024/Summary")
	public String f024Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-008")
	public String f008(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-008/Summary")
	public String f008Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-010")
	public String f010(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-010/Summary")
	public String f010Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-023/Summary")
	public String f023Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-023")
	public String f023(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-014")
	public String f014(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-014/Summary")
	public String f014Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-015/Summary")
	public String f015Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-015")
	public String f015(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-006")
	public String f006(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-006/Summary")
	public String f006Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-018")
	public String f018(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/F-018/Summary")
	public String f018Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-021")
	public String f021(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-021/Summary")
	public String f021Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/PH-QCF-027")
	public String phQcf027(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/PH-QCF-027/Summary")
	public String phQcf027Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-009")
	public String f009(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-009/Summary")
	public String f009Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/ARF011/Summary")
	public String arf011Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-ARF011")
	public String fArf011(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QC/F-04/Summary")
	public String f04Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QC/F-04")
	public String f04(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QC/F-05/Summary")
	public String f05Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QC/F-05")
	public String f05(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-012")
	public String f012(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-012/Summary")
	public String f012Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-022")
	public String f022(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-022/Summary")
	public String f022Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-029")
	public String f029(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-029/Summary")
	public String f029Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/ARF-006/Summary")
	public String arf006Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/ARF-006")
	public String arf006(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/AR-F-004/Summary")
	public String arF004Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/AR-F-004")
	public String arF004(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QC/F-07/Summary")
	public String f07Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QC/F-07")
	public String f07(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/AR-F-007/Summary")
	public String arF007Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/AR-F-007")
	public String arF007(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-020/Summary")
	public String f020Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-020")
	public String f020(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/PH-QCF-030/Summary")
	public String phQcf030Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/PH-QCF-030")
	public String phQcf030(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-025/Summary")
	public String f0251Summary(ModelMap modelMap) {
		return "index";
	}

	@RequestMapping("/QualityControl/F-025")
	public String f0251(ModelMap modelMap) {
		return "index";
	}

	
//	@RequestMapping("/QualityControl/ARF011/Summary")
//	public String phQcf011Summary(ModelMap modelMap) {
//		return "index";
//	}
	
	@RequestMapping("/QualityControl/ARF011")
	public String phQcf011(ModelMap modelMap) {
		return "index";
	}
	
	@RequestMapping("/QualityControl/F-015/Summary")
	public String phQcf015Summmary(ModelMap modelMap) {
		return "index";
	}
	
	@RequestMapping("/QualityControl/F-017/Summary")
	public String phQcf017Summmary(ModelMap modelMap) {
		return "index";
	}
	
	@RequestMapping("/QualityControl/F-018/Summary")
	public String phQcf018Summmary(ModelMap modelMap) {
		return "index";
	}
	
	@RequestMapping("QualityControl/F-024/Summary")
	public String phQcf024Summmary(ModelMap modelMap) {
		return "index";
	}
	
	// QA 
	
//  QA DEPARTMNET
  @RequestMapping(value = "/QualityAssurance/QA_F037_Summary/**")
	public String qualityAssuanceSummary(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QualityAssurance/QA_F037/**")
	public String qualityAssuanceF037(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/F-23/**")
	public String qaF23(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/F-23/Summary/**")
	public String qaSummaryF23(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/F-03/Summary/**")
	public String qaSummaryF03(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/F-03/**")
	public String qaF03(ModelMap modelMap) {
      return "index";
  }
  

  @RequestMapping(value = "/QA/PestControl/Summary/**")
	public String pestControllSummary(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/PestControl/**")
	public String pestControll(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/F-01/**")
	public String qaF01(ModelMap modelMap) {
      return "index";
  }
  
  
  @RequestMapping(value = "/QA/F-01/Summary/**")
	public String qaF01Summary(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/F-60/Summary/**")
	public String qaF60Summary(ModelMap modelMap) {
      return "index";
  }
  

  @RequestMapping(value = "/QA/F-60/**")
	public String qaF60(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/rodentFull/**")
	public String rodentFull(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/rodentBoxSummary/**")
	public String rodentBoxSummary(ModelMap modelMap) {
      return "index";
  }
  
  @RequestMapping(value = "/QA/F-18/Summary/**")
 	public String summaryF18(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/F-18/**")
 	public String qaF18(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/F-15/Summary/**")
 	public String qaF15Summary(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/F-15/**")
 	public String qaF15(ModelMap modelMap) {
         return "index";
     }
  

  @RequestMapping(value = "/QA/Inward029/Summary/**")
 	public String inward029Summary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/Inward029/**")
 	public String inward029(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/Inward030/Summary/**")
 	public String inward030Summary(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/Inward030/**")
 	public String inward030(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/Inward031/Summary/**")
 	public String inward031Summary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/Inward031/**")
 	public String inward031(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/Inward032/Summary/**")
 	public String inward032Summary(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/Inward032/**")
 	public String inward032(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/Inward033/Summary/**")
 	public String inward033Summary(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/Inward033/**")
 	public String inward033(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/cusRegisterSummary/**")
 	public String cusRegisterSummary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QualityAssurance/F-010/internal_audit_schedule/**")
 	public String internalAuditSChedule(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QualityAssurance/F-010/internal_audit_schedule_summary/**")
 	public String internalAuditSCheduleSummary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/F-39/Summary/**")
 	public String f39Summary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/F-39/**")
 	public String f39(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/customerComplaint/**")
 	public String customerComplaint(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/F-002/Summary/**")
 	public String f002Summary(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/F-002/**")
 	public String f2002(ModelMap modelMap) {
         return "index";
     }

  @RequestMapping(value = "/QA/F-16/**")
 	public String f16(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/F-16/Summary/**")
 	public String f16Summary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/QA_F017_Summary/**")
 	public String qaSummaryF017(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/QA_F017/**")
 	public String qaF017(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/QA_F013_Summary/**")
 	public String qaF013Summary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/QA_F013/**")
 	public String qaF013(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/QA_F020_Summary/**")
 	public String qaF020Summary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/QA_F020/**")
 	public String qaF020(ModelMap modelMap) {
         return "index";
     }
  
  @RequestMapping(value = "/QA/F-21/Summary/**")
 	public String qaF021Summary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/F-14/**")
 	public String qaF14(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/F-14/Summary/**")
 	public String qaF14Summary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/F-22/**")
 	public String qaF22(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QA/F-22/Summary/**")
 	public String qaF22Summary(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QualityAssurance/F-034/inprocess_inspection_report/**")
 	public String inprocessInspectReportF034(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QualityAssurance/F-034/inprocess_inspection_report_summary/**")
 	public String inprocessInspectReportSummaryF034(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QualityAssurance/F-012/internal_audit_report/**")
 	public String internalAuditReportF012(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QualityAssurance/F-012/internal_audit_report_summary/**")
 	public String internalAuditReportSummaryF012(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QualityAssurance/F-035/inprocess_inspection_report_summary/**")
 	public String inprocessInspectionReportSummaryF035(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QualityAssurance/F-035/inprocess_inspection_report/**")
 	public String inprocessInspectionReportF035(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QualityAssurance/F-036/inprocess_inspection_report_summary/**")
 	public String inprocessInspectionReportSummaryF036(ModelMap modelMap) {
         return "index";
     }
  @RequestMapping(value = "/QualityAssurance/F-036/inprocess_inspection_report/**")
 	public String inprocessInspectionReportF036(ModelMap modelMap) {
         return "index";
     }  
  
  
  @RequestMapping(value = "/Development/F-001/Summary/**")
	public String productsummary01(ModelMap modelMap) {
      return "index";
  }

@RequestMapping(value = "/Development/F-001/**")
	public String product01(ModelMap modelMap) {
      return "index";
  }

//Engineering

@RequestMapping(value = "/Engineering/FC-003/Summary/**")
	public String Engineeringsummary3(ModelMap modelMap) {
       return "index";
   }
 
 @RequestMapping(value = "/Engineering/FC-003/**")
	public String Engineering03(ModelMap modelMap) {
       return "index";
   }
 @RequestMapping(value = "/Engineering/FC-004/Summary/**")
	public String Engineeringsummary04(ModelMap modelMap) {
        return "index";
    }
  
  @RequestMapping(value = "/Engineering/FC-004/**")
	public String Engineering04(ModelMap modelMap) {
        return "index";
    }
  @RequestMapping(value = "/Engineering/FC-016/Summary/**")
 	public String EngineeringSummary016(ModelMap modelMap) {
         return "index";
     }
   
   @RequestMapping(value = "/Engineering/FC-016/**")
 	public String Engineering016(ModelMap modelMap) {
         return "index";
     }
   @RequestMapping(value = "/Engineering/FC-020/Summary/**")
  	public String Engineeringsummary20(ModelMap modelMap) {
          return "index";
      }
    
    @RequestMapping(value = "/Engineering/FC-020/**")
  	public String Engineering20(ModelMap modelMap) {
          return "index";
      }
	

    @RequestMapping(value = "/COTTON_BUDS/F-04/**")
    public String cottonBudsF04(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/COTTON_BUDS/F-04/Summary/**")
    public String cottonBudsF04Summary(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/COTTON_BUDS/F-02/**")
    public String cottonBudsF02(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/COTTON_BUDS/F-02/Summary/**")
    public String cottonBudsF02Summary(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/CottonBuds/BMR/**")
    public String cottonBudsBMR(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/Buds/Buds_F038/**")
    public String budsF038(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/Buds/Buds_F038_Summary/**")
    public String budsF038Summary(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/COTTON_BUDS/F-002/**")
    public String cottonBudsF002(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/COTTON_BUDS/F-002/Summary/**")
    public String cottonBudsF002Summary(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/CottonBuds/F-001/**")
    public String cottonBudsF001(ModelMap modelMap) {
        return "index";
    }

    @RequestMapping(value = "/CottonBuds/F-001/Summary/**")
    public String cottonBudsF001Summary(ModelMap modelMap) {
        return "index";
    }
// QA
    
  @RequestMapping("/QA/F-58/Summary/**")
  public String F58Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-58/**")
  public String F58(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-59/Summary/**")
  public String F59Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-59/**")
  public String F59(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-26/Summary/**")
  public String F26Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-26/**")
  public String F26(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-49/Summary/**")
  public String F49Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-49/**")
  public String F49(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-50/Summary/**")
  public String F50Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-50/**")
  public String F50(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-52/Summary/**")
  public String F52Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-52/**")
  public String F52(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-043/Summary/**")
  public String F043Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-043/**")
  public String F043(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-045/Summary/**")
  public String F045Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-045/**")
  public String F045(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-051/Summary/**")
  public String F051Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-051/**")
  public String F051(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/QA_F047_Summary")
  public String QA_F047_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/QA_F047")
  public String QA_F047(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/QA_F_046")
  public String QA_F_046(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/QA_F_046_Summary")
  public String QA_F_046_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-06/Summary")
  public String F_06_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-06")
  public String F_06(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F007/Summary")
  public String F007_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F007")
  public String F007(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/QA_F008_Summary")
  public String QA_F008_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/QA_F008")
  public String QA_F008(ModelMap modelMap) {
      return "index";
  }

//  @RequestMapping("/QA/F-09")
//  public String F_09_1(ModelMap modelMap) {
//      return "index";
//  }

//  @RequestMapping("/QA/F-09/Summary")
//  public String F_09_Summary_1(ModelMap modelMap) {
//      return "index";
//  }

  @RequestMapping("/QualityAssurance/F-027/Summary")
  public String F_027_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-027")
  public String F_027(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-044/corrective")
  public String F_044_corrective(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-044/corrective_summary")
  public String F_044_corrective_summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-060")
  public String F_060(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-060/Summary")
  public String F_060_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-076/QA_f076_training_session_allotment_register_summary")
  public String QA_f076_training_session_allotment_register_summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-076/QA_f076_training_session_allotment_register")
  public String QA_f076_training_session_allotment_register(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-029/QA_f029_new_sample_request_summary")
  public String QA_f029_new_sample_request_summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-029/QA_f029_new_sample_request")
  public String QA_f029_new_sample_request(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/QA_F005_Summary")
  public String QA_F005_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-09")
  public String F_09(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-09/Summary")                                                                                                                                                                                                                                                                                                                                                                                             
  public String F_09_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-62")
  public String F_62(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-028_summary")
  public String F_028_summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/F-028")
  public String F_028(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-040/Summary")
  public String F_040_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/F-040")
  public String F_040(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/QA_F_041")
  public String QA_F_041(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QualityAssurance/QA_F_041_Summary")
  public String QA_F_041_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/QA_F042_Summary")
  public String QA_F042_Summary(ModelMap modelMap) {
      return "index";
  }

  @RequestMapping("/QA/QA_F042")
  public String QA_F042(ModelMap modelMap) {
      return "index";
  }
  





   
}