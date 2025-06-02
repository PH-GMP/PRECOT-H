import API from "../baseUrl.json";
import axios from "axios";

// function to disable special characters
export const handleKeyDown = (e) => {
  // Check if the key is alphanumeric, a dash (-), slash (/), or space ( )
  const isAlphaNumericOrSpecial = /^[a-zA-Z0-9-/ ,]$/.test(e.key);

  // Allow control keys (Backspace, Tab, Enter, etc.)
  const allowedKeys = [
    "Backspace",
    "Tab",
    "Enter",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Delete",
    "Shift",
    "Home",
    "End",
  ];

  if (!isAlphaNumericOrSpecial && !allowedKeys.includes(e.key)) {
    e.preventDefault(); // Prevent input of any other characters
  }
};

export function getTimeOnly(timestamp) {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return "N/A"; // Return "N/A" for invalid dates
  }
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const handleNumberKeyDown = (e) => {
  if (e.key === "e" || e.key === "E" || e.key === "." || e.key === "-") {
    e.preventDefault();
  }
};

export const handleDecimalNumberKeyDown = (e) => {
  if (e.key === "e" || e.key === "E" || e.key === "-") {
    e.preventDefault();
  }
};

// function to display date only in slash format
export const slashFormatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// function to print date and time in signature part
export const printDateFormat = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

// function to get year and month like January, February...
export function getYearAndMonth(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString("default", { month: "long" }); // Get full month name
  return { year, month };
}

//
export function getYear(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();

  return year;
}
// Extracts 'YYYY-MM-DD'
export function convertDate(dateString) {
  const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{4}$/;

  if (datePattern.test(dateString)) {
    return dateString.slice(0, 10);
  } else {
    return dateString;
  }
}

const departments = [
  { id: 1, department: "BLEACHING" },
  { id: 2, department: "SPUNLACE" },
  { id: 3, department: "PAD_PUNCHING" },
  { id: 4, department: "DRY_GOODS" },
  { id: 5, department: "QUALITY_CONTROL" },
  { id: 6, department: "QUALITY_ASSURANCE" },
  { id: 7, department: "PPC" },
  { id: 8, department: "STORE" },
  { id: 9, department: "DISPATCH" },
  { id: 10, department: "PRODUCT_DEVELOPMENT" },
  { id: 14, department: "HR" },
];

export function getDepartmentId(departmentName) {
  const department = departments.find(
    (dep) => dep.department === departmentName
  );
  return department ? department.id : null; // Returns the id or null if not found
}

export function getDepartmentName(departmentId) {
  console.log("getDepartment in the function", departmentId);
  const department = departments.find((dep) => dep.id == departmentId);
  console.log("department in function", department);
  return department ? department.department : null;
}

export function getYears(startYear) {
  const currentYear = new Date().getFullYear();
  let years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push({
      id: year, // `id` will be the year itself
      value: year, // `value` will also be the year itself
    });
  }

  return years;
}

// 01, 02
export function getMonthNumberFromDate(dateString) {
  const monthNumber = new Date(dateString).getMonth() + 1;
  console.log(monthNumber);
  return monthNumber;
}

// january february
export function getFullMonthFromNumber(year, month) {
  const date = new Date(year, month - 1);
  const monthName = date.toLocaleString("default", { month: "long" });

  return monthName;
}

export function splitDateAndTime(dateTimeString) {
  const [date, time] = dateTimeString.split("T");
  const formattedTime = time + ":00";
  return {
    date: date, // 2024-10-09
    time: formattedTime, // 18:55:00
  };
}

export function getFinancialYearByYear(year) {
  const nextYear = parseInt(year) + 1;
  return `${year}-${nextYear}`;
}

export function getFinancialYear(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() is zero-based

  if (month >= 4) {
    return `${year}-${year + 1}`;
  } else {
    return `${year - 1}-${year}`;
  }
}

export async function getPadPunchingMachineLov() {
  console.log("this function is calling getPadPunchingMachineLov");

  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${API.prodUrl}/Precot/api/padpunching/MachineLov`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response data", response.data);
    const transformedData = response.data.map((item, index) => ({
      id: index + 1,
      value: item.MCN,
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export function dry_goods_lov() {
  return [
    {
      id: 1,
      value: "TC10-1",
    },
    {
      id: 1,
      value: "TC10-2",
    },
  ];
}
