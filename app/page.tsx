"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Button, Fab, Alert, Snackbar } from "@mui/material"
import { ArrowUpward as ArrowUp } from "@mui/icons-material"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import AuditForm from "@/components/audit-form"
import ResultsSection from "@/components/results-section"
import type { AuditResult } from "@/types"
import { checkServerHealth } from "./actions"
import MobileAppPromo from "@/components/mobile-app-promo"

const EXAMPLE_CONTRACT = `This Murabaha agreement involves deferred payment terms with added profit markup. 
The seller retains ownership until full payment. An early payment penalty may apply in cases of default. 
Liquidity is backed by conventional bonds.`

export default function Home() {
  const [result, setResult] = useState<AuditResult | undefined>(undefined)
  const [searchEnabled, setSearchEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function checkStatus() {
      try {
        const healthData = await checkServerHealth()
        setSearchEnabled(healthData.search_enabled)
        setServerStatus("online")
      } catch (error) {
        console.error("Error checking server health:", error)
        setServerStatus("offline")
        setErrorMessage("Could not connect to the Shariah Audit backend server. Please ensure it's running.")
      }
    }

    checkStatus()

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAuditResult = (newResult: AuditResult) => {
    setResult(newResult)
    // Scroll to results section
    document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCloseError = () => {
    setErrorMessage(null)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        <HeroSection />
        <MobileAppPromo />
        <HowItWorks />

        <Box
          id="audit-tool"
          sx={{
            py: 10,
            position: "relative",
            overflow: "hidden",
            bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(0,77,64,0.05)" : "rgba(0,77,64,0.02)"),
          }}
        >
          {/* Background Elements */}
          <Box
            sx={{
              position: "absolute",
              top: "33%",
              right: 0,
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              bgcolor: "primary.main",
              opacity: 0.05,
              filter: "blur(80px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "33%",
              left: 0,
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              bgcolor: "secondary.main",
              opacity: 0.05,
              filter: "blur(80px)",
            }}
          />

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            {serverStatus === "offline" && (
              <Alert
                severity="warning"
                sx={{ mb: 4 }}
                action={
                  <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                    Retry
                  </Button>
                }
              >
                Backend server is offline. The application will run in limited functionality mode.
              </Alert>
            )}

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 2fr" }, gap: 5 }}>
              <Box>
                <Box sx={{ position: "sticky", top: 100 }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                      background: "linear-gradient(90deg, #004d40 0%, #00796b 100%)",
                      backgroundClip: "text",
                      color: "transparent",
                      mb: 2,
                    }}
                  >
                    Analyze Your Contract
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Our advanced Shariah audit tool analyzes your contract text to identify potential compliance issues
                    and provide recommendations.
                  </Typography>
                  <AuditForm
                    initialExample={EXAMPLE_CONTRACT}
                    searchEnabled={searchEnabled}
                    onResult={(result) => {
                      setIsLoading(true)
                      // Simulate a brief loading delay for better UX
                      setTimeout(() => {
                        handleAuditResult(result)
                        setIsLoading(false)
                      }, 800)
                    }}
                    disabled={serverStatus === "offline"}
                  />
                </Box>
              </Box>

              <Box id="results-section">
                <ResultsSection result={result} searchEnabled={searchEnabled} isLoading={isLoading} />
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Footer />

      {showScrollTop && (
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll to top"
          onClick={scrollToTop}
          sx={{ position: "fixed", bottom: 24, right: 24 }}
        >
          <ArrowUp />
        </Fab>
      )}

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={errorMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  )
}
