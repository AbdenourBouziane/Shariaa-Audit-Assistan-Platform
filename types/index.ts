export type Severity = "high" | "medium" | "low"

export interface Violation {
  clause: string
  category: string
  reason: string
  suggested_fix?: string
  severity: Severity
  source_doc?: string
  search_results?: SearchResult[]
}

export interface SearchResult {
  title: string
  snippet: string
  source: string
}

export interface SuspiciousClause {
  clause: string
  compliant: boolean
  reason: string
  suggested_fix?: string
  source_doc?: string
  source_text?: string
}

export interface ProductSummary {
  product_type?: string
  contract_type?: string
  main_parties?: string[]
  key_clauses?: string[]
  financial_terms?: string[]
}

export interface AuditResult {
  overall_compliance: boolean
  product_summary?: ProductSummary
  violations: Violation[]
  suspicious_clauses: SuspiciousClause[]
}

export interface ShariahStandard {
  title: string
  summary: string
  source: string
}

// Zakat Calculator Types
export interface ZakatCalculationResult {
  classified_accounts: {
    zakatable_assets: Record<string, number>
    non_zakatable_assets: Record<string, number>
    deductible_liabilities: Record<string, number>
    non_deductible_liabilities: Record<string, number>
  }
  total_zakatable_assets: number
  total_deductible_liabilities: number
  zakat_base: number
  nisab_value: number
  zakat_rate: number
  exceeds_nisab: boolean
  zakat_due: boolean
  zakat_amount: number
  calculation_date: string
  compliance_advice?: string
  optimization_suggestions?: string
}
