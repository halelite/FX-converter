export interface Currency {
  iso_code: string;
  iso_numeric: string;
  name: string;
  symbol?: string;
  start_date: string;
  end_date: string;
  country_code: string;
}

export interface Rate {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export type CompareRate = Rate & {
  to_country_code: string;
  converted_amount: string;
  to_name: string;
};

export type PairChangeData = {
  pair: string;
  rate: number;
  date: string;
  absoluteChange: number;
  percentChange: number;
  direction: -1 | 0 | 1;
};

export type Log = {
  id: string;
  time: Date;
  pair: string;
  sendAmount: string;
  receiveAmount: string;
};

export type GroupedCurrency = Record<
  "popular" | "other currencies",
  Currency[]
>;
