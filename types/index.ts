// types/index.ts
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
  key_requirements?: string[]
}

export interface ServerHealth {
  status: string
  pdf_folder?: string
  search_enabled: boolean
  is_demo_mode: boolean
}