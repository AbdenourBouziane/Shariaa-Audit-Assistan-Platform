"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Box, Typography, Card, CardContent, Tabs, Tab, Skeleton, Alert, useTheme } from "@mui/material"
import {
  Description as FileText,
  Warning as AlertTriangle,
  MenuBook as Book,
  Balance as BalanceScale,
} from "@mui/icons-material"
import type { AuditResult, ShariahStandard } from "@/types"
import ComplianceStatus from "./results/compliance-status"
import ProductInfo from "./results/product-info"
import IssuesSummary from "./results/issues-summary"
import ViolationsList from "./results/violations-list"
import DetailedAnalysis from "./results/detailed-analysis"
import StandardsResults from "./results/standards-results"
import { fetchApplicableStandards, searchStandards } from "@/app/actions"

interface ResultsSectionProps {
  result?: AuditResult
  searchEnabled: boolean
  isLoading?: boolean
}

export default function ResultsSection({ result, searchEnabled, isLoading = false }: ResultsSectionProps) {
  const [standards, setStandards] = useState<ShariahStandard[]>([])
  const [standardsLoading, setStandardsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const theme = useTheme()

  useEffect(() => {
    if (result?.product_summary?.product_type && searchEnabled) {
      fetchStandards(result.product_summary.product_type)
    }
  }, [result, searchEnabled])

  async function fetchStandards(productType: string) {
    setStandardsLoading(true)
    setError(null)
    try {
      const fetchedStandards = await fetchApplicableStandards(productType)
      setStandards(fetchedStandards)
      setSearchQuery("")
    } catch (error) {
      console.error("Error fetching standards:", error)
      setError("Failed to fetch applicable standards. Please try again later.")
    } finally {
      setStandardsLoading(false)
    }
  }

  async function handleSearchStandards(clause: string) {
    setStandardsLoading(true)
    setSearchQuery(clause)
    setError(null)
    try {
      const fetchedStandards = await searchStandards(clause)
      setStandards(fetchedStandards)
      setTabValue(3) // Switch to Standards tab
    } catch (error) {
      console.error("Error searching standards:", error)
      setError("Failed to search standards. Please try again later.")
    } finally {
      setStandardsLoading(false)
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  if (isLoading) {
    return (
      <Box sx={{ mt: { xs: 4, lg: 0 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <BalanceScale color="primary" />
          <Typography variant="h5" component="h2" fontWeight="bold">
            Audit Results
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={0} aria-label="audit results tabs">
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <FileText fontSize="small" />
                  <span>Summary</span>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <AlertTriangle fontSize="small" />
                  <span>Violations</span>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <FileText fontSize="small" />
                  <span>Analysis</span>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Book fontSize="small" />
                  <span>Standards</span>
                </Box>
              }
            />
          </Tabs>
        </Box>

        <Box sx={{ p: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
          </Box>
        </Box>
      </Box>
    )
  }

  if (!result) {
    return (
      <Box sx={{ mt: { xs: 4, lg: 0 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <BalanceScale color="primary" />
          <Typography variant="h5" component="h2" fontWeight="bold">
            Audit Results
          </Typography>
        </Box>

        <Card elevation={4}>
          <CardContent sx={{ py: 6, textAlign: "center" }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <FileText sx={{ fontSize: 32, color: "text.secondary" }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              No Results Yet
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: "md", mx: "auto" }}>
              Submit a contract using the form to see detailed Shariah compliance analysis and recommendations.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ mt: { xs: 4, lg: 0 } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <BalanceScale color="primary" />
        <Typography variant="h5" component="h2" fontWeight="bold">
          Audit Results
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="audit results tabs">
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FileText fontSize="small" />
                <span>Summary</span>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AlertTriangle fontSize="small" />
                <span>Violations</span>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FileText fontSize="small" />
                <span>Analysis</span>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Book fontSize="small" />
                <span>Standards</span>
              </Box>
            }
          />
        </Tabs>
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 0} sx={{ p: 1 }}>
        {tabValue === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <ComplianceStatus isCompliant={result.overall_compliance} />
            {result.product_summary && <ProductInfo productSummary={result.product_summary} />}
            <IssuesSummary violations={result.violations} />
          </Box>
        )}
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 1} sx={{ p: 1 }}>
        {tabValue === 1 && <ViolationsList violations={result.violations} onSearchStandards={handleSearchStandards} />}
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 2} sx={{ p: 1 }}>
        {tabValue === 2 && (
          <DetailedAnalysis clauses={result.suspicious_clauses} onSearchStandards={handleSearchStandards} />
        )}
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 3} sx={{ p: 1 }}>
        {tabValue === 3 && (
          <StandardsResults
            standards={standards}
            searchEnabled={searchEnabled}
            searchQuery={searchQuery}
            isLoading={standardsLoading}
          />
        )}
      </Box>
    </Box>
  )
}
