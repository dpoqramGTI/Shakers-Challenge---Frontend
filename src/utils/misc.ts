export const formatThousands = (value: number | string | null | undefined) => {
  if (value == null) return "";
  const num = typeof value === "number" ? value : parseFloat(String(value));
  if (isNaN(num)) return "";
  return String(Math.trunc(num)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
