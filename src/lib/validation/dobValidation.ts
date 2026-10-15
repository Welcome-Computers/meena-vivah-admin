import dayjs from "dayjs";

export type DobValue = {
  year?: number | string;
  month?: number | string;
  day?: number | string;
};

export type DobField = "year" | "month" | "day";

export interface DobValidationError {
  field: DobField;
  message: string;
}

export interface DobValidationResult {
  isValid: boolean;
  errors: DobValidationError[];
}

interface ValidateDobOptions {
  minimumAge?: number;
}

export const validateDob = (
  dob: DobValue,
  options: ValidateDobOptions = {}
): DobValidationResult => {
  const { minimumAge = 18 } = options;

  const year = dob?.year;
  const month = dob?.month;
  const day = dob?.day;

  const errors: DobValidationError[] = [];

  // --------------------------------
  // REQUIRED VALIDATION
  // --------------------------------

  if (year === undefined || year === "") {
    errors.push({
      field: "year",
      message: "Year is required",
    });
  }

  if (month === undefined || month === "") {
    errors.push({
      field: "month",
      message: "Month is required",
    });
  }

  if (day === undefined || day === "") {
    errors.push({
      field: "day",
      message: "Day is required",
    });
  }

  // DOB incomplete
  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  // --------------------------------
  // DATE VALIDATION
  // --------------------------------

  const dobDate = dayjs(
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  );

  // Invalid date, e.g. 31 Feb
  if (!dobDate.isValid()) {
    errors.push({
      field: "day",
      message: "Invalid date",
    });

    return {
      isValid: false,
      errors,
    };
  }

  // --------------------------------
  // MINIMUM AGE
  // --------------------------------

  const minimumDob = dayjs().subtract(minimumAge, "year");

  // Age is valid
  if (
    dobDate.isBefore(minimumDob, "day") ||
    dobDate.isSame(minimumDob, "day")
  ) {
    return {
      isValid: true,
      errors: [],
    };
  }

  // --------------------------------
  // AGE ERROR
  // --------------------------------

  const minimumYear = minimumDob.year();
  const minimumMonth = minimumDob.month() + 1;
  const minimumDay = minimumDob.date();

  if (Number(year) > minimumYear) {
    errors.push({
      field: "year",
      message: `Year is not valid for ${minimumAge} years age`,
    });

    return {
      isValid: false,
      errors,
    };
  }

  if (
    Number(year) === minimumYear &&
    Number(month) > minimumMonth
  ) {
    errors.push({
      field: "month",
      message: `Month is not valid for ${minimumAge} years age`,
    });

    return {
      isValid: false,
      errors,
    };
  }

  if (
    Number(year) === minimumYear &&
    Number(month) === minimumMonth &&
    Number(day) > minimumDay
  ) {
    errors.push({
      field: "day",
      message: `Day is not valid for ${minimumAge} years age`,
    });

    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    errors: [],
  };
};