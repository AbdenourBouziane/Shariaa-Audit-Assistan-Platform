import { Card, CardContent, Box, Typography, Alert, CircularProgress, Paper } from "@mui/material"
import { MenuBook as Book, Warning as AlertCircle } from "@mui/icons-material"
import type { ShariahStandard } from "@/types"

interface StandardsResultsProps {
  standards: ShariahStandard[]
  searchEnabled: boolean
  searchQuery?: string
  isLoading?: boolean
  isDemoMode?: boolean
}

export default function StandardsResults({
  standards,
  searchEnabled,
  searchQuery,
  isLoading = false,
  isDemoMode = false,
}: StandardsResultsProps) {
  if (!searchEnabled && !isDemoMode) {
    return (
      <Card elevation={3}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: "50%",
                bgcolor: "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Book color="action" />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Relevant Shariah Standards
              </Typography>
              <Typography variant="body2" color="text.secondary">
                External search is disabled on the server. Standards lookup is not available in this mode.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card elevation={3}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: "50%",
                bgcolor: "primary.light",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={24} color="primary" />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Searching Standards
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Searching for relevant Shariah standards...
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }

  if (!standards || standards.length === 0) {
    return (
      <Card elevation={3}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: "50%",
                bgcolor: "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertCircle color="action" />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                No Standards Found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchQuery
                  ? `No relevant standards found for this clause.`
                  : `Submit a contract with search enabled to see relevant Shariah standards.`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card elevation={3}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: "50%",
              bgcolor: "primary.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Book sx={{ color: "primary.contrastText" }} />
          </Box>
          <Box>
            <Typography variant="h6">Relevant Shariah Standards</Typography>
            {searchQuery && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Standards Related to:
                </Typography>
                <Paper variant="outlined" sx={{ p: 1.5, bgcolor: "action.hover", fontStyle: "italic" }}>
                  <Typography variant="body2">
                    "{searchQuery.length > 100 ? `${searchQuery.substring(0, 100)}...` : searchQuery}"
                  </Typography>
                </Paper>
              </Box>
            )}
          </Box>
        </Box>

        {isDemoMode && (
          <Alert severity="info" sx={{ mb: 3 }}>
            These are sample standards provided in demo mode.
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {standards.map((standard, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                p: 2.5,
                bgcolor: "background.paper",
                borderRadius: 2,
                transition: "all 0.2s",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box
                  sx={{
                    p: 0.75,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 0.5,
                  }}
                >
                  <Book sx={{ fontSize: 16, color: "primary.contrastText" }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" color="primary.main" gutterBottom>
                    {standard.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {standard.summary}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Source: {standard.source}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
