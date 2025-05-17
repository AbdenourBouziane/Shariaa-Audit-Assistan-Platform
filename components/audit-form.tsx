"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material"
import { Settings, Info, Search } from "@mui/icons-material"
import { auditProduct } from "@/app/actions"
import type { AuditResult } from "@/types"

interface AuditFormProps {
  initialExample?: string
  searchEnabled?: boolean
  onResult: (result: AuditResult) => void
  disabled?: boolean
}

export default function AuditForm({
  initialExample = "",
  searchEnabled = true,
  onResult,
  disabled = false,
}: AuditFormProps) {
  const [productText, setProductText] = useState(initialExample)
  const [useSearch, setUseSearch] = useState(searchEnabled)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!productText.trim()) {
      return
    }

    setError(null)
    try {
      setIsPending(true)
      const result = await auditProduct(productText, useSearch)
      onResult(result)
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("Failed to process the audit. Please try again later.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card
      elevation={6}
      sx={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ height: 4, bgcolor: "primary.main" }} />
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Search color="primary" />
          <Typography variant="h6">Input Contract</Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {disabled && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            The audit functionality is currently unavailable because the backend server is offline.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              bgcolor: "action.hover",
              borderRadius: 2,
              p: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Settings fontSize="small" color="primary" />
                <Typography variant="subtitle2">Audit Settings</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={useSearch}
                    onChange={(e) => setUseSearch(e.target.checked)}
                    disabled={!searchEnabled || disabled}
                    color="primary"
                  />
                }
                label={<Typography variant="body2">Enable External Search</Typography>}
              />
              <Tooltip
                title="When enabled, the system will search external Shariah standards databases for more comprehensive analysis"
                arrow
              >
                <Info fontSize="small" color="action" sx={{ cursor: "help" }} />
              </Tooltip>
            </Box>
            {!searchEnabled && (
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Note: Search is disabled on the server. Contact administrator to enable it.
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Enter Financial Product Description/Contract:
            </Typography>
            <TextField
              multiline
              fullWidth
              minRows={8}
              maxRows={15}
              value={productText}
              onChange={(e) => setProductText(e.target.value)}
              placeholder="Paste your contract or product description here..."
              required
              variant="outlined"
              disabled={disabled}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isPending || !productText.trim() || disabled}
            sx={{
              py: 1.5,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {isPending ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                <span>Processing...</span>
              </Box>
            ) : (
              "Perform Shariah Audit"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
