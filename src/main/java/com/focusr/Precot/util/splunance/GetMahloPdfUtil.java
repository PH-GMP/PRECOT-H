
package com.focusr.Precot.util.splunance;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class GetMahloPdfUtil {

	private static final Logger log = LogManager.getLogger(GetMahloPdfUtil.class);

	public ResponseEntity<List<Resource>> getFilesAsResource(String date, String shift) {
		List<Resource> resources = new ArrayList<>();

		// 06am-02pm
		// 02pm -10.00pm
		// 10pm-06am

		System.out.println("Date Given :" + date + "Shift :" + shift);

		// Define shift time ranges
		Map<String, String[]> shiftTimes = new HashMap<>();
		shiftTimes.put("1", new String[] { "06:00:00", "14:00:00" });
		shiftTimes.put("2", new String[] { "14:00:00", "22:00:00" });
		shiftTimes.put("3", new String[] { "22:00:00", "06:00:00" });

		try {
			SimpleDateFormat inputFormat = new SimpleDateFormat("dd-MM-yyyy");
			SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");
			SimpleDateFormat monthFormat = new SimpleDateFormat("MM");
			SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");

			Date parsedDate = inputFormat.parse(date);
			String year = yearFormat.format(parsedDate);
			String month = monthFormat.format(parsedDate);
			String formattedDate = outputFormat.format(parsedDate);

			System.out.println("Parsed Date : " + " " + parsedDate);
			System.out.println("Formatted Date : " + " " + formattedDate);
			System.out.println("Year Month : " + " " + month + " " + year);

//          String prefix = "d_mahlo_printserver_Reports_Year_" + year + "_Month_" + month + "_QMS6100-" + formattedDate;

			String oldPrefix = "d_mahlo_printserver_Reports_Year_" + year + "_Month_" + month + "_QMS6100-"
					+ formattedDate;

			String newPrefix = "d_mahlo_printserver_Reports_Year_" + year + "_Year_" + year + "_Month_" + month
					+ "_QMS6100-" + formattedDate;

			log.info("Prefix {}, {}", oldPrefix, newPrefix);

//			String serverPath = AppConstantsSplunance.PDFPATHLOCAL;
//          String serverPath = AppConstantsSplunance.PDFPATHSECURE;
            String serverPath = AppConstantsSplunance.PDFPATHPROD;
            
			System.out.println("File path Prod: " + serverPath);
			
			File dir = new File(serverPath);

			File[] files = dir.listFiles((d,
					name) -> (name.toLowerCase().startsWith(oldPrefix.toLowerCase())
							|| name.toLowerCase().startsWith(newPrefix.toLowerCase()))
							&& name.toLowerCase().endsWith(".cfg.pdf"));
			
			
			System.out.println("Files : " + files);

			if (files != null) {
				for (File file : files) {
					String lastModifiedTime = new SimpleDateFormat("HH:mm:ss").format(new Date(file.lastModified()));
					if (isFileInTimeRange(lastModifiedTime, shift, shiftTimes)) {
						FileSystemResource resource = new FileSystemResource(file);
						if (resource.exists()) {
							resources.add(resource);
						}
					}
				}
			}

			if (resources.isEmpty()) {
				// No files found
				return ResponseEntity.notFound().build();
			} else {

				System.out.println("Resource Count: " + resources.size());

				return ResponseEntity.ok().body(resources);
			}
		} catch (Exception e) {
			// Handle exceptions gracefully
			e.printStackTrace();
			System.out.println("Error Reading PDF {}" + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

	/////////////

	private boolean isFileInTimeRange(String lastModifiedTime, String shift, Map<String, String[]> shiftTimes) {
		try {
			SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
			Date fileTime = timeFormat.parse(lastModifiedTime);

			String[] times = shiftTimes.get(shift);
			if (times == null) {
				return false; // Invalid shift
			}

			Date shiftStart = timeFormat.parse(times[0]);
			Date shiftEnd = timeFormat.parse(times[1]);

			// Handle shifts that cross midnight
			if (shiftEnd.before(shiftStart)) {
				shiftEnd = new Date(shiftEnd.getTime() + (24 * 60 * 60 * 1000)); // Add one day to end time
			}

			return fileTime.after(shiftStart) && fileTime.before(shiftEnd);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
