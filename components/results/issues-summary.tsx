import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import type { Violation } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface IssuesSummaryProps {
  violations: Violation[]
}

export default function IssuesSummary({ violations }: IssuesSummaryProps) {
  if (!violations || violations.length === 0) {
    return (
      <Card className="overflow-hidden border-none shadow-md">
        <div className="h-1 bg-emerald-500"></div>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full p-2 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Issues Summary</h3>
              <p className="text-sm text-muted-foreground">No compliance issues detected.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate severity counts
  const severityCounts = {
    high: 0,
    medium: 0,
    low: 0,
  }

  // Calculate category counts
  const categoryCounts: Record<string, number> = {}

  violations.forEach((violation) => {
    const severity = violation.severity || "low"
    severityCounts[severity]++

    const category = violation.category || "other"
    categoryCounts[category] = (categoryCounts[category] || 0) + 1
  })

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="h-1 bg-amber-500"></div>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-2 bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Issues Summary</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Found {violations.length} potential compliance issue(s):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">By Severity</h4>
                <div className="bg-muted/50 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Severity</TableHead>
                        <TableHead>Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {severityCounts.high > 0 && (
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="severity severity-high"></span>
                              High
                            </div>
                          </TableCell>
                          <TableCell>{severityCounts.high}</TableCell>
                        </TableRow>
                      )}
                      {severityCounts.medium > 0 && (
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="severity severity-medium"></span>
                              Medium
                            </div>
                          </TableCell>
                          <TableCell>{severityCounts.medium}</TableCell>
                        </TableRow>
                      )}
                      {severityCounts.low > 0 && (
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="severity severity-low"></span>
                              Low
                            </div>
                          </TableCell>
                          <TableCell>{severityCounts.low}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">By Category</h4>
                <div className="bg-muted/50 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(categoryCounts).map(([category, count]) => (
                        <TableRow key={category}>
                          <TableCell>{capitalizeFirstLetter(category)}</TableCell>
                          <TableCell>{count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
