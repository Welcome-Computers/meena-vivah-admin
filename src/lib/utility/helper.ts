export const getAge = (
  dob?: string | null
) => {
  if (!dob) return "-";

  const birthDate = new Date(dob);
  const today = new Date();

  let years =
    today.getFullYear() -
    birthDate.getFullYear();

  let months =
    today.getMonth() -
    birthDate.getMonth();

  // Birthday month/date not reached yet
  if (
    today.getDate() <
    birthDate.getDate()
  ) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return months > 0
    ? `${years}.${months}`
    : `${years}`;
};


export const removeEmptyObjects = (arr: any[] = []) => {
  if (!Array.isArray(arr)) return [];
  return arr.filter(
    (item) =>
      item &&
      Object.values(item).some(
        (value) =>
          value !== undefined &&
          value !== null &&
          value !== ''
      )
  );
};


const focusAndOpen = (el: HTMLElement) => {
  el.focus();

  const isAntSelect = el.classList.contains("ant-select-selector") || !!el.closest(".ant-select");

  if (isAntSelect) {
    requestAnimationFrame(() => {
      el.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          code: "ArrowDown",
          bubbles: true,
        })
      );
    });
  }
};


export const handleEnterNavigation = (
  e: React.KeyboardEvent<HTMLFormElement>
) => {
  const isEnter = e.key === "Enter";
  const isTab = e.key === "Tab";

  if (!isEnter && !isTab) return;

  e.preventDefault();

  const form = e.currentTarget;

  const elements = Array.from(
    form.querySelectorAll(
      'input, textarea, button, select, a[href], .ant-select-selector, [tabindex]'
    )
  ).filter((el) => {
    const element = el as HTMLElement;

    const tabindex = element.getAttribute("tabindex");

    return (
      element.offsetParent !== null &&
      tabindex !== "-1" &&
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-disabled") !== "true"
    );
  }) as HTMLElement[];

  const current =
    document.activeElement as HTMLElement;

  const currentIndex = elements.findIndex(
    (el) => el === current || el.contains(current)
  );

  if (currentIndex === -1) return;

  const targetIndex = e.shiftKey
    ? currentIndex - 1
    : currentIndex + 1;

  const targetElement =
    elements[targetIndex];

  if (targetElement) {
    focusAndOpen(targetElement);
  }
};


export const firstComponentFocusHandler = (formContainerRef: any) => {

  const timer = setTimeout(() => {
    const firstElement =
      formContainerRef.current?.querySelector(
        "input, .ant-select-selector"
      ) as HTMLElement | null;

    firstElement?.focus();
  }, 100);

  return () => clearTimeout(timer);
}

export const cmToFeetInch = (
  cm?: string | number | null
) => {
  const cmValue = Number(cm);

  if (!cmValue) {
    return {
      feet: null,
      inches: null,
    };
  }

  const totalInches = cmValue / 2.54;

  let feet = Math.floor(totalInches / 12);

  let inches = Math.round(
    totalInches - feet * 12
  );

  // handle 12 inches => 1 foot
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }

  return {
    feet,
    inches,
  };
};

export const isEnglishName = (record?: string | undefined) => {
  return /[a-zA-Z]/.test(record || "");
};

