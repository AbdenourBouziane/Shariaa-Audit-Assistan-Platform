"use client"

import type { SyntheticEvent } from "react"
import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Divider,
  Card,
  CardContent,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
  InputAdornment,
  Grid,
} from "@mui/material"
import { Calculate, AccountBalance, Description, PictureAsPdf } from "@mui/icons-material"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { calculateZakat } from "./actions"
import type { ZakatCalculationResult } from "@/types"

// Define the financial data interface for better type safety
interface FinancialData {
  entityName: string;
  registrationNumber: string;
  zakatYear: string;
  assets: {
    cash: number;
    receivables: number;
    inventory: number;
    shortTermInvestments: number;
    prepaidExpenses: number;
    propertyEquipment: number;
    intangibleAssets: number;
    longTermInvestments: number;
  };
  liabilities: {
    tradePayables: number;
    accruedExpenses: number;
    shortTermBorrowings: number;
    taxPayable: number;
    longTermLoans: number;
    shareCapital: number;
    retainedEarnings: number;
  };
}

export default function ZakatCalculatorPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ZakatCalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [useSampleData, setUseSampleData] = useState(true)

  // Financial data state with proper typing
  const [financialData, setFinancialData] = useState<FinancialData>({
    entityName: "Sample Business LLC",
    registrationNumber: "REG12345",
    zakatYear: "2025",
    assets: {
      cash: 120000,
      receivables: 350000,
      inventory: 485000,
      shortTermInvestments: 275000,
      prepaidExpenses: 45000,
      propertyEquipment: 1250000,
      intangibleAssets: 350000,
      longTermInvestments: 500000,
    },
    liabilities: {
      tradePayables: 280000,
      accruedExpenses: 95000,
      shortTermBorrowings: 150000,
      taxPayable: 75000,
      longTermLoans: 650000,
      shareCapital: 1000000,
      retainedEarnings: 725000,
    },
  })

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleInputChange = (category: string, field: string, value: string) => {
    const numValue = value === "" ? 0 : Number.parseFloat(value)

    if (category === "entity") {
      setFinancialData((prev) => ({
        ...prev,
        [field]: value,
      }))
    } else {
      setFinancialData((prev) => {
        if (category === "assets" || category === "liabilities") {
          return {
            ...prev,
            [category]: {
              ...prev[category],
              [field]: numValue,
            },
          }
        }
        return prev
      })
    }
  }

  const handleCalculate = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Convert financial data to the format expected by the backend
      const balanceSheet = {
        "Cash and bank balances": financialData.assets.cash,
        "Trade receivables": financialData.assets.receivables,
        "Inventory": financialData.assets.inventory,
        "Short-term investments": financialData.assets.shortTermInvestments,
        "Prepaid expenses": financialData.assets.prepaidExpenses,
        "Property and equipment": financialData.assets.propertyEquipment,
        "Intangible assets": financialData.assets.intangibleAssets,
        "Long-term investments": financialData.assets.longTermInvestments,
        "Trade payables": financialData.liabilities.tradePayables,
        "Accrued expenses": financialData.liabilities.accruedExpenses,
        "Short-term borrowings": financialData.liabilities.shortTermBorrowings,
        "Tax payable": financialData.liabilities.taxPayable,
        "Long-term loans": financialData.liabilities.longTermLoans,
        "Share capital": financialData.liabilities.shareCapital,
        "Retained earnings": financialData.liabilities.retainedEarnings,
      }

      const entityInfo = {
        name: financialData.entityName,
        registration: financialData.registrationNumber,
        zakat_year: financialData.zakatYear,
      }

      const calculationResult = await calculateZakat(balanceSheet, entityInfo, useSampleData)
      setResult(calculationResult)

      // Switch to results tab
      setActiveTab(1)
    } catch (err) {
      console.error("Error calculating zakat:", err)
      setError("Failed to calculate Zakat. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateCertificate = () => {
    // This would typically call an API to generate a certificate
    alert("Certificate generation would be implemented with the backend API")
  }

  const handleGenerateReport = () => {
    // This would typically call an API to generate a detailed report
    alert("Report generation would be implemented with the backend API")
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                background: "linear-gradient(90deg, #004d40 0%, #00796b 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Zakat Calculator
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "md", mx: "auto" }}>
              Calculate your business Zakat according to AAOIFI FAS 9 standards
            </Typography>
          </Box>

          <Paper elevation={3} sx={{ mb: 6, overflow: "hidden" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="zakat calculator tabs">
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccountBalance fontSize="small" />
                      <span>Financial Data</span>
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Calculate fontSize="small" />
                      <span>Calculation Results</span>
                    </Box>
                  }
                  disabled={!result}
                />
              </Tabs>
            </Box>

            {/* Financial Data Tab */}
            <Box role="tabpanel" hidden={activeTab !== 0} sx={{ p: 3 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              <Box sx={{ mb: 4 }}>
                <Button
                  variant={useSampleData ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setUseSampleData(true)}
                  sx={{ mr: 2 }}
                >
                  Use Sample Data
                </Button>
                <Button
                  variant={!useSampleData ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setUseSampleData(false)}
                >
                  Enter Custom Data
                </Button>
              </Box>

              <Typography variant="h6" gutterBottom>
                Entity Information
              </Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Entity Name"
                    fullWidth
                    value={financialData.entityName}
                    onChange={(e) => handleInputChange("entity", "entityName", e.target.value)}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Registration Number"
                    fullWidth
                    value={financialData.registrationNumber}
                    onChange={(e) => handleInputChange("entity", "registrationNumber", e.target.value)}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Zakat Year"
                    fullWidth
                    value={financialData.zakatYear}
                    onChange={(e) => handleInputChange("entity", "zakatYear", e.target.value)}
                    disabled={useSampleData}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" gutterBottom>
                Assets
              </Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Cash and Bank Balances"
                    fullWidth
                    type="number"
                    value={financialData.assets.cash}
                    onChange={(e) => handleInputChange("assets", "cash", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Trade Receivables"
                    fullWidth
                    type="number"
                    value={financialData.assets.receivables}
                    onChange={(e) => handleInputChange("assets", "receivables", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Inventory"
                    fullWidth
                    type="number"
                    value={financialData.assets.inventory}
                    onChange={(e) => handleInputChange("assets", "inventory", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Short-term Investments"
                    fullWidth
                    type="number"
                    value={financialData.assets.shortTermInvestments}
                    onChange={(e) => handleInputChange("assets", "shortTermInvestments", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Prepaid Expenses"
                    fullWidth
                    type="number"
                    value={financialData.assets.prepaidExpenses}
                    onChange={(e) => handleInputChange("assets", "prepaidExpenses", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Property and Equipment"
                    fullWidth
                    type="number"
                    value={financialData.assets.propertyEquipment}
                    onChange={(e) => handleInputChange("assets", "propertyEquipment", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Intangible Assets"
                    fullWidth
                    type="number"
                    value={financialData.assets.intangibleAssets}
                    onChange={(e) => handleInputChange("assets", "intangibleAssets", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Long-term Investments"
                    fullWidth
                    type="number"
                    value={financialData.assets.longTermInvestments}
                    onChange={(e) => handleInputChange("assets", "longTermInvestments", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" gutterBottom>
                Liabilities and Equity
              </Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Trade Payables"
                    fullWidth
                    type="number"
                    value={financialData.liabilities.tradePayables}
                    onChange={(e) => handleInputChange("liabilities", "tradePayables", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Accrued Expenses"
                    fullWidth
                    type="number"
                    value={financialData.liabilities.accruedExpenses}
                    onChange={(e) => handleInputChange("liabilities", "accruedExpenses", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Short-term Borrowings"
                    fullWidth
                    type="number"
                    value={financialData.liabilities.shortTermBorrowings}
                    onChange={(e) => handleInputChange("liabilities", "shortTermBorrowings", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Tax Payable"
                    fullWidth
                    type="number"
                    value={financialData.liabilities.taxPayable}
                    onChange={(e) => handleInputChange("liabilities", "taxPayable", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Long-term Loans"
                    fullWidth
                    type="number"
                    value={financialData.liabilities.longTermLoans}
                    onChange={(e) => handleInputChange("liabilities", "longTermLoans", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Share Capital"
                    fullWidth
                    type="number"
                    value={financialData.liabilities.shareCapital}
                    onChange={(e) => handleInputChange("liabilities", "shareCapital", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Retained Earnings"
                    fullWidth
                    type="number"
                    value={financialData.liabilities.retainedEarnings}
                    onChange={(e) => handleInputChange("liabilities", "retainedEarnings", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    disabled={useSampleData}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleCalculate}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Calculate />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  {isLoading ? "Calculating..." : "Calculate Zakat"}
                </Button>
              </Box>
            </Box>

            {/* Results Tab */}
            <Box role="tabpanel" hidden={activeTab !== 1} sx={{ p: 3 }}>
              {result ? (
                <Box>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                      Zakat Calculation Summary
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Card elevation={2}>
                          <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                              Total Zakatable Assets
                            </Typography>
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              ${result.total_zakatable_assets.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Card elevation={2}>
                          <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                              Total Deductible Liabilities
                            </Typography>
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              ${result.total_deductible_liabilities.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Card elevation={2}>
                          <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                              Zakat Base
                            </Typography>
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              ${result.zakat_base.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Card elevation={2}>
                          <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                              Nisab Threshold
                            </Typography>
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              ${result.nisab_value.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Card elevation={2}>
                          <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                              Exceeds Nisab
                            </Typography>
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              {result.exceeds_nisab ? (
                                <Chip label="Yes" color="success" />
                              ) : (
                                <Chip label="No" color="error" />
                              )}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Card elevation={2}>
                          <CardContent sx={{ bgcolor: result.zakat_due ? "success.light" : "error.light" }}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Zakat Amount Due
                            </Typography>
                            <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
                              ${result.zakat_amount.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                      Detailed Breakdown
                    </Typography>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                          Zakatable Assets
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          {Object.entries(result.classified_accounts.zakatable_assets).map(([account, value]) => (
                            <Box
                              key={account}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                py: 1,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                                "&:last-child": { borderBottom: "none" },
                              }}
                            >
                              <Typography variant="body2">{account}</Typography>
                              <Typography variant="body2" fontWeight="medium">
                                ${(value as number).toLocaleString()}
                              </Typography>
                            </Box>
                          ))}
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                          Deductible Liabilities
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          {Object.entries(result.classified_accounts.deductible_liabilities).map(([account, value]) => (
                            <Box
                              key={account}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                py: 1,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                                "&:last-child": { borderBottom: "none" },
                              }}
                            >
                              <Typography variant="body2">{account}</Typography>
                              <Typography variant="body2" fontWeight="medium">
                                ${(value as number).toLocaleString()}
                              </Typography>
                            </Box>
                          ))}
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                      Compliance Analysis
                    </Typography>
                    <Paper elevation={1} sx={{ p: 3, bgcolor: "background.paper" }}>
                      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {result.compliance_advice || "Compliance analysis not available in demo mode."}
                      </Typography>
                    </Paper>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                      Optimization Suggestions
                    </Typography>
                    <Paper elevation={1} sx={{ p: 3, bgcolor: "background.paper" }}>
                      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {result.optimization_suggestions || "Optimization suggestions not available in demo mode."}
                      </Typography>
                    </Paper>
                  </Box>

                  <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Description />}
                      onClick={handleGenerateCertificate}
                    >
                      Generate Zakat Certificate
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<PictureAsPdf />}
                      onClick={handleGenerateReport}
                    >
                      Generate Detailed Report
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    No calculation results yet. Please calculate Zakat first.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => setActiveTab(0)} sx={{ mt: 2 }}>
                    Go to Calculator
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom>
              About Zakat Calculation
            </Typography>
            <Typography variant="body1" paragraph>
              Zakat is one of the five pillars of Islam and refers to the obligation that an individual has to donate a
              certain proportion of wealth each year to charitable causes. This calculator follows the AAOIFI FAS 9
              standards for business Zakat calculation.
            </Typography>
            <Typography variant="body1" paragraph>
              According to AAOIFI standards, Zakat is calculated at 2.5% of the Zakat base, which is determined by the
              net asset method (zakatable assets minus deductible liabilities). Zakat is only due if the Zakat base
              exceeds the Nisab threshold, which is the minimum amount of wealth a Muslim must possess before being
              obligated to pay Zakat.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}