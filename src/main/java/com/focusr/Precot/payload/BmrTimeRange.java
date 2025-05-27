package com.focusr.Precot.payload;

import java.time.LocalDate;
import java.time.LocalTime;

public interface BmrTimeRange {

	LocalDate getStartDate();

    LocalTime getStartTime();

    LocalDate getEndDate();

    LocalTime getEndTime();

}
