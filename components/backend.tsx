"use client"

import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Alert } from "@mui/material"
import { Settings } from "@mui/icons-material"
import { API_BASE_URL } from "@/config/api"

interface BackendConfigProps {
  open: boolean
  onClose: () => void
}

export default function BackendConfig({ open, onClose }: BackendConfigProps) {
  const [apiUrl, setApiUrl] = useState(API_BASE_URL)
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    // In a real app, this would save to localStorage or a settings API
    // For now, we'll just show how to set it via environment variable
    setError(null)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Settings fontSize="small" />
        Backend Configuration
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            The backend server URL is currently set to:
          </Typography>
          <Typography variant="body1" fontWeight="medium" sx={{ mb: 2 }}>
            {API_BASE_URL}
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            To change the backend URL, you need to set the <code>NEXT_PUBLIC_API_URL</code> environment variable.
          </Alert>
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          How to set the environment variable:
        </Typography>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
            fontFamily: "monospace",
            fontSize: "0.875rem",
            mb: 2,
          }}
        >
          <Typography variant="body2" component="div" sx={{ whiteSpace: "pre-wrap" }}>
            {`# Create or edit .env.local file in your project root
NEXT_PUBLIC_API_URL=http://your-backend-server:5000/api

# Then restart your Next.js development server`}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
