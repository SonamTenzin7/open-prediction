/**
 * Automated Market Maker (AMM) logic for Prediction Markets
 * Implementing Logarithmic Market Scoring Rule (LMSR)
 */

export interface MarketState {
  yesShares: number;
  noShares: number;
  liquidity: number; // The 'b' parameter in LMSR
}

/**
 * Calculates current price (probability) for the 'Yes' outcome.
 * Formula: P = exp(q1/b) / (exp(q1/b) + exp(q2/b))
 */
export function calculateProbability(yesShares: number, noShares: number, b: number): number {
  const e1 = Math.exp(yesShares / b);
  const e2 = Math.exp(noShares / b);
  return e1 / (e1 + e2);
}

/**
 * Cost function C(q1, q2) = b * ln(exp(q1/b) + exp(q2/b))
 */
export function calculateCost(yesShares: number, noShares: number, b: number): number {
  return b * Math.log(Math.exp(yesShares / b) + Math.exp(noShares / b));
}

/**
 * Calculate cost to buy N shares of a specific outcome
 */
export function calculateBuyCost(
  currentYes: number,
  currentNo: number,
  sharesToBuy: number,
  isYes: boolean,
  b: number
): number {
  const oldCost = calculateCost(currentYes, currentNo, b);
  const newYes = isYes ? currentYes + sharesToBuy : currentYes;
  const newNo = isYes ? currentNo : currentNo + sharesToBuy;
  const newCost = calculateCost(newYes, newNo, b);
  return newCost - oldCost;
}

/**
 * Estimate how many shares you can buy with a certain amount of currency
 * This is an approximation using an iterative approach or binary search for better precision,
 * but for this prototype we'll use a simple approximation based on current price if shares are small,
 * or a more robust calculation.
 */
export function estimateSharesForAmount(
  currentYes: number,
  currentNo: number,
  amount: number,
  isYes: boolean,
  b: number
): number {
    // Current price
    let low = 0;
    let high = amount * 2; // Rough upper bound
    
    // Simple binary search to find shares that match the cost
    for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        const cost = calculateBuyCost(currentYes, currentNo, mid, isYes, b);
        if (cost < amount) {
            low = mid;
        } else {
            high = mid;
        }
    }
    return low;
}

/**
 * Initialize B parameter based on initial probability and target liquidity
 * For LMSR, if we want an initial probability P, we can start with q1 = b * ln(P/(1-P)) and q2 = 0
 * However, commonly we start with q1=0, q2=0 for 50/50.
 * To set a custom initial probability P, we can find q1 such that exp(q1/b) / (exp(q1/b) + 1) = P
 * ln(exp(q1/b)) = ln(P/(1-P)) => q1/b = ln(P/(1-P)) => q1 = b * ln(P/(1-P))
 */
export function getInitialShares(initialProbability: number, b: number): { yes: number; no: number } {
    if (initialProbability <= 0) initialProbability = 0.01;
    if (initialProbability >= 1) initialProbability = 0.99;
    
    const q1 = b * Math.log(initialProbability / (1 - initialProbability));
    return { yes: q1, no: 0 };
}
