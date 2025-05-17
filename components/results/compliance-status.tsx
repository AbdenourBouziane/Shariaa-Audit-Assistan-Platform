import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ComplianceStatusProps {
  isCompliant: boolean
}

export default function ComplianceStatus({ isCompliant }: ComplianceStatusProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className={`h-1 ${isCompliant ? "bg-emerald-500" : "bg-red-500"}`}></div>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={`rounded-full p-2 ${isCompliant ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" : "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"}`}
          >
            {isCompliant ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Overall Compliance Status</h3>
            {isCompliant ? (
              <>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                >
                  Shariah Compliant
                </Badge>
                <p className="mt-2 text-sm text-muted-foreground">This product appears to be Shariah compliant.</p>
              </>
            ) : (
              <>
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800"
                >
                  Non-Compliant
                </Badge>
                <p className="mt-2 text-sm text-muted-foreground">
                  This product contains clauses that may violate Shariah principles.
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
