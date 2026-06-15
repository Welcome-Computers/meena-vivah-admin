export const getAge = (dob?: string | null) => {
  if (!dob) return "-";

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff =
    today.getMonth() - birthDate.getMonth();

  const dayDiff =
    today.getDate() - birthDate.getDate();

  // if birthday not yet happened this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && dayDiff < 0)
  ) {
    age--;
  }

  return age;
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