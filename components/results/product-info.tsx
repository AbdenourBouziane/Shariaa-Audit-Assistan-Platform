import { Card, CardContent } from "@/components/ui/card"
import { Info, FileText, Users, CreditCard } from "lucide-react"
import type { ProductSummary } from "@/types"

interface ProductInfoProps {
  productSummary: ProductSummary
}

export default function ProductInfo({ productSummary }: ProductInfoProps) {
  if (!productSummary) {
    return null
  }

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="h-1 bg-blue-500"></div>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
            <Info className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Product Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(productSummary.product_type || productSummary.contract_type) && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Contract Details</span>
                  </div>

                  <div className="space-y-2">
                    {productSummary.product_type && (
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Product Type</p>
                        <p className="font-medium">{productSummary.product_type}</p>
                      </div>
                    )}

                    {productSummary.contract_type && (
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Contract Type</p>
                        <p className="font-medium">{productSummary.contract_type}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {productSummary.main_parties && productSummary.main_parties.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Parties Involved</span>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Main Parties</p>
                    <p className="font-medium">{productSummary.main_parties.join(", ")}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              {productSummary.key_clauses && productSummary.key_clauses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                    <FileText className="h-4 w-4" />
                    <span>Key Clauses</span>
                  </div>
                  <ul className="space-y-2">
                    {productSummary.key_clauses.map((clause, index) => (
                      <li key={index} className="bg-muted/50 p-3 rounded-md text-sm">
                        {clause}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {productSummary.financial_terms && productSummary.financial_terms.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                    <CreditCard className="h-4 w-4" />
                    <span>Financial Terms</span>
                  </div>
                  <ul className="space-y-2">
                    {productSummary.financial_terms.map((term, index) => (
                      <li key={index} className="bg-muted/50 p-3 rounded-md text-sm">
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
