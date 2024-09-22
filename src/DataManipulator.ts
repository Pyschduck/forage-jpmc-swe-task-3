import { ServerRespond } from './DataStreamer';

interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  timestamp: Date;
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | null;
}

export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Record<string, (string | number | boolean | Date)[]> {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1.05;
    const lowerBound = 0.95;
    const triggerAlert = ratio > upperBound || ratio < lowerBound ? ratio : null;

    return {
      price_abc: [priceABC],
      price_def: [priceDEF],
      ratio: [ratio],
      timestamp: [serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp],
      upper_bound: [upperBound],
      lower_bound: [lowerBound],
      trigger_alert: [triggerAlert],
    };
  }
}
