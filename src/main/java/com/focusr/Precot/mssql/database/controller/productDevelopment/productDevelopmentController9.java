 package com.focusr.Precot.mssql.database.controller.productDevelopment;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentLob;
import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentSheetF001;
import com.focusr.Precot.mssql.database.repository.productDevelopment.ProductDevelopmentLobRepo;
import com.focusr.Precot.mssql.database.service.Store.StoreService9;
import com.focusr.Precot.mssql.database.service.productDevelopment.productDevelopmentService9;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.ProductDevelopmentAuditRequest;
import com.focusr.Precot.payload.StoreAuditRequest;


import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayInputStream;



@RestController
@RequestMapping("/api/ProductDevelopment")
public class productDevelopmentController9 {
	
	
	@Autowired
	 private productDevelopmentService9 productDevelopment;
	
	@Autowired
	private ProductDevelopmentLobRepo productLobRepo;
	
	
	Logger log = LoggerFactory.getLogger(productDevelopmentController9.class);
	
	
	
	
	@PostMapping("/uploadImage")
	public ResponseEntity<?> saveOrUpdateProductDevelopmentImages(
	        @RequestParam("pdsNo") String pdsNo,
	        @RequestParam(value = "innerFilmI", required = false) MultipartFile innerFilmI,
	        @RequestParam(value = "outerFilmII", required = false) MultipartFile outerFilmII,
	        @RequestParam(value = "innerCartonIII", required = false) MultipartFile innerCartonIII,
	        @RequestParam(value = "outerCartonIV", required = false) MultipartFile outerCartonIV,
	    @RequestParam(value = "slipSheet", required = false) MultipartFile slipSheet)
	{

	    try {
	        // Check if the entity exists
	        Optional<ProductDevelopmentLob> optionalProductDevelopmentLob = productLobRepo.findByPdsNo(pdsNo);

	        if (optionalProductDevelopmentLob.isPresent()) {
	            // If exists, update the images
	            return productDevelopment.editProductDevelopmentImages(pdsNo, innerFilmI, outerFilmII, innerCartonIII, outerCartonIV,slipSheet);
	        } else {
	            // If not, upload the images
	            return productDevelopment.uploadImages(pdsNo, innerFilmI, outerFilmII, innerCartonIII, outerCartonIV,slipSheet);
	        }

	    } catch (Exception e) {
	        log.error("Error processing images: " + e.getMessage(), e);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to process images: " + e.getMessage()), HttpStatus.BAD_REQUEST);
	    }
	}

	
	   
	    @DeleteMapping("/deleteImage/{pdsNo}")
	    public ResponseEntity<?> deleteProductDevelopmentImages(@PathVariable String pdsNo) {
	        return productDevelopment.deleteProductDevelopmentImages(pdsNo);
	    }
	    
	    @DeleteMapping("/deleteField")
	    public ResponseEntity<?> deleteField(
	        @RequestParam String pdsNo, 
	        @RequestParam String fieldName) {
	        return productDevelopment.deleteField(pdsNo, fieldName);
	    }


	    
//	    @GetMapping("/getByPdsNo/{pdsNo}")
//	    public ResponseEntity<?> getProductDevelopmentByPdsNo(@PathVariable String pdsNo) {
//	        return productDevelopment.getProductDevelopmentByPdsNo(pdsNo);
//	    }
	    
	    @GetMapping("/getByPdsNo")
	    public ResponseEntity<?> getProductDevelopmentByPdsNo(@RequestParam String pdsNo) {
	        return productDevelopment.getProductDevelopmentByPdsNo(pdsNo);
	    }

	    
	    @GetMapping("/pdsnogeneration")
		 public ResponseEntity<?> PDSNoGenerationController() {
		     ResponseEntity<?> resp = productDevelopment.pdsnoGeneration();
		     return resp;
		 }
	    
	    @PostMapping("/ProductDevelopment/Save")
		public ResponseEntity<?> saveproductDevelopment(HttpServletRequest http,
				@Valid @RequestBody ProductDevelopmentSheetF001 ProductDevelopment, BindingResult result,
				Principal principal) {

			ResponseEntity<?> response = productDevelopment.saveProductDevelopment(ProductDevelopment, http);
			return response;

		}
	    
	    @PostMapping("/ProductDevelopment/Submit")
		public ResponseEntity<?> submitproductDevelopment(HttpServletRequest http,
				@Valid @RequestBody ProductDevelopmentSheetF001 ProductDevelopment, BindingResult result,
				Principal principal) {

			ResponseEntity<?> response = productDevelopment.submitproductDevelopment(ProductDevelopment, http);
			return response;

		}
	    
	    @PutMapping("/approveReject")
		public ResponseEntity<?> approveRejectF13(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = productDevelopment.approveReject(approveResponse, http);
			return resp;
			
		}
	    @GetMapping("/getProductDevelopment")
		 public ResponseEntity<?> getProductDevelopment(@RequestParam("pdsNo") String pdsNo) {
		     return productDevelopment.getProductDevelopment(pdsNo);
		 }
	    
	    @GetMapping("/ProductDevelopmentprint")
		 public ResponseEntity<?> ProductDevelopmentprint(@RequestParam Map<String, String> requestParams, Principal principal) {
		     String pdsNo = requestParams.get("pdsNo");
		     

		     ResponseEntity<?> resp = productDevelopment.ProductDevelopmentprint(pdsNo);
		     return resp;
		 }
	    
	    
	    @GetMapping("/getProductDevelopmentSummary")
		public ResponseEntity<?> getProductDevelopmentSummary() {
			
			ResponseEntity<?> resp = productDevelopment.getProductDevelopmentSummary();
			return resp;
		}
	    
	    @GetMapping("/api/pds")
	    public ResponseEntity<List<String>> getAllPdsNo() {
	        List<String> pdsNos = productDevelopment.getAllPdsNo();
	        return ResponseEntity.ok(pdsNos);
	    }
	    
	    @GetMapping("/lastnomenclature")
		 public ResponseEntity<?> lastnomenclature() {
		     ResponseEntity<?> resp = productDevelopment.lastnomenclature();
		     return resp;
		 }

	  
	    
//	    AUDIT 
	    
	    
	    @PostMapping("/getProductDevelopmentAudit")
		public ResponseEntity<?> getAuditSummary(@RequestBody ProductDevelopmentAuditRequest summeryrequest) {

		 ResponseEntity<?> message = productDevelopment.getAuditSummary(summeryrequest);

			return message;
		}

	    


//	    @GetMapping(value = "/images", produces = MediaType.APPLICATION_JSON_VALUE)
//	    public ResponseEntity<?> getProductDevelopmentImages(@RequestParam("pdsNo") String pdsNo) {
//	        try {
//	            // Find the entity by PDS No
//	            Optional<ProductDevelopmentLob> optionalProductDevelopmentLob = productLobRepo.findByPdsNo(pdsNo);
//
//	            if (!optionalProductDevelopmentLob.isPresent()) {
//	                return new ResponseEntity<>(new ApiResponse(false, "PDS No not found"), HttpStatus.NOT_FOUND);
//	            }
//
//	            ProductDevelopmentLob productDevelopmentLob = optionalProductDevelopmentLob.get();
//
//	            // Create a response object to send the images as base64 strings
//	            Map<String, Object> imageResponse = new HashMap<>();
//	            imageResponse.put("innerFilmI", processBlob(productDevelopmentLob.getInnerFilmI()));
//	            imageResponse.put("outerFilmII", processBlob(productDevelopmentLob.getOuterFilmII()));
//	            imageResponse.put("innerCartonIII", processBlob(productDevelopmentLob.getInnerCartonIII()));
//	            imageResponse.put("outerCartonIV", processBlob(productDevelopmentLob.getOuterCartonIV()));
//	            imageResponse.put("slipSheet", processBlob(productDevelopmentLob.getSlipSheet()));
//
//	            return new ResponseEntity<>(imageResponse, HttpStatus.OK);
//
//	        } catch (Exception e) {
//	            log.error("Error fetching images: " + e.getMessage(), e);
//	            return new ResponseEntity<>(new ApiResponse(false, "Unable to fetch images: " + e.getMessage()), HttpStatus.BAD_REQUEST);
//	        }
//	    }
//
//	    private Object processBlob(byte[] blobData) {
//	        if (blobData == null) {
//	            return null;
//	        }
//
//	        try {
//	            // Check if the blob is a PDF
//	            if (isPdf(blobData)) {
//	                // Extract images from PDF and return as a list of Base64 strings
//	                return extractImagesFromPdf(blobData);
//	            } else {
//	                // Treat as a normal image and return as a single Base64 string
//	                return Base64.getEncoder().encodeToString(blobData);
//	            }
//	        } catch (Exception e) {
//	            log.error("Error processing BLOB: " + e.getMessage(), e);
//	            return "Unsupported file type";
//	        }
//	    }
//
//	    private boolean isPdf(byte[] data) {
//	        String header = new String(data, 0, Math.min(data.length, 4)); // Read the first 4 bytes
//	        return header.startsWith("%PDF");
//	    }
//
//	    private List<String> extractImagesFromPdf(byte[] pdfBytes) {
//	        List<String> base64Images = new ArrayList<>();
//	        try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {
//	            PDFRenderer pdfRenderer = new PDFRenderer(document);
//	            for (int page = 0; page < document.getNumberOfPages(); page++) {
//	                // Render each page to an image
//	                BufferedImage image = pdfRenderer.renderImageWithDPI(page, 300); // 300 DPI for high quality
//	                // Convert BufferedImage to Base64
//	                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//	                ImageIO.write(image, "png", outputStream);
//	                base64Images.add(Base64.getEncoder().encodeToString(outputStream.toByteArray()));
//	            }
//	        } catch (Exception e) {
//	            log.error("Error extracting images from PDF: " + e.getMessage(), e);
//	        }
//	        return base64Images;
//	    }


	    @GetMapping(value = "/images", produces = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<?> getProductDevelopmentImages(@RequestParam("pdsNo") String pdsNo) {
	        try {
	            Optional<ProductDevelopmentLob> optionalProductDevelopmentLob = productLobRepo.findByPdsNo(pdsNo);

	            if (!optionalProductDevelopmentLob.isPresent()) {
	                return new ResponseEntity<>(new ApiResponse(false, "PDS No not found"), HttpStatus.NOT_FOUND);
	            }

	            ProductDevelopmentLob productDevelopmentLob = optionalProductDevelopmentLob.get();
	            Map<String, Object> imageResponse = productDevelopment.getProductImages(productDevelopmentLob);

	            return new ResponseEntity<>(imageResponse, HttpStatus.OK);

	        } catch (Exception e) {
	            return new ResponseEntity<>(new ApiResponse(false, "Unable to fetch images: " + e.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	
	


}
