"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Violation } from "@/types"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle } from "lucide-react"

interface ViolationsListProps {
  violations: Violation[]
  onSearchStandards: (clause: string) => void
}

export default function ViolationsList({ violations, onSearchStandards }: ViolationsListProps) {
  if (!violations || violations.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mb-4">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Issues Found</h3>
          <p className="text-muted-foreground">No compliance issues were detected in this contract.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {violations.map((violation, index) => {
        const severityClass = `severity-${violation.severity || "low"}`
        const severityColor =
          violation.severity === "high"
            ? "border-red-500 bg-red-50 dark:bg-red-950/30"
            : violation.severity === "medium"
              ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
              : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"

        return (
          <Card key={index} className="overflow-hidden border-none shadow-md">
            <div
              className={`border-l-4 ${
                violation.severity === "high"
                  ? "border-red-500"
                  : violation.severity === "medium"
                    ? "border-amber-500"
                    : "border-emerald-500"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`severity ${severityClass}`}></span>
                  <h4 className="font-semibold text-lg">
                    Issue #{index + 1} - {capitalizeFirstLetter(violation.category || "Other")}
                  </h4>
                </div>

                <div className={`${severityColor} p-4 rounded-lg mb-5 italic text-sm`}>"{violation.clause}"</div>

                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="font-medium mb-2">Reason:</p>
                    <p className="text-sm">{violation.reason}</p>
                  </div>

                  {violation.suggested_fix && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Suggested Fix:</p>
                      <p className="text-sm">{violation.suggested_fix}</p>
                    </div>
                  )}

                  {violation.source_doc && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Source:</p>
                      <p className="text-sm">{violation.source_doc}</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => onSearchStandards(violation.clause)}
                    >
                      <Search className="h-4 w-4" />
                      Find Related Standards
                    </Button>
                  </div>

                  {violation.search_results && violation.search_results.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h5 className="font-medium mb-3">Related Standards:</h5>
                      <div className="space-y-3">
                        {violation.search_results.map((result, idx) => (
                          <div key={idx} className="bg-accent/50 p-4 rounded-lg">
                            <div className="font-medium text-primary mb-2">{result.title}</div>
                            <p className="text-sm mb-2">{result.snippet}</p>
                            <div className="text-xs text-muted-foreground italic">Source: {result.source}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
