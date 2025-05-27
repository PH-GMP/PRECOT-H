package com.focusr.Precot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.focusr.Precot.security.CustomUserDetailsService;
import com.focusr.Precot.security.JwtAuthenticationEntryPoint;
import com.focusr.Precot.security.JwtAuthenticationFilter;

/**
 * Created by FocusR.
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	CustomUserDetailsService customUserDetailsService;

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
				.antMatchers("/", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg", "/**/*.jpg", "/**/*.html",
						"/**/*.css", "/**/*.js", "/*.css", "/*.js", "/webjars/**", "/Dashboard", "/Precot/")
				.permitAll().antMatchers("/api/auth/**").permitAll().antMatchers("/index").permitAll()
				.antMatchers("/Precot/actuator/**").authenticated()
				.antMatchers(HttpMethod.PUT, "/Users/Service/**").permitAll().antMatchers("/dashboard").permitAll()
				.antMatchers("/openpo").permitAll().antMatchers("/closedpo").permitAll().antMatchers("/rejectedpo")
				.permitAll().antMatchers("/ack").permitAll().antMatchers("/rescheduledpo").permitAll()
				.antMatchers("/asn").permitAll().antMatchers("/asnshipmentstatus").permitAll().antMatchers("/rtv")
				.permitAll().antMatchers("/buyer").permitAll().antMatchers("/supplierCreation").permitAll()
				.antMatchers("/uploadinvoice").permitAll().antMatchers("/exportdetails").permitAll()
				.antMatchers("/statistics").permitAll().antMatchers("/buyeropenpo").permitAll()
				.antMatchers("/buyerapproval").permitAll().antMatchers("/mastercontrol").permitAll()
				.antMatchers("/createusers").permitAll().antMatchers("/viewerrorlogs").permitAll()
				.antMatchers("/definescreenaccess").permitAll().antMatchers("/rfq").permitAll()
				.antMatchers("/uploads/**").permitAll().antMatchers("/quotation").permitAll()
				.antMatchers("/financeDashboard").permitAll().antMatchers("/shipmentStatus").permitAll()
				.antMatchers("/financeCreditorAnalysis").permitAll().antMatchers("/CashflowForecasting").permitAll()
				.antMatchers("/vendorInvoiceAndDoStatus").permitAll().antMatchers("/register/**").permitAll()
				.antMatchers("/resetPwd/**").permitAll().antMatchers("/invoicedetails").permitAll()
				.antMatchers("/paymentdetails").permitAll()
				.antMatchers("/api/user/checkUsernameAvailability", "/api/user/checkEmailAvailability").permitAll()
				.antMatchers(HttpMethod.GET, "/api/polls/**", "/api/users/**").permitAll()
				.antMatchers("/oracle/service/**").permitAll().antMatchers("/dawamywallet/service/**").permitAll()
				.antMatchers("/api/Caking/Service/UpdateMailStatus/**").permitAll().antMatchers("/Precot/**")
				.permitAll().antMatchers("/choosenScreen/**").permitAll()
				.antMatchers("/api/auth/forgetPassword/resetPwd/**").permitAll().antMatchers("/welcome/**").permitAll()
				.antMatchers("/usercreate/**").permitAll().antMatchers("/userlist/**").permitAll()
				.antMatchers("/useredit/**").permitAll().antMatchers("/userEdit/**").permitAll()
				.antMatchers("/storeuser/**").permitAll().antMatchers("/storeusersummary/**").permitAll()
				.antMatchers("/api/auth/updateNewPassword/resetPwd/**").permitAll().antMatchers("/BleachingSummary/**")
				.permitAll().antMatchers("/Bleaching/**").permitAll().antMatchers("/Bleaching/F-01/Summary/**")
				.permitAll().antMatchers("/Bleaching/F-01/**").permitAll().antMatchers("/Bleaching/F-33/**").permitAll()

				.antMatchers("/Bleaching/F-04/**").permitAll().antMatchers("/Bleaching/F-05/**").permitAll()
				.antMatchers("/Bleaching/F-05/Summary/**").permitAll().antMatchers("/Bleaching/F-41/**").permitAll()
				.antMatchers("/Bleaching/F-41/Summary/**").permitAll().antMatchers("/Bleaching/F-41/edit/**")
				.permitAll().antMatchers("/Bleaching/F-42/**").permitAll().antMatchers("/Bleaching/F-42/Summary/**")
				.permitAll().antMatchers("/Generate/**").permitAll().antMatchers("/Mapping/**").permitAll()

				.antMatchers("/Bleaching/F-04/Summary/**").permitAll().antMatchers("/Bleaching/F-33/Summary/**")
				.permitAll().antMatchers("/Bleaching/F-11/**").permitAll().antMatchers("/Bleaching/F-11/Summary/**")
				.permitAll().antMatchers("/Bleaching/F-18/**").permitAll().antMatchers("/Bleaching/F-18/Summary/**")
				.permitAll().antMatchers("/Closing/**").permitAll().antMatchers("/RawMaterialIssue/**").permitAll()
				.antMatchers("/Bleaching/F-08/**").permitAll().antMatchers("/Bleaching/F-08/Summary/**").permitAll()

				.antMatchers("/Bleaching/BMR/Summary/**").permitAll().antMatchers("/Bleaching/F-36/**").permitAll()
				.antMatchers("/Bleaching/F-36/Summary/**").permitAll().antMatchers("/Bleaching/F-36/Edit/**")
				.permitAll().antMatchers("/Bleaching/F-38/**").permitAll().antMatchers("/Bleaching/F-38/HOD_Summary/**")
				.permitAll().antMatchers("/Bleaching/F-36/Supervisor_Summary/**").permitAll()
				.antMatchers("/Bleaching/F-36/Edit/**").permitAll().antMatchers("/Bleaching/F-02A/**").permitAll()
				.antMatchers("/Bleaching/F-02A/Edit/**").permitAll()

//				.antMatchers("/Precot/Spunlace/F-01/**").permitAll()
				.antMatchers("/Spunlace/F-01/**").permitAll().antMatchers("/Spunlace/F-02/**").permitAll()
				.antMatchers("/Spunlace/F-03/**").permitAll().antMatchers("/Spunlace/F-04/**").permitAll()
				.antMatchers("/Spunlace/F-05/**").permitAll().antMatchers("/Spunlace/F-06/**").permitAll()
				.antMatchers("/Spunlace/F-07/**").permitAll().antMatchers("/Spunlace/F-08/**").permitAll()
				.antMatchers("/Spunlace/F-09/**").permitAll().antMatchers("/Spunlace/F-10/**").permitAll()
				.antMatchers("/Spunlace/F-11/**").permitAll().antMatchers("/Spunlace/F-12/**").permitAll()
				.antMatchers("/Spunlace/F-13/**").permitAll().antMatchers("/Spunlace/F-14/**").permitAll()
				.antMatchers("/Spunlace/F-15/**").permitAll().antMatchers("/Spunlace/F-16/**").permitAll()
				.antMatchers("/Spunlace/F-17/**").permitAll().antMatchers("/Spunlace/F-18/**").permitAll()
				.antMatchers("/Spunlace/F-19/**").permitAll().antMatchers("/Spunlace/F-20/**").permitAll()
				.antMatchers("/Spunlace/F-21/**").permitAll().antMatchers("/Spunlace/F-22/**").permitAll()
				.antMatchers("/Spunlace/F-23/**").permitAll().antMatchers("/Spunlace/F-24/**").permitAll()
				.antMatchers("/Spunlace/F-25/**").permitAll()
				.antMatchers("/Spunlace/PackingMaterial/**").permitAll()

				.antMatchers("/Bleaching/F-02A/Summary/**").permitAll().antMatchers("/Bleaching/F-09/**").permitAll()
				.antMatchers("/Bleaching/F-09/Summary/**").permitAll()

				.antMatchers("/api/auth/updateNewPassword/**").permitAll().antMatchers("/Report/Generation/**")
				.permitAll().antMatchers("/Traceability").permitAll().antMatchers("/Spunlace/F-26/**").permitAll()

				// pad punching

				.antMatchers("/PadPunching/F-04/**").permitAll().antMatchers("/Padpunching/F-04/**").permitAll()
				.antMatchers("/PadPunching/F-14/**").permitAll().antMatchers("/PadPunching/F-05/**").permitAll()
				.antMatchers("/PadPunching/F-05_f001/**").permitAll().antMatchers("/Padpunching/F-05_f001/**")
				.permitAll().antMatchers("/PadPunching/F-08/**").permitAll().antMatchers("/PadPunching/F-06/**")
				.permitAll().antMatchers("/PadPunching/houseKeepingF010/**").permitAll()
				.antMatchers("/PadPunching/houseKeepingF006/**").permitAll()
				.antMatchers("/PadPunching/houseKeepingSummaryF006/**").permitAll()
				.antMatchers("/PadPunching/houseKeepingSummaryF010/**").permitAll().antMatchers("/PadPunching/F-17/**")
				.permitAll().antMatchers("/PadPunching/F-00/**").permitAll()

				.antMatchers("/PadPunching/F-02/**").permitAll().antMatchers("/PadPunching/F-03/**").permitAll()
				.antMatchers("/PadPunching/F-01/**").permitAll()

				// dry goods

				.antMatchers("/DryGoods/F-01/**").permitAll().antMatchers("/DryGoods/F-011/**").permitAll()
				.antMatchers("/DryGoods/F-03/**").permitAll().antMatchers("/DryGoods/F-002/**").permitAll()
				.antMatchers("/DryGoods/F-06/**").permitAll().antMatchers("/DryGoods/F-05/**").permitAll()
				.antMatchers("/DryGoods/F-10/**").permitAll().antMatchers("/DryGoods/F-14/**").permitAll()
				.antMatchers("/DryGoods/F-012/**").permitAll().antMatchers("/DryGoods/F-09/**").permitAll()
				.antMatchers("/DryGoods/F-013/**").permitAll()

				.antMatchers("/DryGoods/F-07/BMRSummary/Pleat").permitAll()

				.antMatchers("/DryGoods/F-08/BMRSummary/WoolRoll").permitAll()

				.antMatchers("/DryGoods/F-08/BMRSummary/CottonBall").permitAll()

				.antMatchers("/PadPunching/F-009").permitAll()
				
				// QC 
				
				.antMatchers("/QualityControl/AR-F-002").permitAll()
				.antMatchers("/QualityControl/AR-F-002/Summary").permitAll()
				.antMatchers("/QualityControl/F-03/Summary").permitAll()
				.antMatchers("/QualityControl/F-03").permitAll()
				.antMatchers("/QualityControl/Microbiology/Summary").permitAll()
				.antMatchers("/QualityControl/Microbiology").permitAll()
				.antMatchers("/QualityControl/F-004/Summary").permitAll()
				.antMatchers("/QualityControl/F-004").permitAll()
				.antMatchers("/QualityControl/F-005/Summary").permitAll()
				.antMatchers("/QualityControl/F-005").permitAll()
				.antMatchers("/QualityControl/F-011/Summary").permitAll()
				.antMatchers("/QualityControl/F-011").permitAll()
				.antMatchers("/QualityControl/F-13/Summary").permitAll()
				.antMatchers("/QualityControl/F-13").permitAll()
				.antMatchers("/QualityControl/F-013/Summary").permitAll()
				.antMatchers("/QualityControl/F-013").permitAll()
				.antMatchers("/QualityControl/AR_F-014/Summary").permitAll()
				.antMatchers("/QualityControl/AR_F-014").permitAll()
				.antMatchers("/QualityControl/F-016/Summary").permitAll()
				.antMatchers("/QualityControl/F-016").permitAll()
				.antMatchers("/QualityControl/F-017/Summary").permitAll()
				.antMatchers("/QualityControl/F-017").permitAll()
				.antMatchers("/QualityControl/F-025/Summary").permitAll()
				.antMatchers("/QualityControl/F-025").permitAll()
				.antMatchers("/QualityControl/F-028/Summary").permitAll()
				.antMatchers("/QualityControl/F-028").permitAll()
				.antMatchers("/QualityControl/InwardBook/Summary").permitAll()
				.antMatchers("/QualityControl/F-002").permitAll()
				.antMatchers("/QualityControl/F-001").permitAll()
				.antMatchers("/QualityControl/F-003").permitAll()
				.antMatchers("/QualityControl/AR_F-012").permitAll()
				.antMatchers("/QualityControl/AR_F-012/Summary").permitAll()
				.antMatchers("/PH-QCL01-AR-F-001/edit/").permitAll()
				.antMatchers("/PH-QCL01-AR-F-001/Summary/").permitAll()
				.antMatchers("/QualityControl/AR_F-005").permitAll()
				.antMatchers("/QualityControl/AR_F-005/Summary").permitAll()
				.antMatchers("/QualityControl/F-026/Summary").permitAll()
				.antMatchers("/QualityControl/F-026").permitAll()
				.antMatchers("/QualityControl/F-026A").permitAll()
				.antMatchers("/QualityControl/F-026A/Summary").permitAll()
				.antMatchers("/QualityControl/F-026C/Summary").permitAll()
				.antMatchers("/QualityControl/F-026C").permitAll()
				.antMatchers("/QualityControl/F-026B/Summary").permitAll()
				.antMatchers("/QualityControl/F-026B").permitAll()
				.antMatchers("/QualityControl/F-026D/Summary").permitAll()
				.antMatchers("/QualityControl/F-026D").permitAll()
				.antMatchers("/QualityControl/F-026E/Summary").permitAll()
				.antMatchers("/QualityControl/F-026E").permitAll()
				.antMatchers("/QualityControl/F-026F/Summary").permitAll()
				.antMatchers("/QualityControl/F-026F").permitAll()
				.antMatchers("/QualityControl/F-026G/Summary").permitAll()
				.antMatchers("/QualityControl/F-026G").permitAll()
				.antMatchers("/QualityControl/F-024").permitAll()
				.antMatchers("/QualityControl/F-024/Summary").permitAll()
				.antMatchers("/QualityControl/F-008").permitAll()
				.antMatchers("/QualityControl/F-008/Summary").permitAll()
				.antMatchers("/QualityControl/F-010").permitAll()
				.antMatchers("/QualityControl/F-010/Summary").permitAll()
				.antMatchers("/QualityControl/F-023/Summary").permitAll()
				.antMatchers("/QualityControl/F-023").permitAll()
				.antMatchers("/QualityControl/F-014").permitAll()
				.antMatchers("/QualityControl/F-014/Summary").permitAll()
				.antMatchers("/QualityControl/F-015/Summary").permitAll()
				.antMatchers("/QualityControl/F-015").permitAll()
				.antMatchers("/QualityControl/F-006").permitAll()
				.antMatchers("/QualityControl/F-006/Summary").permitAll()
				.antMatchers("/QualityControl/F-018").permitAll()
				.antMatchers("/QualityControl/F-018/Summary").permitAll()
				.antMatchers("/QualityControl/F-021").permitAll()
				.antMatchers("/QualityControl/F-021/Summary").permitAll()
				.antMatchers("/QualityControl/PH-QCF-027").permitAll()
				.antMatchers("/QualityControl/PH-QCF-027/Summary").permitAll()
				.antMatchers("/QualityControl/F-009").permitAll()
				.antMatchers("/QualityControl/F-009/Summary").permitAll()
				.antMatchers("/QualityControl/ARF011/Summary").permitAll()
				.antMatchers("/QualityControl/F-ARF011").permitAll()
				.antMatchers("/QC/F-04/Summary").permitAll()
				.antMatchers("/QC/F-04").permitAll()
				.antMatchers("/QC/F-05/Summary").permitAll()
				.antMatchers("/QC/F-05").permitAll()
				.antMatchers("/QualityControl/F-012").permitAll()
				.antMatchers("/QualityControl/F-012/Summary").permitAll()
				.antMatchers("/QualityControl/F-022").permitAll()
				.antMatchers("/QualityControl/F-022/Summary").permitAll()
				.antMatchers("/QualityControl/F-029").permitAll()
				.antMatchers("/QualityControl/F-029/Summary").permitAll()
				.antMatchers("/QualityControl/ARF-006/Summary").permitAll()
				.antMatchers("/QualityControl/ARF-006").permitAll()
				.antMatchers("/QualityControl/AR-F-004/Summary").permitAll()
				.antMatchers("/QualityControl/AR-F-004").permitAll()
				.antMatchers("/QC/F-07/Summary").permitAll()
				.antMatchers("/QC/F-07").permitAll()
				.antMatchers("/QualityControl/AR-F-007/Summary").permitAll()
				.antMatchers("/QualityControl/AR-F-007").permitAll()
				.antMatchers("/QualityControl/F-020/Summary").permitAll()
				.antMatchers("/QualityControl/F-020").permitAll()
				.antMatchers("/QualityControl/PH-QCF-030/Summary").permitAll()
				.antMatchers("/QualityControl/PH-QCF-030").permitAll()
				.antMatchers("/QualityControl/F-025/Summary").permitAll()
				.antMatchers("/QualityControl/F-025").permitAll()
				.antMatchers("/QualityControl/ARF011/Summary").permitAll()
				.antMatchers("/QualityControl/ARF011").permitAll()
				
				// QA
	            .antMatchers("/QualityAssurance/QA_F037_Summary/**").permitAll()
	            .antMatchers("/QualityAssurance/QA_F037/**").permitAll()
	            .antMatchers("/QA/F-23/**").permitAll()
	            .antMatchers("/QA/F-03/**").permitAll()
	            .antMatchers("/QA/PestControl/**").permitAll()
	            .antMatchers("/QA/F-01/**").permitAll()
	            .antMatchers("/QA/F-60/**").permitAll()
	            .antMatchers("/QA/rodentFull/**").permitAll()
	            .antMatchers("/QA/rodentBoxSummary/**").permitAll()
	            .antMatchers("/QA/F-18/**").permitAll()
	            
	            .antMatchers("/QA/F-15/**").permitAll()
	            .antMatchers("/QA/Inward029/**").permitAll()
	            .antMatchers("/QA/Inward030/**").permitAll()
	            .antMatchers("/QA/Inward031/**").permitAll()
	            .antMatchers("/QA/Inward032/**").permitAll()
	            .antMatchers("/QA/Inward033/**").permitAll()
	            .antMatchers("/QA/cusRegisterSummary/**").permitAll()
	            .antMatchers("/QualityAssurance/F-010/internal_audit_schedule/**").permitAll()
	            .antMatchers("/QualityAssurance/F-010/internal_audit_schedule_summary/**").permitAll()
	            .antMatchers("/QA/F-39/**").permitAll()
	            
	           
	            .antMatchers("/QA/customerComplaint/**").permitAll()
	            .antMatchers("/QA/F-002/**").permitAll()
	            .antMatchers("/QA/F-01/**").permitAll()
	            .antMatchers("/QA/F-16/**").permitAll()
	            .antMatchers("/QA/QA_F017/**").permitAll()
	            .antMatchers("/QA/QA_F017_Summary/**").permitAll()
	            .antMatchers("/QA/QA_F013_Summary/**").permitAll()
	            .antMatchers("/QA/QA_F013/**").permitAll()
	            .antMatchers("/QA/QA_F020_Summary/**").permitAll()
	            .antMatchers("/QA/QA_F020/**").permitAll()
	            
	            .antMatchers("/QA/F-21/Summary/**").permitAll()
	            .antMatchers("/QA/F-14/**").permitAll()
	            .antMatchers("/QA/F-22/**").permitAll()
	            .antMatchers("/QualityAssurance/F-034/inprocess_inspection_report/**").permitAll()
	            .antMatchers("/QualityAssurance/F-034/inprocess_inspection_report_summary/**").permitAll()
	            .antMatchers("/QualityAssurance/F-012/internal_audit_report/**").permitAll()
	            .antMatchers("/QualityAssurance/F-012/internal_audit_report_summary/**").permitAll()
	            .antMatchers("/QualityAssurance/F-035/inprocess_inspection_report_summary/**").permitAll()
	            .antMatchers("/QualityAssurance/F-035/inprocess_inspection_report/**").permitAll()
	            .antMatchers("/QualityAssurance/F-036/inprocess_inspection_report_summary/**").permitAll()
	            .antMatchers("/QualityAssurance/F-036/inprocess_inspection_report/**").permitAll()

				// STORES

				.antMatchers("/Stores/F-003/Summary/**").permitAll().antMatchers("/Stores/F-003/**").permitAll()
				.antMatchers("/Stores/F-006/Summary/**").permitAll().antMatchers("/Stores/F-006/**").permitAll()
				.antMatchers("/Stores/F-008/Summary/**").permitAll().antMatchers("/Stores/F-008/**").permitAll()
				.antMatchers("/Stores/F-009/Summary/**").permitAll().antMatchers("/Stores/F-009/**").permitAll()

				// PPC

				.antMatchers("/PPC/F-003/Summary/**").permitAll().antMatchers("/PPC/F-003/**").permitAll()
				.antMatchers("/PPC/F-002/Summary/**").permitAll().antMatchers("/PPC/F-002/**").permitAll()
				.antMatchers("/PPC/F-004/Summary/**").permitAll().antMatchers("/PPC/F-004/**").permitAll()
				
				// COTTON BUDS
				
				.antMatchers("/COTTON_BUDS/F-04/**").permitAll()
                .antMatchers("/COTTON_BUDS/F-04/Summary/**").permitAll()
                .antMatchers("/COTTON_BUDS/F-02/**").permitAll()
                .antMatchers("/COTTON_BUDS/F-02/Summary/**").permitAll()
                .antMatchers("/CottonBuds/BMR/**").permitAll()
                .antMatchers("/Buds/Buds_F038/**").permitAll()
                .antMatchers("/Buds/Buds_F038_Summary/**").permitAll()
                .antMatchers("/COTTON_BUDS/F-002/**").permitAll()
                .antMatchers("/COTTON_BUDS/F-002/Summary/**").permitAll()
                .antMatchers("/CottonBuds/F-001/**").permitAll()
                .antMatchers("/CottonBuds/F-001/Summary/**").permitAll()
				
				
//	            product develpoment
	            
	            
	            .antMatchers("/Development/F-001/Summary/**").permitAll() .antMatchers("/Development/F-001/**").permitAll()
	            
//	            Engineering
	            
	            .antMatchers("/Engineering/FC-003/Summary/**").permitAll().antMatchers("/Engineering/FC-003/**").permitAll()
	            
	            .antMatchers("/Engineering/FC-004/Summary/**").permitAll() .antMatchers("/Engineering/FC-004/**").permitAll()
	            
	            .antMatchers("/Engineering/FC-016/Summary/**").permitAll() .antMatchers("/Engineering/FC-016/**").permitAll()
	            
	            .antMatchers("/Engineering/FC-020/Summary/**").permitAll() .antMatchers("/Engineering/FC-020/**").permitAll()

	        //  vijay QA
	            .antMatchers("/QA/F-58/Summary").permitAll()
	            .antMatchers("/QA/F-58/**").permitAll()
	            .antMatchers("/QA/F-59/Summary").permitAll()
	            .antMatchers("/QA/F-59/**").permitAll()
	            .antMatchers("/QA/F-26/Summary").permitAll()
	            .antMatchers("/QA/F-26/**").permitAll()
	            .antMatchers("/QA/F-49/Summary").permitAll()
	            .antMatchers("/QA/F-49/**").permitAll()
	            .antMatchers("/QA/F-50/Summary").permitAll()
	            .antMatchers("/QA/F-50/**").permitAll()
	            .antMatchers("/QA/F-52/Summary").permitAll()
	            .antMatchers("/QA/F-52/**").permitAll()
	            .antMatchers("/QualityAssurance/F-043/Summary").permitAll()
	            .antMatchers("/QualityAssurance/F-043/**").permitAll()
	            .antMatchers("/QualityAssurance/F-045/Summary").permitAll()
	            .antMatchers("/QualityAssurance/F-045/**").permitAll()
	            .antMatchers("/QualityAssurance/F-051/Summary").permitAll()
	            .antMatchers("/QualityAssurance/F-051/**").permitAll()
	            
	            //------------------------------------
//Qa
	         
	            .antMatchers("/QA/QA_F047_Summary").permitAll()
	            .antMatchers("/QA/QA_F047").permitAll()
	            .antMatchers("/QualityAssurance/QA_F_046").permitAll()
	            .antMatchers("/QualityAssurance/QA_F_046_Summary").permitAll()
	            .antMatchers("/QA/F-06/Summary").permitAll()
	            .antMatchers("/QA/F-06").permitAll()
	            .antMatchers("/QA/F007/Summary").permitAll()
	            .antMatchers("/QA/F007").permitAll()
	            .antMatchers("/QA/QA_F008_Summary").permitAll()
	            .antMatchers("/QA/QA_F008").permitAll()
	            .antMatchers("/QA/F-09").permitAll()
	            .antMatchers("/QA/F-09/Summary").permitAll()
	            .antMatchers("/QualityAssurance/F-027/Summary").permitAll()
	            .antMatchers("/QualityAssurance/F-027").permitAll()
	            .antMatchers("/QA/F-044/corrective").permitAll()
	            .antMatchers("/QA/F-044/corrective_summary").permitAll()
	            .antMatchers("/QA/F-060").permitAll()
	            .antMatchers("/QA/F-060/Summary").permitAll()
	            .antMatchers("/QualityAssurance/F-076/QA_f076_training_session_allotment_register_summary").permitAll()
	            .antMatchers("/QualityAssurance/F-076/QA_f076_training_session_allotment_register").permitAll()
	            .antMatchers("/QualityAssurance/F-029/QA_f029_new_sample_request_summary").permitAll()
	            .antMatchers("/QualityAssurance/F-029/QA_f029_new_sample_request").permitAll()
	            .antMatchers("/QualiyAssurance/QA_F005_Summary").permitAll()
	            .antMatchers("/QA/F-09").permitAll()
	            .antMatchers("/Pre/QualityAssurance/QA_F037_Summarycot/QA/F-09/Summary").permitAll()
	            .antMatchers("/QA/F-62").permitAll()
	            .antMatchers("/QA/F-028_summary").permitAll()
	            .antMatchers("/QA/F-028").permitAll()
	            .antMatchers("/QualityAssurance/F-040/Summary").permitAll()
	            .antMatchers("/QualityAssurance/F-040").permitAll()
	            .antMatchers("/QualityAssurance/QA_F_041").permitAll()
	            .antMatchers("/QualityAssurance/QA_F_041_Summary").permitAll()
	            .antMatchers("/QA/QA_F042_Summary").permitAll()
	            .antMatchers("/QA/QA_F042").permitAll()
	            .antMatchers("/QA/F-25").permitAll()
	            .antMatchers("/QA/F-25/Summary").permitAll()
	            .antMatchers("/QA/F-048/Summary").permitAll()
	            .antMatchers("/QA/F-048").permitAll()
	            .antMatchers("/QualityAssurance/QA_F037").permitAll()
	            .antMatchers("/QualityAssurance/QA_F037_Summary").permitAll()

//		            Disptach
				.antMatchers("/Dispatch/F-001/Summary/**").permitAll().antMatchers("/Dispatch/F-001/**").permitAll()

				.antMatchers("/scheduler/service/**").permitAll().anyRequest().authenticated();

		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

	}
}