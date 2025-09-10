package com.focusr.Precot.mssql.database.service.splunance;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceShiftWiseRPProdSupportF14Repo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.splunance.GetMahloPdfUtil;

@Service
public class ReportService {

	@Autowired
	private GetMahloPdfUtil mahloPdfUtil;
	
	@Autowired
	private SpunlaceShiftWiseRPProdSupportF14Repo shiftWiseRPProdSupportF14Repo;

	
		// CR - Logic changes validating based on order also
	
	public ResponseEntity<?> pdfApproach2(String date, String shift, String orderNumber) {
		try {
			
			// Fetch PDF files as resources
			
			System.out.println("Date : "+ date + "Shift: " + shift);
			
			ResponseEntity<List<Resource>> responseEntity = mahloPdfUtil.getFilesAsResource(date, shift);

			// Check if files were successfully retrieved
			if (responseEntity.getStatusCode() != HttpStatus.OK) {
				return ResponseEntity.status(responseEntity.getStatusCode())
						.body(new ApiResponse(false, "PDF files not found"));
			}

			List<Resource> pdfResources = responseEntity.getBody();
			List<Map<String, Object>> allTableLines = new ArrayList<>();

			// Process each PDF resource
			for (Resource resource : pdfResources) {
				try (InputStream inputStream = resource.getInputStream();
				         PDDocument document = PDDocument.load(inputStream))  {
					PDFTextStripper pdfStripper = new PDFTextStripper();
					pdfStripper.setStartPage(1); // Read only the first page
					pdfStripper.setEndPage(1);

					String text = pdfStripper.getText(document);
					
					// Check if the required text is present
					if (text.contains(" QMS REPORT STATISTICS")) {
						String[] lines = text.split(System.lineSeparator());
						List<Map<String, Object>> tableLines = extractTableData(lines, orderNumber);
						
						if(!tableLines.isEmpty()) {
							System.out.println("Extract Table Data : " + tableLines.size());
						}
						
						allTableLines.addAll(tableLines);
						
						if(!allTableLines.isEmpty()) {
							System.out.println("Total Table Data : " + allTableLines.size());
						}
					}
				} catch (IOException ex) {
					// Handle exceptions for individual files
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.body(new ApiResponse(false, "Failed to read one of the PDFs: " + ex.getMessage()));
				}
			}

			// Return response based on the data found
			if (allTableLines.isEmpty()) {
				return ResponseEntity.ok().body(new ApiResponse(false, "No data found in the PDFs"));
			} else {
				return ResponseEntity.ok().body(allTableLines);
			}
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(false, "Failed to process PDFs: " + ex.getMessage()));
		}
	}

	private List<Map<String, Object>> extractTableData(String[] lines, String orderNo) {
		List<Map<String, Object>> tableData = new ArrayList<>();
		Map<String, Object> currentRoll = null;

		
		System.out.println("Line size : "+ lines.length);
		
		for (String line : lines) {
			line = line.trim();
			
			// Skip empty lines
			if (line.isEmpty()) {
				continue;
			}

			// Split the line into parts based on whitespace
			String[] parts = line.split("\\s+");

			// Handle Roll data
			if (line.matches("^Roll:\\s+\\d+")) {
				String rollNumber = line.substring(line.indexOf(":") + 1).trim();
				currentRoll = new HashMap<>();
				
				System.out.println("Roll Number : " + rollNumber);
				
				List<String> baleNoList = shiftWiseRPProdSupportF14Repo.getBaleNoFromRoll(rollNumber);
				
				System.out.println("Total Bale count : " + baleNoList.size());

				for(String bale : baleNoList) {
					System.out.println(bale);
				}
	            // Check if the current order number matches the provided orderNo
				
	            if (orderNo == null || baleNoList.contains(orderNo)) {
	            	System.out.println("Order matches !!!");
	            	
	                currentRoll = new HashMap<>();
	                currentRoll.put("Roll", rollNumber);
	                tableData.add(currentRoll);
	            }
				
			} else if (currentRoll != null) {

				// Initialize sub-maps for weight and moisture data if not already present
				if (!currentRoll.containsKey("weight")) {
					currentRoll.put("weight", new HashMap<String, String>());
				}
				if (!currentRoll.containsKey("moisture")) {
					currentRoll.put("moisture", new HashMap<String, String>());
				}

				Map<String, String> weightMap = (Map<String, String>) currentRoll.get("weight");
				Map<String, String> moistureMap = (Map<String, String>) currentRoll.get("moisture");

				// Handle Weight g/m²
				if (line.matches("^Weight\\s+g/m².*")) {
					
					System.out.println("Parts count for Weight :" + parts.length);
					
					if (parts.length >= 7) {
						currentRoll.put("WeightAverage", parts[3]);
						currentRoll.put("WeightMinValue", parts[4]);
						currentRoll.put("WeightMaxValue", parts[5]);
					} else {
						System.err.println("Unexpected format in line: " + line);
					}
				}

				// Handle Moisture %
				else if (line.matches("^Moisture\\s+%.*")) {
					
					System.out.println("Parts count for Mositure :" + parts.length);
					
					if (parts.length >= 7) {
						currentRoll.put("MoistureAverage", parts[3]);
						currentRoll.put("MoistureMinValue", parts[4]);
						currentRoll.put("MoistureMaxValue", parts[5]);
					} else {
						System.err.println("Unexpected format in line: " + line);
					}
				}

				// Handle Weight AVG [g/m²]
				else if (line.matches("^Weight\\s+AVG\\s+\\[g/m²\\].*")) {

					for (int i = 3; i < parts.length; i++) {
						weightMap.put("Zone_" + (i - 2), parts[i]);
					}
				}

				// Handle Moisture AVG [%]
				else if (line.matches("^Moisture\\s+AVG\\s+\\[%\\].*")) {

					for (int i = 3; i < parts.length; i++) {
						moistureMap.put("Zone_" + (i - 2), parts[i]);
					}
				}
			}
		}

		return tableData;
	}

}
