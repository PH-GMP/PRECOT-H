package com.focusr.Precot.util.productDevelopment;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;

import com.focusr.Precot.mssql.database.model.productDevelopment.audit.ProductDevelopmentSheetHistoryF001;



public class ProductDevelopmenetExcelUtill {

	
	
	public static ByteArrayResource generateF001Excel(List<ProductDevelopmentSheetHistoryF001> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get009TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF001Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	private static List<String> get009TitleLables() {
	    List<String> list = new ArrayList<>();

	    list.add("FORMAT");                     // format
	    list.add("FORMAT NO");                  // formatNo
	    list.add("SOP REFERENCE NUMBER");       // refSopNo
	    list.add("UNIT");                       // unit
	    list.add("PDS NUMBER");                 // pdsNo
	    list.add("REVISION NUMBER");            // revisionNo
	    list.add("REVISION DATE");              // revisionDate
	    list.add("PDS EFFECTIVE DATE");         // pdseffectiveDate
	    list.add("PRODUCT DESCRIPTION");        // productDescription
	    list.add("CUSTOMER NAME");              // customerName
	    list.add("PRODUCT CODE");               // productCode
	    list.add("BRAND");                      // brand
	    list.add("COUNTRY");                    // country
	    list.add("MIXING RATIO");               // mixingRatio
	    list.add("SAMPLE REQUISITION NO");      // sampleRequisitionNo
	    list.add("CUSTOMER COMMENTS");          // customerComments

	    // PRODUCT DETAILS
	    list.add("SHAPE SPECIFICATION");        // shapeSpecification 
	    list.add("SHAPE_TOLERENCE");// shapeLimit
	    list.add("SIZE SPECIFICATION");         // size
	    list.add("SIZE MIN");                   // sizeMin
	    list.add("SIZE MAX");                   // sizeMax
	    list.add("SIZE LIMIT");                 // sizeLimit

	    list.add("COUNT PER PACK");             // countPerPack
	    list.add("COUNT PER PACK MIN");         // countPerPackMin
	    list.add("COUNT PER PACK MAX");         // countPerPackMax
	    list.add("COUNT PER PACK LIMIT");       // countPerPackLimit

	    list.add("PACKS PER INNER CARTON");     // packsPerInnerCarton
	    list.add("PACKS_INNER CARTON MIN");           // packsPerInnerCartonMin
	    list.add("PACKS_INNER CARTON MAX");           // packsPerInnerCartonMax
	    list.add("PACKS_INNER CARTON LIMIT");         // packsPerInnerCartonLimit

	    list.add("INNER PER_OUTER CARTON");     // innerPerOuterCarton
	    list.add("INNER PER_OUTER CARTON MIN");           // innerPerOuterCartonMin
	    list.add("INNER PER_OUTER CARTON MAX");           // innerPerOuterCartonMax
	    list.add("INNER PER_OUTER CARTON LIMIT");         // innerPerOuterCartonLimit

	    
	    list.add("PACKS_PER_OUTER_CARTON"); // Packs per outer carton
	    list.add("PACKS_PER_OUTER_CARTON_MIN"); // Packs per outer carton min
	    list.add("PACKS_PER_OUTER_CARTON_MAX"); // Packs per outer carton max
	    list.add("PACKS_PER_OUTER_CARTON_LIMIT"); // Packs per outer carton limit
	    
	    
	    list.add("GSM"); // GSM
	    list.add("GSM_LIMIT"); // GSM limit
	    list.add("GSM_MAX"); // GSM max
	    list.add("GSM_MIN"); // GSM min
	    
	    list.add("SIDE_1_PATTERN"); // Side 1 pattern
	    list.add("SIDE_2_PATTERN"); // Side 2 pattern
	    list.add("SIDE_1_PATTERN_TOLERANCE"); // Side 1 pattern tolerance
	    list.add("SIDE_2_PATTERN_TOLERANCE"); // Side 2 pattern tolerance
	    
	    list.add("PRODUCT_SIZE"); // Product size
	    list.add("PRODUCT_TOLERANCE"); // Product tolerance
	    
	    
	    list.add("WT_INNER_EMPTY_BAG"); // Weight of inner empty bag
	    list.add("WT_INNER_EMPTY_BAG_MIN"); // Weight of inner empty bag min
	    list.add("WT_INNER_EMPTY_BAG_MAX"); // Weight of inner empty bag max
	    list.add("WT_INNER_EMPTY_BAG_LIMIT"); // Weight of inner empty bag limit
	    
	    
	    list.add("WT_OUTER_EMPTY_BAG"); // Weight of outer empty bag
	    list.add("WT_OUTER_EMPTY_BAG_MIN"); // Weight of outer empty bag min
	    list.add("WT_OUTER_EMPTY_BAG_MAX"); // Weight of outer empty bag max
	    list.add("WT_OUTER_EMPTY_BAG_LIMIT"); // Weight of outer empty bag limit
	    
	    
	    list.add("WT_EMPTY_INNER_CARTON"); // Weight of empty inner carton
	    list.add("WT_EMPTY_INNER_CARTON_MIN"); // Weight of empty inner carton min
	    list.add("WT_EMPTY_INNER_CARTON_MAX"); // Weight of empty inner carton max
	    list.add("WT_EMPTY_INNER_CARTON_LIMIT"); // Weight of empty inner carton limit
	    
	    
	    list.add("WT_EMPTY_OUTER_CARTON"); // Weight of empty outer carton
	    list.add("WT_EMPTY_OUTER_CARTON_MIN"); // Weight of empty outer carton min
	    list.add("WT_EMPTY_OUTER_CARTON_MAX"); // Weight of empty outer carton max
	    list.add("WT_EMPTY_OUTER_CARTON_LIMIT"); // Weight of empty outer carton limit
	    
	    
	    list.add("NET_WT_FILLED_PACK"); // Net weight of filled pack
	    list.add("NET_WT_FILLED_PACK_MIN"); // Net weight of filled pack min
	    list.add("NET_WT_FILLED_PACK_MAX"); // Net weight of filled pack max
	    list.add("NET_WT_FILLED_PACK_LIMIT"); // Net weight of filled pack limit
	    
	    list.add("GROSS_WT_FILLED_PACK"); // Gross weight of filled pack
	    list.add("GROSS_WT_FILLED_PACK_MIN"); // Gross weight of filled pack min
	    list.add("GROSS_WT_FILLED_PACK_MAX"); // Gross weight of filled pack max
	    list.add("GROSS_WT_FILLED_PACK_LIMIT"); // Gross weight of filled pack limit
	    
	    list.add("NET_WT_FILLED_INNER_CARTON"); // Net weight of filled inner carton
	    list.add("NET_WT_FILLED_INNER_CARTON_MIN"); // Net weight of filled inner carton min
	    list.add("NET_WT_FILLED_INNER_CARTON_MAX"); // Net weight of filled inner carton max
	    list.add("NET_WT_FILLED_INNER_CARTON_LIMIT"); // Net weight of filled inner carton limit
	    
	    list.add("GROSS_WT_FILLED_INNER_CARTON"); // Gross weight of filled inner carton
	    list.add("GROSS_WT_FILLED_INNER_CARTON_MIN"); // Gross weight of filled inner carton min
	    list.add("GROSS_WT_FILLED_INNER_CARTON_MAX"); // Gross weight of filled inner carton max
	    list.add("GROSS_WT_FILLED_INNER_CARTON_LIMIT"); // Gross weight of filled inner carton limit
	    
	    list.add("NET_WT_FILLED_OUTER_CARTON"); // Net weight of filled outer carto
	    list.add("NET_WT_FILLED_OUTER_CARTON_MIN"); // Net weight of filled outer carton min
	    list.add("NET_WT_FILLED_OUTER_CARTON_MAX"); // Net weight of filled outer carton max
	    list.add("NET_WT_FILLED_OUTER_CARTON_LIMIT"); // Net weight of filled outer carton limit
	    
	    list.add("GROSS_WT_FILLED_OUTER_CARTON"); // Gross weight of filled outer carton
	    list.add("GROSS_WT_FILLED_OUTER_CARTON_MIN"); // Gross weight of filled outer carton min
	    list.add("GROSS_WT_FILLED_OUTER_CARTON_MAX"); // Gross weight of filled outer carton max
	    list.add("GROSS_WT_FILLED_OUTER_CARTON_LIMIT"); // Gross weight of filled outer carton limit
	    
	    list.add("PRIMARY_FILM_TYPE"); // Primary film type
	    list.add("PRIMARY_FILM_THICKNESS_MICRON"); // Primary film thickness in micron
	    list.add("PRIMARY_FILM_THICKNESS_MICRON_LIMIT"); // Primary film thickness micron limit
	    list.add("PRIMARY_FILM_THICKNESS_MICRON_MIN"); // Primary film thickness micron min
	    list.add("PRIMARY_FILM_THICKNESS_MICRON_MAX"); // Primary film thickness micron max
	    list.add("PRIMARY_BAG_TYPE"); // Primary bag type
	    list.add("PRIMARY_BAG_DIMENSION"); // Primary bag dimension
	    
	    list.add("FILM_TYPE"); // Film type
	    list.add("FILM_THICKNESS_MICRON"); // Film thickness in micron
	    list.add("FILM_THICKNESS_MICRON_LIMIT"); // Film thickness micron limit
	    list.add("FILM_THICKNESS_MICRON_MIN"); // Film thickness micron min
	    list.add("FILM_THICKNESS_MICRON_MAX"); // Film thickness micron max
	    
	    
	    list.add("BAG_TYPE"); // Bag type
	    list.add("BAG_DIMENSION"); // Bag dimension
	    
	    
	    list.add("INNER_BAG"); // Inner bag
	    list.add("OUTER_BAG"); // Outer bag
	    list.add("INNER_CARTON"); // Inner carton
	    list.add("OUTER_CARTON"); // Outer carton
	    list.add("BOPP_TAPE"); // BOPP tape
	    
	    
	    list.add("JULIAN_CODING_INNER_CARTON"); // Julian coding inner carton
	    list.add("PO_NO_INNER_CARTON"); // PO number inner carton
	    list.add("MFG_DATE_INNER_CARTON"); // Manufacturing date inner carton
	    list.add("EXPIRY_DATE_INNER_CARTON"); // Expiry date inner carton
	    list.add("PRINT_LOCATION_INNER_CARTON"); // Print location inner carton
	    list.add("LOT_CODE"); // Lot code
	    list.add("MRP"); // MRP
	    list.add("USP"); // USP
	    list.add("CUSTOMER_JULIAN_CODING"); // Customer Julian coding
	    list.add("PO_NO_OUTER_BAG"); // PO number outer bag
	    list.add("MFG_DATE_OUTER_BAG"); // Manufacturing date outer bag
	    list.add("EXPIRY_DATE_OUTER_BAG"); // Expiry date outer bag
	    list.add("PRINT_LOCATION_OUTER_BAG"); // Print location outer bag
//	    list.add("PO_NO_OUTER_CARTON"); // PO number outer carton
	    
//	  
	    
	    
	    list.add("NOTES_FOR_REQURIMENT"); // Notes for requirement
	    
	    
	    list.add("INNER_CARTON_TYPE"); // Inner carton type
	    list.add("INNER_DIMENSION_OUTER_MM"); // Inner dimension outer mm
	    list.add("INNER_NO_OF_PLY"); // Inner number of ply
	    list.add("INNER_FLUTE"); // Inner flute
	    list.add("INNER_BURSTING_STRENGHT"); // Inner bursting strength
	    list.add("INNER_BOARD_GSM"); // Inner board GSM
	    
	    
	    
	    list.add("OUTER_CARTON_TYPE"); // Outer carton type
	    list.add("OUTER_CARTON_DIMENSION_MM"); // Outer carton dimension mm
	    list.add("OUTER_NO_OF_PLY"); // Outer number of ply
	    list.add("OUTER_FLUTE"); // Outer flute
	    list.add("OUTER_BURSTING_STRENGHT"); // Outer bursting strength
	    list.add("OUTER_BOARD_GSM"); // Outer board GSM
	    list.add("PLY_COLOR_1"); // Ply color 1
	    list.add("PLY_COLOR_2"); // Ply color 2
	    list.add("PLY_COLOR_3"); // Ply color 3
	    
	    
	    list.add("BAG_SEAL"); // Bag seal
	    list.add("CARTON_SEAL"); // Carton seal
	    
	    
	    list.add("BARCODE_STICKER"); // Barcode sticker
	    list.add("PLAIN_BOX_STICKER"); // Plain box sticker
	    
	    list.add("ALIGNMENT_OF_INNER_CARTON"); // Alignment of inner carton
	    list.add("ORIENTATION_OF_INNER_CARTON"); // Orientation of inner carton
	    list.add("ALIGNMENT_OF_PACKS"); // Alignment of packs
	    list.add("ORIENTATION_OF_PACKS"); // Orientation of packs
	    list.add("NATURE_OF_CHANGE"); // Orientation of packs

	    list.add("DEVELOPMENT SUPERVISOR STATUS"); 
	    list.add("DEVELOPMENTSUPERVISOR SUBMIT ON");
	    list.add("DEVELOPMENTSUPERVISOR SUBMIT BY");
	    
	  // developmentSupervisorStatus
	    
	    
	    
	    list.add("QC STATUS");       
	    list.add("QC SUBMIT ON");  
	    list.add("QC SUBMIT BY");  
	   
	    // qcStatus
	    
	    
	    list.add("QA STATUS");     
	    list.add("QA SUBMIT ON");   
	    list.add("QA SUBMIT BY");   
	  
	    
	    list.add("PPC HOD STATUS");  
	    list.add("PPC SUBMIT ON");
	    list.add("PPC SUBMIT BY");
	    
	    
	    
	    list.add("BLEACHING STATUS");
	    list.add("BLEACHING SUBMIT ON");
	    list.add("BLEACHING SUBMIT BY");
	  
	    
	    list.add("SPUNLACE STATUS");
	    list.add("SPUNLACE SUBMIT ON");
	    list.add("SPUNLACE SUBMIT BY");
	    
	    list.add("PAD PUNCHING STATUS");
	    list.add("PAD PUNCHING SUBMIT ON");
	    list.add("PAD PUNCHING SUBMIT BY");

	    list.add("DRY GOODS STATUS");
	    list.add("DRY GOODS SUBMIT ON");
	    list.add("DRY GOODS SUBMIT BY");
	    
	    list.add("REASON");                     // reason
	    list.add("VERSION");                    // version
	   
	    

	    return list;
	}



	
	private static void createF001Values(Sheet sheet, Workbook workbook, List<ProductDevelopmentSheetHistoryF001> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (ProductDevelopmentSheetHistoryF001 history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	 

	     // Main record fields - match with the entity fields
	     createCell(valueRow, columnCount++, history.getFormat(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);   
	     createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getUnit(), cellStyle);      
	     createCell(valueRow, columnCount++, history.getPdsNo(), cellStyle); // PDS Number
	     createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getRevisionDate() != null ? history.getRevisionDate().toString() : "", cellStyle); // Revision Date
	     createCell(valueRow, columnCount++, history.getPdseffectiveDate() != null ? history.getPdseffectiveDate().toString() : "", cellStyle);

	     // Product Details fields
	     createCell(valueRow, columnCount++, history.getProductDescription(), cellStyle); // Product Description
	     createCell(valueRow, columnCount++, history.getCustomerName(), cellStyle); // Customer Name
	     createCell(valueRow, columnCount++, history.getProductCode(), cellStyle); // Product Code
	     createCell(valueRow, columnCount++, history.getBrand(), cellStyle); // Brand
	     createCell(valueRow, columnCount++, history.getCountry(), cellStyle); // Country
	     createCell(valueRow, columnCount++, history.getMixingRatio(), cellStyle); // Mixing Ratio
	     createCell(valueRow, columnCount++, history.getSampleRequisitionNo(), cellStyle); // Sample Requisition No
	     createCell(valueRow, columnCount++, history.getCustomerComment(), cellStyle); // Customer Comments

	     // PRODUCT DETAILS
	     createCell(valueRow, columnCount++, history.getShapeSpecification(), cellStyle);   
	     createCell(valueRow, columnCount++, history.getShapeTolerence(), cellStyle); 
	     createCell(valueRow, columnCount++, history.getSize(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getSizeMin(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getSizeMax(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getSizelimit(), cellStyle);  
//21
	     createCell(valueRow, columnCount++, history.getCountPerPack(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getCountPerPackMin(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getCountPerPackMax(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getCountPerPackLimit(), cellStyle);  
//25
	     createCell(valueRow, columnCount++, history.getPacksPerInnerCarton(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getPacksPerInnerCartonMin(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getPacksPerInnerCartonMax(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getPacksPerInnerCartonLimit(), cellStyle);  

	     createCell(valueRow, columnCount++, history.getInnerPerOuterCarton(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getInnerPerOuterCartonMin(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getInnerPerOuterCartonMax(), cellStyle);  
	     createCell(valueRow, columnCount++, history.getInnerPerOuterCartonLimit(), cellStyle);  


	   //33
	     
	     // Remaining fields
	     createCell(valueRow, columnCount++, history.getPacksPerOuterCarton(), cellStyle); 
	     createCell(valueRow, columnCount++, history.getPacksPerOuterCartonMin(), cellStyle); // Packs per outer carton min
	     createCell(valueRow, columnCount++, history.getPacksPerOuterCartonMax(), cellStyle); // Packs per outer carton max
	     createCell(valueRow, columnCount++, history.getPacksPerOuterCartonLimit(), cellStyle); // Packs per outer carton limit
	     
	     createCell(valueRow, columnCount++, history.getGsm(), cellStyle); // GSM
	     createCell(valueRow, columnCount++, history.getGsmLimit(), cellStyle); // GSM limit
	     createCell(valueRow, columnCount++, history.getGsmMax(), cellStyle); // GSM max
	     createCell(valueRow, columnCount++, history.getGsmMin(), cellStyle); // GSM min
	     
	     createCell(valueRow, columnCount++, history.getSide1Pattern(), cellStyle); // Side 1 pattern
	     createCell(valueRow, columnCount++, history.getSide2Pattern(), cellStyle); // Side 2 pattern
	     createCell(valueRow, columnCount++, history.getSide1Patterntolerance(), cellStyle); // Side 1 pattern tolerance
	     createCell(valueRow, columnCount++, history.getSide2Patterntolerance(), cellStyle); // Side 2 pattern tolerance
	     
	     createCell(valueRow, columnCount++, history.getProductSize(), cellStyle); // Product size
	     createCell(valueRow, columnCount++, history.getProducttolerance(), cellStyle); // Product tolerance
	     
	     createCell(valueRow, columnCount++, history.getWeightInnerEmptyBag(), cellStyle); // Weight of inner empty bag
	     createCell(valueRow, columnCount++, history.getWeightInnerEmptyBagMin(), cellStyle); // Weight of inner empty bag min
	     createCell(valueRow, columnCount++, history.getWeightInnerEmptyBagMax(), cellStyle); // Weight of inner empty bag max
	     createCell(valueRow, columnCount++, history.getWeightInnerEmptyBagLimit(), cellStyle); // Weight of inner empty bag limit
	     
	     createCell(valueRow, columnCount++, history.getWeightOuterEmptyBag(), cellStyle); // Weight of outer empty bag
	     createCell(valueRow, columnCount++, history.getWeightOuterEmptyBagMin(), cellStyle); // Weight of outer empty bag min
	     createCell(valueRow, columnCount++, history.getWeightOuterEmptyBagMax(), cellStyle); // Weight of outer empty bag max
	     createCell(valueRow, columnCount++, history.getWeightOuterEmptyBagLimit(), cellStyle); // Weight of outer empty bag limit
//	   55
	     
	     createCell(valueRow, columnCount++, history.getWeightEmptyInnerCarton(), cellStyle); // Weight of empty inner carton
	     createCell(valueRow, columnCount++, history.getWeightEmptyInnerCartonMin(), cellStyle); // Weight of empty inner carton min
	     createCell(valueRow, columnCount++, history.getWeightEmptyInnerCartonMax(), cellStyle); // Weight of empty inner carton max
	     createCell(valueRow, columnCount++, history.getWeightEmptyInnerCartonLimit(), cellStyle); // Weight of empty inner carton limit
	     
	     createCell(valueRow, columnCount++, history.getWeightEmptyOuterCarton(), cellStyle); // Weight of empty outer carton
	     createCell(valueRow, columnCount++, history.getWeightEmptyOuterCartonMin(), cellStyle); // Weight of empty outer carton min
	     createCell(valueRow, columnCount++, history.getWeightEmptyOuterCartonMax(), cellStyle); // Weight of empty outer carton max
	     createCell(valueRow, columnCount++, history.getWeightEmptyOuterCartonLimit(), cellStyle); // Weight of empty outer carton limit
	     
	     createCell(valueRow, columnCount++, history.getNetWtFilledPack(), cellStyle); // Net weight of filled pack
	     createCell(valueRow, columnCount++, history.getNetWtFilledPackMin(), cellStyle); // Net weight of filled pack min
	     createCell(valueRow, columnCount++, history.getNetWtFilledPackMax(), cellStyle); // Net weight of filled pack max
	     createCell(valueRow, columnCount++, history.getNetWtFilledPackLimit(), cellStyle); // Net weight of filled pack limit
	     
	     createCell(valueRow, columnCount++, history.getGrossWtFilledPack(), cellStyle); // Gross weight of filled pack
	     createCell(valueRow, columnCount++, history.getGrossWtFilledPackMin(), cellStyle); // Gross weight of filled pack min
	     createCell(valueRow, columnCount++, history.getGrossWtFilledPackMax(), cellStyle); // Gross weight of filled pack max
	     createCell(valueRow, columnCount++, history.getGrossWtFilledPackLimit(), cellStyle); // Gross weight of filled pack limit
//	    71 
	     createCell(valueRow, columnCount++, history.getNetWtFilledInnerCarton(), cellStyle); // Net weight of filled inner carton
	     createCell(valueRow, columnCount++, history.getNetWtFilledInnerCartonMin(), cellStyle); // Net weight of filled inner carton min
	     createCell(valueRow, columnCount++, history.getNetWtFilledInnerCartonMax(), cellStyle); // Net weight of filled inner carton max
	     createCell(valueRow, columnCount++, history.getNetWtFilledInnerCartonLimit(), cellStyle); // Net weight of filled inner carton limit
	     
	     createCell(valueRow, columnCount++, history.getNetWtFilledOuterCarton(), cellStyle); // Net weight of filled outer carton
	     createCell(valueRow, columnCount++, history.getNetWtFilledOuterCartonMin(), cellStyle); // Net weight of filled outer carton min
	     createCell(valueRow, columnCount++, history.getNetWtFilledOuterCartonMax(), cellStyle); // Net weight of filled outer carton max
	     createCell(valueRow, columnCount++, history.getNetWtFilledOuterCartonLimit(), cellStyle); // Net weight of filled outer carton limit
	     
	     createCell(valueRow, columnCount++, history.getGrossWtFilledOuterCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getGrossWtFilledOuterCartonMin(), cellStyle);
	     createCell(valueRow, columnCount++, history.getGrossWtFilledOuterCartonMax(), cellStyle);
	     createCell(valueRow, columnCount++, history.getGrossWtFilledOuterCartonLimit(), cellStyle);
//83
	     
	     createCell(valueRow, columnCount++, history.getPrimaryfilmType(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPrimaryfilmThicknessMicron(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPrimaryfilmThicknessMicronLimit(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPrimaryfilmThicknessMicronMin(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPrimaryfilmThicknessMicronMax(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPrimarybagType(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPrimarybagDimension(), cellStyle);

	     // Secondary Packaging Details
	     createCell(valueRow, columnCount++, history.getFilmType(), cellStyle);
	     createCell(valueRow, columnCount++, history.getFilmThicknessMicron(), cellStyle);
	     createCell(valueRow, columnCount++, history.getFilmThicknessMicronLimit(), cellStyle);
	     createCell(valueRow, columnCount++, history.getFilmThicknessMicronMin(), cellStyle);
	     createCell(valueRow, columnCount++, history.getFilmThicknessMicronMax(), cellStyle);
	     createCell(valueRow, columnCount++, history.getBagType(), cellStyle);
	     createCell(valueRow, columnCount++, history.getBagDimension(), cellStyle);

	     // Packing Requirements
	     createCell(valueRow, columnCount++, history.getInnerbag(), cellStyle);
	     createCell(valueRow, columnCount++, history.getOuterbag(), cellStyle);
	     createCell(valueRow, columnCount++, history.getInnercarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getOutercarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getBopptape(), cellStyle);

	     // Lot Coding System & Customer Requirements -- 102
	     createCell(valueRow, columnCount++, history.getJulianCodingInnerCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPoNoInnerCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getMfgDateInnerCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getExpiryDateInnerCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPrintLocationInnerCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getLotCode(), cellStyle);
	     createCell(valueRow, columnCount++, history.getMrp(), cellStyle);
	     createCell(valueRow, columnCount++, history.getUsp(), cellStyle);
	     createCell(valueRow, columnCount++, history.getCustomerJulianCoding(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPoNoOuterBag(), cellStyle);
	     createCell(valueRow, columnCount++, history.getMfgDateOuterBag(), cellStyle);
	     createCell(valueRow, columnCount++, history.getExpiryDateOuterBag(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPrintLocationOuterBag(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPoNoOuterCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getMfgDateOuterCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getExpiryDateOuterCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPrintLocationOuterCarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getNotesofRequirment(), cellStyle);

	     // Inner Carton Details -120
	     createCell(valueRow, columnCount++, history.getInnercartonType(), cellStyle);
	     createCell(valueRow, columnCount++, history.getInnerdimensionOuterMm(), cellStyle);
	     createCell(valueRow, columnCount++, history.getInnernumberOfPly(), cellStyle);
	     createCell(valueRow, columnCount++, history.getInnerflute(), cellStyle);
	     createCell(valueRow, columnCount++, history.getInnerburstingstrenght(), cellStyle);
	     createCell(valueRow, columnCount++, history.getInnerboardgsm(), cellStyle);

	     // Outer Carton Details
	     createCell(valueRow, columnCount++, history.getOutercartonname(), cellStyle);
	     createCell(valueRow, columnCount++, history.getOuterdimensionOuterMm(), cellStyle);
	     createCell(valueRow, columnCount++, history.getOuternumberOfPly(), cellStyle);
	     createCell(valueRow, columnCount++, history.getOuterflute(), cellStyle);
	     createCell(valueRow, columnCount++, history.getOuterburstingstrenght(), cellStyle);
	     createCell(valueRow, columnCount++, history.getOuterboardgsm(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPlycolor1(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPlycolor2(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPlycolor3(), cellStyle);

	     // Sealing Quality
	     createCell(valueRow, columnCount++, history.getBagseal(), cellStyle);
	     createCell(valueRow, columnCount++, history.getCartonseal(), cellStyle);

	     // Sticker Requirements
	     createCell(valueRow, columnCount++, history.getBarcodesticker(), cellStyle);
	     createCell(valueRow, columnCount++, history.getPlainboxsticker(), cellStyle);

	     // Packing Method
	     createCell(valueRow, columnCount++, history.getAlighmentofinnercarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getOrienatationofinnercarton(), cellStyle);
	     createCell(valueRow, columnCount++, history.getAlighmentofpacks(), cellStyle);
	     createCell(valueRow, columnCount++, history.getOrientationofpacks(), cellStyle);
	     createCell(valueRow, columnCount++, history.getNatureofchange(), cellStyle);

	  // Development Supervisor Details
	     createCell(valueRow, columnCount++, history.getDevelopmentSupervisorStatus(), cellStyle);
	     createDateCell(valueRow, columnCount++, history.getDevelopmentSupervisorSubmitOn(), dateCellStyle);
	     createCell(valueRow, columnCount++, history.getDevelopmentSupervisorSubmitBy(), cellStyle);
	     

	     // QC (HOD) Details
	     createCell(valueRow, columnCount++, history.getQcStatus(), cellStyle);
	     createDateCell(valueRow, columnCount++, history.getQcSubmitOn(), dateCellStyle);
	     createCell(valueRow, columnCount++, history.getQcSubmitBy(), cellStyle);
	  

	     // QA Fields
	     createCell(valueRow, columnCount++, history.getQa_Status(), cellStyle);
	     createDateCell(valueRow, columnCount++, history.getQa_submit_on(), dateCellStyle);
	     createCell(valueRow, columnCount++, history.getQa_submit_by(), cellStyle);
	     // PPC_HOD Fields
	     createCell(valueRow, columnCount++, history.getPpc_status(), cellStyle);
	     createDateCell(valueRow, columnCount++, history.getPpc_submit_on(), dateCellStyle);
	     createCell(valueRow, columnCount++, history.getPpc_submit_by(), cellStyle);


	     // Bleaching Fields
	     createCell(valueRow, columnCount++, history.getBleaching_status(), cellStyle);
	     createDateCell(valueRow, columnCount++, history.getBleaching_submit_on(), dateCellStyle);
	     createCell(valueRow, columnCount++, history.getBleaching_submit_by(), cellStyle);


	     // Spunlace Fields
	     createCell(valueRow, columnCount++, history.getSpunlace_status(), cellStyle);
	     createDateCell(valueRow, columnCount++, history.getSpunlace_submit_on(), dateCellStyle);
	     createCell(valueRow, columnCount++, history.getSpunlace_submit_by(), cellStyle);


	     // Pad Punching Fields
	     createCell(valueRow, columnCount++, history.getPad_punching_status(), cellStyle);
	     createDateCell(valueRow, columnCount++, history.getPad_punching_submit_on(), dateCellStyle);
	     createCell(valueRow, columnCount++, history.getPad_punching_submit_by(), cellStyle);
	    
	     // Dry Goods Fields
	     createCell(valueRow, columnCount++, history.getDry_goods_status(), cellStyle);
	     createDateCell(valueRow, columnCount++, history.getDry_goods_submit_on(), dateCellStyle);
	     createCell(valueRow, columnCount++, history.getDry_goods_submit_by(), cellStyle);
	  
	        
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle); // Reason
		     createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);


	    }
	}
	
	
//	=============================================================================================================================================
// common
	private static void createCell(Row row, int columnIndex, String value, Workbook workbook) {
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		Cell cell = row.createCell(columnIndex);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}

	private static void createCell(Row row, int columnIndex, String value, CellStyle cellStyle) {
		Cell cell = row.createCell(columnIndex);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}

	private static void createDateCell(Row row, int columnIndex, Date value, CellStyle cellStyle) {
		Cell cell = row.createCell(columnIndex);
		if (value != null) {
			cell.setCellValue(value);
		} else {
			cell.setCellValue("");
		}
		cell.setCellStyle(cellStyle);
	}

	private static CellStyle setValueCellColor(Workbook workbook, HorizontalAlignment alignment, boolean wrapText,
			short color) {
		CellStyle cellStyle = workbook.createCellStyle();
		cellStyle.setAlignment(alignment);
		cellStyle.setWrapText(wrapText);
		// Set additional styling here, if needed
		return cellStyle;
	}

	private static CellStyle createDateCellStyle(Workbook workbook) {
		CellStyle cellStyle = workbook.createCellStyle();
		DataFormat format = workbook.createDataFormat();
		cellStyle.setDataFormat(format.getFormat("yyyy-MM-dd HH:mm"));
		return cellStyle;
	}


	
}
