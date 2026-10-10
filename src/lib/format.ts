const unitNames: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

export function unitBn(unit: string) {
  return unitNames[unit.toLowerCase()] ?? unit;
}

export function formatPrice(n: number) {
  return n.toLocaleString("bn-BD", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercent(n: number) {
  return Math.abs(n).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function getBanglaDate() {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}