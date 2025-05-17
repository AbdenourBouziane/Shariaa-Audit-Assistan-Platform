import type { AuditResult, ShariahStandard } from "@/types"

// Sample audit result for demo purposes when the backend is unavailable
export const MOCK_AUDIT_RESULT: AuditResult = {
  overall_compliance: false,
  product_summary: {
    product_type: "Murabaha",
    contract_type: "Deferred Payment Sale",
    main_parties: ["Seller", "Buyer"],
    key_clauses: [
      "Deferred payment terms with profit markup",
      "Seller retains ownership until full payment",
      "Early payment penalty clause",
      "Liquidity backed by conventional bonds",
    ],
    financial_terms: ["Profit markup on deferred payment", "Early payment penalty", "Conventional bonds for liquidity"],
  },
  violations: [
    {
      clause: "An early payment penalty may apply in cases of default.",
      category: "penalty",
      reason:
        "Early payment penalties that generate profit for the lender are not permissible in Shariah. This may constitute Riba (interest).",
      suggested_fix:
        "Replace with a clause that directs any penalties to charity, or remove the penalty for early payment entirely.",
      severity: "high",
      source_doc: "AAOIFI Shariah Standard No. 3",
    },
    {
      clause: "Liquidity is backed by conventional bonds.",
      category: "investment",
      reason: "Conventional bonds are interest-based and not Shariah-compliant. They involve Riba which is prohibited.",
      suggested_fix: "Replace conventional bonds with Sukuk (Islamic bonds) or other Shariah-compliant investments.",
      severity: "high",
      source_doc: "AAOIFI Shariah Standard No. 17",
    },
  ],
  suspicious_clauses: [
    {
      clause: "This Murabaha agreement involves deferred payment terms with added profit markup.",
      compliant: true,
      reason: "Murabaha with deferred payment and clearly disclosed profit markup is permissible in Shariah.",
      source_doc: "AAOIFI Shariah Standard No. 8",
    },
    {
      clause: "The seller retains ownership until full payment.",
      compliant: true,
      reason: "Retention of ownership until full payment is permissible and protects the seller's rights.",
      source_doc: "AAOIFI Shariah Standard No. 8",
    },
    {
      clause: "An early payment penalty may apply in cases of default.",
      compliant: false,
      reason:
        "Early payment penalties that generate profit for the lender are not permissible in Shariah. This may constitute Riba (interest).",
      suggested_fix:
        "Replace with a clause that directs any penalties to charity, or remove the penalty for early payment entirely.",
      source_doc: "AAOIFI Shariah Standard No. 3",
    },
    {
      clause: "Liquidity is backed by conventional bonds.",
      compliant: false,
      reason: "Conventional bonds are interest-based and not Shariah-compliant. They involve Riba which is prohibited.",
      suggested_fix: "Replace conventional bonds with Sukuk (Islamic bonds) or other Shariah-compliant investments.",
      source_doc: "AAOIFI Shariah Standard No. 17",
    },
  ],
}

// Sample Shariah standards for demo purposes
export const MOCK_STANDARDS: ShariahStandard[] = [
  {
    title: "AAOIFI Shariah Standard No. 8: Murabaha",
    summary:
      "This standard defines the rules for Murabaha transactions where a client requests an institution to purchase an asset that the client promises to buy after the institution acquires it.",
    source: "AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions)",
  },
  {
    title: "AAOIFI Shariah Standard No. 3: Default in Payment",
    summary:
      "This standard covers the rules for handling defaults in payment, including permissible and impermissible penalties.",
    source: "AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions)",
  },
  {
    title: "AAOIFI Shariah Standard No. 17: Investment Sukuk",
    summary:
      "This standard covers the rules for Sukuk (Islamic bonds) which represent common shares in the ownership of assets, usufruct, services, or certain projects.",
    source: "AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions)",
  },
]

// Function to get standards related to a specific clause
export function getMockStandardsForClause(clause: string): ShariahStandard[] {
  const lowerClause = clause.toLowerCase()

  if (lowerClause.includes("penalty") || lowerClause.includes("default")) {
    return [
      {
        title: "AAOIFI Shariah Standard No. 3: Default in Payment",
        summary:
          "Late payment penalties that generate profit for the lender are not permissible. However, penalties directed to charity may be allowed to discourage deliberate default.",
        source: "AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions)",
      },
    ]
  }

  if (lowerClause.includes("bond") || lowerClause.includes("liquidity")) {
    return [
      {
        title: "AAOIFI Shariah Standard No. 17: Investment Sukuk",
        summary:
          "Conventional bonds are not Shariah-compliant due to their interest-based nature. Sukuk are the Islamic alternative, representing ownership in an underlying asset.",
        source: "AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions)",
      },
    ]
  }

  if (lowerClause.includes("murabaha") || lowerClause.includes("profit markup")) {
    return [
      {
        title: "AAOIFI Shariah Standard No. 8: Murabaha",
        summary:
          "Murabaha is a sale contract where the seller explicitly declares the cost and profit margin. In Islamic banking, the bank purchases an asset and sells it to the client at a markup.",
        source: "AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions)",
      },
    ]
  }

  // Default standards for any clause
  return [
    {
      title: "General Shariah Compliance Principles",
      summary:
        "Islamic finance prohibits interest (riba), excessive uncertainty (gharar), gambling (maysir), and investment in prohibited activities (haram).",
      source: "General Shariah Principles",
    },
  ]
}
