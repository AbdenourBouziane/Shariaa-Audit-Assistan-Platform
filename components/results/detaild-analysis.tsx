"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { SuspiciousClause } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Search, FileText } from "lucide-react"

interface DetailedAnalysisProps {
  clauses: SuspiciousClause[]
  onSearchStandards: (clause: string) => void
}

export default function DetailedAnalysis({ clauses, onSearchStandards }: DetailedAnalysisProps) {
  if (!clauses || clauses.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Analysis Available</h3>
          <p className="text-muted-foreground">No clauses were flagged for detailed analysis.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        Analyzed Clauses
      </h3>
      <div className="space-y-6">
        {clauses.map((clause, index) => {
          const isCompliant = clause.compliant

          return (
            <Card key={index} className="overflow-hidden border-none shadow-md">
              <div className={`border-t-4 ${isCompliant ? "border-emerald-500" : "border-red-500"}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-lg">Clause #{index + 1}</h4>
                    {isCompliant ? (
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Compliant
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border-red-200 dark:border-red-800/50 flex items-center gap-1"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Non-Compliant
                      </Badge>
                    )}
                  </div>

                  <div
                    className={`${
                      isCompliant
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/30"
                        : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/30"
                    } p-4 rounded-lg mb-5 italic text-sm border`}
                  >
                    "{clause.clause}"
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Analysis:</p>
                      <p className="text-sm">{clause.reason}</p>
                    </div>

                    {!isCompliant && clause.suggested_fix && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="font-medium mb-2">Suggested Fix:</p>
                        <p className="text-sm">{clause.suggested_fix}</p>
                      </div>
                    )}

                    {clause.source_doc && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="font-medium mb-2">Source Document:</p>
                        <p className="text-sm">{clause.source_doc}</p>

                        {clause.source_text && (
                          <div className="mt-3 pl-4 border-l-2 border-muted">
                            <p className="text-sm font-medium mb-1">Context:</p>
                            <p className="text-sm italic">"{clause.source_text}..."</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => onSearchStandards(clause.clause)}
                      >
                        <Search className="h-4 w-4" />
                        Find Related Standards
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
