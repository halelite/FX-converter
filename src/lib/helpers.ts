import { Currency, Rate } from "@/app/(root)/types";
import { format, subDays, subMonths, subYears } from "date-fns";
import Decimal from "decimal.js";

export const BASE_URL = "https://api.frankfurter.dev/v2";

export type RangeKey = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y";

const RANGE_TO_DATE = {
  "1D": (d: Date) => subDays(d, 1),
  "1W": (d: Date) => subDays(d, 7),
  "1M": (d: Date) => subMonths(d, 1),
  "3M": (d: Date) => subMonths(d, 3),
  "1Y": (d: Date) => subYears(d, 1),
  "5Y": (d: Date) => subYears(d, 5),
};

const RANGE_TO_fORMATTED_DATE = {
  "1D": (d: string | Date) => format(new Date(d), "EEEE d"),
  "1W": (d: string | Date) => format(new Date(d), "cccc"),
  "1M": (d: string | Date) => format(new Date(d), "MMM d"),
  "3M": (d: string | Date) => format(new Date(d), "MMM d"),
  "1Y": (d: string | Date) => format(new Date(d), "MMM"),
  "5Y": (d: string | Date) => format(new Date(d), "yyyy"),
};

// date range helper
function getStartDate(range: RangeKey, from: Date = new Date()): string {
  return formatToIso(RANGE_TO_DATE[range](from));
}

// chart date (y-axis) format helper
export function formatChartDate(range: RangeKey, date: string | Date) {
  return RANGE_TO_fORMATTED_DATE[range](date);
}

// evenly-spaced tick sampler — always includes first and last data point
export function getEvenlySpacedTicks<T extends { date: string }>(
  data: T[],
  count: number,
): string[] {
  if (data.length === 0) return [];
  if (data.length <= count) return data.map((d) => d.date);

  const step = (data.length - 1) / (count - 1);
  const ticks: string[] = [];

  for (let i = 0; i < count; i++) {
    const index = Math.round(i * step);
    ticks.push(data[index].date);
  }

  return ticks;
}

// get currency list
export async function getCurrencies(): Promise<Currency[]> {
  const res = await fetch(`${BASE_URL}/currencies`);

  if (!res.ok) throw new Error("Failed to fetch currencies!");

  const data = await res.json();

  // add country_code
  return data.map((currency: Currency) => ({
    iso_code: currency.iso_code,
    name: currency.name,
    country_code: CURRENCY_TO_COUNTRY[currency.iso_code],
  }));
}

// convert currencies
export async function convert(
  base: string,
  quote: string,
  amount: string,
): Promise<string> {
  const res = await fetch(`${BASE_URL}/rate/${base}/${quote}`);

  if (!res.ok) throw new Error("Failed to fetch rate!");

  const d = await res.json();
  // return parseFloat((amount * d.rate).toFixed(2));
  // return new Decimal(amount).times(new Decimal(d.rate)).toFixed(2);
  return new Decimal(amount).times(d.rate).toDecimalPlaces(2).toString();
}

export const CURRENCY_TO_COUNTRY: Record<string, string> = {
  AED: "ae",
  AFN: "af",
  ALL: "al",
  AMD: "am",
  ANG: "cw",
  AOA: "ao",
  ARS: "ar",
  AUD: "au",
  AWG: "aw",
  AZN: "az",

  BAM: "ba",
  BBD: "bb",
  BDT: "bd",
  BGN: "bg",
  BHD: "bh",
  BIF: "bi",
  BMD: "bm",
  BND: "bn",
  BOB: "bo",
  BRL: "br",
  BSD: "bs",
  BTN: "bt",
  BWP: "bw",
  BYN: "by",
  BZD: "bz",

  CAD: "ca",
  CDF: "cd",
  CHF: "ch",
  CLP: "cl",
  CNY: "cn",
  CNH: "cn",
  COP: "co",
  CRC: "cr",
  CUP: "cu",
  CVE: "cv",
  CZK: "cz",

  DJF: "dj",
  DKK: "dk",
  DOP: "do",
  DZD: "dz",

  EGP: "eg",
  ERN: "er",
  ETB: "et",
  EUR: "eu",

  FJD: "fj",
  FKP: "fk",

  GBP: "gb",
  GEL: "ge",
  GGP: "gg",
  GHS: "gh",
  GIP: "gi",
  GMD: "gm",
  GNF: "gn",
  GTQ: "gt",
  GYD: "gy",

  HKD: "hk",
  HNL: "hn",
  HTG: "ht",
  HUF: "hu",

  IDR: "id",
  ILS: "il",
  IMP: "im",
  INR: "in",
  IQD: "iq",
  IRR: "ir",
  ISK: "is",

  JEP: "je",
  JMD: "jm",
  JOD: "jo",
  JPY: "jp",

  KES: "ke",
  KGS: "kg",
  KHR: "kh",
  KMF: "km",
  KPW: "kp",
  KRW: "kr",
  KWD: "kw",
  KYD: "ky",
  KZT: "kz",

  LAK: "la",
  LBP: "lb",
  LKR: "lk",
  LRD: "lr",
  LSL: "ls",
  LYD: "ly",

  MAD: "ma",
  MDL: "md",
  MGA: "mg",
  MKD: "mk",
  MMK: "mm",
  MNT: "mn",
  MOP: "mo",
  MRU: "mr",
  MUR: "mu",
  MVR: "mv",
  MWK: "mw",
  MXN: "mx",
  MYR: "my",
  MZN: "mz",

  NAD: "na",
  NGN: "ng",
  NIO: "ni",
  NOK: "no",
  NPR: "np",
  NZD: "nz",

  OMR: "om",

  PAB: "pa",
  PEN: "pe",
  PGK: "pg",
  PHP: "ph",
  PKR: "pk",
  PLN: "pl",
  PYG: "py",

  QAR: "qa",

  RON: "ro",
  RSD: "rs",
  RUB: "ru",
  RWF: "rw",

  SAR: "sa",
  SBD: "sb",
  SCR: "sc",
  SDG: "sd",
  SEK: "se",
  SGD: "sg",
  SHP: "sh",
  SLE: "sl",
  SOS: "so",
  SRD: "sr",
  SSP: "ss",
  STN: "st",
  SVC: "sv",
  SYP: "sy",
  SZL: "sz",

  THB: "th",
  TJS: "tj",
  TMT: "tm",
  TND: "tn",
  TOP: "to",
  TRY: "tr",
  TTD: "tt",
  TWD: "tw",
  TZS: "tz",

  UAH: "ua",
  UGX: "ug",
  USD: "us",
  UYU: "uy",
  UZS: "uz",

  VES: "ve",
  VND: "vn",
  VUV: "vu",

  WST: "ws",

  XAF: "cm",
  XCD: "ag",
  XOF: "sn",
  XPF: "pf",

  YER: "ye",

  ZAR: "za",
  ZMW: "zm",
  ZWL: "zw",

  MRO: "mr",
  XCG: "cw",
  ZWG: "zw",
};

type RateSearchParams = {
  base?: string;
  quotes?: string;
  date?: string;
  from?: string;
  to?: string;
};

// get exchange rates
export async function getExchangeRates(
  params: RateSearchParams = {},
): Promise<Rate[]> {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      search.set(key, value);
    }
  }

  // date conflicts with from/to
  if (search.has("date") && (search.has("from") || search.has("to"))) {
    search.delete("date");
  }

  const res = await fetch(
    `${BASE_URL}/rates${search.toString() ? `?${search}` : ""}`,
  );

  if (!res.ok) throw new Error("Failed to fetch rates!");

  return res.json();
}

// get exchange rate of a specific pair of currencies
export async function getPairExchangeRate(
  base: string,
  to: string,
): Promise<Rate> {
  const res = await fetch(`${BASE_URL}/rate/${base}/${to}`);

  if (!res.ok) throw new Error("Failed to fetch rate!");

  return res.json();
}

// change to YYYY-MM-DD format
const formatToIso = (d: Date) => format(d, "yyyy-MM-dd");

// calculate absolute and percentage change of a currency
function calculateChange(current: number, previous: number) {
  const absoluteChange = current - previous;
  const percentChange = previous === 0 ? 0 : (absoluteChange / previous) * 100;

  return {
    absoluteChange: absoluteChange,
    percentChange: percentChange,
    direction: absoluteChange > 0 ? 1 : absoluteChange < 0 ? -1 : 0,
  };
}

const DEFAULT_QUOTES = ["EUR", "GBP", "AED", "IRR", "AUD", "CAD", "CHF"];

// get the last two rates of latest pairs (for ticker section)
export async function getLatestTwoRates({
  base = "USD",
  quotes = DEFAULT_QUOTES,
}: {
  base?: string;
  quotes?: string[];
} = {}) {
  const LOOKBACK_DAYS = 5;

  const start = formatToIso(subDays(new Date(), LOOKBACK_DAYS)); // buffer for weekends/holiday on which FX may not trade
  // const end = formatToIso(new Date());

  const rates = await getExchangeRates({
    from: start,
    base,
    quotes: quotes.join(),
  });

  // const grouped = Object.groupBy(rates, r => r.quote);

  const latestPairs = quotes
    .map((q) => {
      const pairRates = rates
        .filter((r: Rate) => r.quote === q)
        .sort((a: Rate, b: Rate) => a.date.localeCompare(b.date));

      const [previous, current] = pairRates.slice(-2);
      return { previous, current };
    })
    .filter((p) => p.previous && p.current); // drop incomplete pairs
  return latestPairs;
}

// get pairs full data (including the absolute and percent change)
export async function getLatestPairsChanges() {
  const latestPairs = await getLatestTwoRates();

  return latestPairs.map((p) => ({
    pair: `${p.current.base}/${p.current.quote}`,
    rate: p.current.rate,
    date: p.current.date,
    ...calculateChange(p.current.rate, p.previous.rate),
  }));
}

// get the a pair rates in the selected range
export async function getPairRatesByRange(
  range: RangeKey,
  base: string,
  quote: string,
) {
  // No intraday data available — fall back to the last two trading days
  if (range === "1D") {
    const LOOKBACK_DAYS = 5;
    const start = formatToIso(subDays(new Date(), LOOKBACK_DAYS));

    const rates = await getExchangeRates({ base, quotes: quote, from: start });

    return rates.sort((a, b) => a.date.localeCompare(b.date)).slice(-2);
  }

  const startDate = getStartDate(range);

  const selectedRangeRates = await getExchangeRates({
    base,
    quotes: quote,
    from: startDate,
  });

  return selectedRangeRates;
}

// get the open, last, absolute change, and percentage change of a pair rates
export function getOpenLastData(rates: Rate[]) {
  const firstRateData = rates?.[0];
  const latestRateData = rates.at?.(-1)!;

  const { absoluteChange, percentChange, direction } = calculateChange(
    latestRateData?.rate,
    firstRateData?.rate,
  );

  return {
    open: firstRateData?.rate,
    last: latestRateData?.rate,
    change: absoluteChange,
    percentChange,
    direction,
  };
}

export const parsePair = (
  supportedCurrencies: Set<string>,
  pair: string | null,
): [string, string] => {
  if (!pair) {
    return ["USD", "EUR"];
  }

  const [from, to] = pair.split("/");

  if (
    !from ||
    !to ||
    !supportedCurrencies.has(from) ||
    !supportedCurrencies.has(to)
  ) {
    return ["USD", "EUR"];
  }

  return [from, to];
};

export const parseAmount = (amount: string | undefined): number => {
  if (!amount) return 1;

  try {
    const parsed = new Decimal(amount);

    return parsed.gte(0) ? parsed.toNumber() : 1;
  } catch {
    return 1;
  }
};

export const formatRate = (value: number, maxDecimal = 5) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: maxDecimal }).format(
    value,
  );
