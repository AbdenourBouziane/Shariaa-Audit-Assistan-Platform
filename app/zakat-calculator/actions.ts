"use server"

import { API_ENDPOINTS, USE_DEMO_MODE } from "@/config/api"
import type { ZakatCalculationResult } from "@/types"

// Sample compliance advice for demo mode
const SAMPLE_COMPLIANCE_ADVICE = `
Based on the financial data provided and Zakat calculation results:

1. **Compliance Assessment:**
   - The calculation follows AAOIFI FAS 9 requirements for classifying zakatable assets and deductible liabilities
   - The net asset method has been correctly applied
   - The Nisab threshold comparison is appropriate

2. **Potential Issues:**
   - Short-term investments should be further classified to ensure they don't include non-zakatable securities
   - Verify that trade receivables are expected to be collected (doubtful debts may be excluded)

3. **Recommendations:**
   - Maintain separate accounting records for Zakat throughout the year
   - Consider distributing Zakat on a quarterly basis for more consistent cash flow management
   - Document detailed asset classifications for audit purposes

4. **Shariah Considerations:**
   - Ensure Zakat is distributed to eligible recipients as specified in Shariah
   - Verify timing of calculation aligns with Islamic calendar
`

// Sample optimization suggestions for demo mode
const SAMPLE_OPTIMIZATION_SUGGESTIONS = `
Here are Shariah-compliant Zakat optimization strategies:

1. **Accelerate Receivable Collection:**
   - Collect trade receivables before the Zakat calculation date
   - This converts potentially uncollectible amounts (which might be excluded) into definite zakatable cash
   - Shariah-compliant because it represents actual business improvement, not artificial manipulation

2. **Advance Payment of Short-term Liabilities:**
   - Pay outstanding short-term liabilities before calculation date
   - This is legitimate as these are actual business expenses that reduce zakatable wealth
   - Compliant because it represents actual settlement of obligations

3. **Inventory Management:**
   - Complete sales of inventory nearing calculation date
   - Time major inventory purchases after calculation date
   - Permitted as it represents normal business operations

4. **Invest in Productive Business Assets:**
   - Convert zakatable assets into non-zakatable productive business assets
   - AAOIFI standards exempt assets used in production/operations
   - Shariah-compliant as it promotes economic development

5. **Timing of Zakat Year:**
   - Choose a fiscal Zakat year when business typically has lower liquid assets
   - Permissible as long as a full lunar year (Hawl) passes between calculations
`

export async function calculateZakat(
  balanceSheet: Record<string, number>,
  entityInfo: { name: string; registration: string; zakat_year: string },
  useSampleData = false,
): Promise<ZakatCalculationResult> {
  try {
    // If we're using sample data or in demo mode, return mock data
    if (useSampleData || USE_DEMO_MODE) {
      console.info("Using sample Zakat calculation data")

      // Create a mock result based on the balance sheet data
      const zakatableAssets = {
        "Cash and bank balances": balanceSheet["Cash and bank balances"],
        "Trade receivables": balanceSheet["Trade receivables"],
        Inventory: balanceSheet["Inventory"],
        "Short-term investments": balanceSheet["Short-term investments"],
      }

      const nonZakatableAssets = {
        "Property and equipment": balanceSheet["Property and equipment"],
        "Intangible assets": balanceSheet["Intangible assets"],
        "Long-term investments": balanceSheet["Long-term investments"],
      }

      const deductibleLiabilities = {
        "Trade payables": balanceSheet["Trade payables"],
        "Accrued expenses": balanceSheet["Accrued expenses"],
        "Short-term borrowings": balanceSheet["Short-term borrowings"],
        "Tax payable": balanceSheet["Tax payable"],
      }

      const nonDeductibleLiabilities = {
        "Long-term loans": balanceSheet["Long-term loans"],
      }

      const totalZakatableAssets = Object.values(zakatableAssets).reduce((sum, val) => sum + val, 0)
      const totalDeductibleLiabilities = Object.values(deductibleLiabilities).reduce((sum, val) => sum + val, 0)
      const zakatBase = totalZakatableAssets - totalDeductibleLiabilities

      // AAOIFI standards for Nisab and rate
      const nisabValue = 5950 // Approximate value of 85g of gold at $70/g
      const zakatRate = 0.025 // 2.5%
      const exceedsNisab = zakatBase >= nisabValue
      const zakatAmount = exceedsNisab ? zakatBase * zakatRate : 0

      return {
        classified_accounts: {
          zakatable_assets: zakatableAssets,
          non_zakatable_assets: nonZakatableAssets,
          deductible_liabilities: deductibleLiabilities,
          non_deductible_liabilities: nonDeductibleLiabilities,
        },
        total_zakatable_assets: totalZakatableAssets,
        total_deductible_liabilities: totalDeductibleLiabilities,
        zakat_base: zakatBase,
        nisab_value: nisabValue,
        zakat_rate: zakatRate,
        exceeds_nisab: exceedsNisab,
        zakat_due: exceedsNisab,
        zakat_amount: zakatAmount,
        calculation_date: new Date().toISOString().split("T")[0],
        compliance_advice: SAMPLE_COMPLIANCE_ADVICE,
        optimization_suggestions: SAMPLE_OPTIMIZATION_SUGGESTIONS,
      }
    }

    // If not using sample data, call the API
    const response = await fetch(`${API_ENDPOINTS.ZAKAT_CALCULATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        financial_data: {
          balance_sheet: balanceSheet,
        },
        entity_info: entityInfo,
      }),
    })

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in calculateZakat:", error)
    throw error
  }
}
