package com.focusr.Precot.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class QAUtil {
	 // Static method to convert LocalDateTime to Date
    public static Date convertLocalDateTimeToDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

//    LocalDateTime currentDate = LocalDateTime.now();
//    Date date = QAUtil.convertLocalDateTimeToDate(currentDate);
}
