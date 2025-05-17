"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useScrollTrigger,
  Container,
  Tooltip,
  Fade,
  Divider,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Close,
  Star,
  Settings,
  Home,
  Info,
  Calculate,
  MenuBook,
  ContactPage,
  Download,
} from "@mui/icons-material"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const pathname = usePathname()

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleOpenConfig = () => {
    setConfigOpen(true)
  }

  const handleCloseConfig = () => {
    setConfigOpen(false)
  }

  const navItems = [
    { label: "Home", href: "/", icon: <Home fontSize="small" /> },
    { label: "How It Works", href: "/#how-it-works", icon: <Info fontSize="small" /> },
    { label: "Audit Tool", href: "/#audit-tool", icon: <MenuBook fontSize="small" /> },
    { label: "Mobile App", href: "/#mobile-app", icon: <Download fontSize="small" /> },
    { label: "Zakat Calculator", href: "/zakat-calculator", icon: <Calculate fontSize="small" /> },
  ]

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={trigger ? 4 : 0}
        sx={{
          bgcolor: trigger ? "rgba(237, 247, 237, 0.85)" : "transparent", // Light green tint when scrolled
          backdropFilter: trigger ? "blur(10px)" : "none",
          borderBottom: trigger ? 1 : 0,
          borderColor: "divider",
          transition: "all 0.3s",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: trigger ? 0.5 : 1 }}>
            
            {/* IsDB Logo */}
            <Box sx={{ position: 'relative', height: 100, width: 110 }}>
              <Image
                src="/images/isdb_logo.png"
                alt="Islamic Development Bank"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1, ml: "auto" }}>
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Button
                    key={item.label}
                    component="a"
                    href={item.href}
                    color={active ? "primary" : "inherit"}
                    sx={{
                      fontWeight: active ? "bold" : "medium",
                      textTransform: "none",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      position: "relative",
                      overflow: "hidden",
                      color: active ? "#1b5e20" : "#2e7d32", // Darker green for active, medium green for inactive
                      "&::after": active
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: "20%",
                            width: "60%",
                            height: 3,
                            bgcolor: "#2e7d32", // Medium green underline
                            borderRadius: "3px 3px 0 0",
                          }
                        : {},
                      "&:hover": {
                        bgcolor: "rgba(46, 125, 50, 0.08)", // Light green hover state
                      },
                    }}
                    startIcon={item.icon}
                  >
                    {item.label}
                  </Button>
                )
              })}

              <Tooltip title="Backend Configuration">
                <IconButton
                  color="primary"
                  onClick={handleOpenConfig}
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: "rgba(46, 125, 50, 0.1)", // Light green background
                    color: "#2e7d32", // Medium green icon
                    "&:hover": {
                      bgcolor: "rgba(46, 125, 50, 0.2)", // Slightly darker on hover
                    },
                  }}
                >
                  <Settings />
                </IconButton>
              </Tooltip>

              <Button
                variant="contained"
                color="primary"
                startIcon={<ContactPage />}
                sx={{
                  ml: 2,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0 4px 8px rgba(27, 94, 32, 0.3)",
                  background: "linear-gradient(90deg, #1b5e20 0%, #2e7d32 100%)", // Dark green to medium green gradient
                  "&:hover": {
                    boxShadow: "0 6px 12px rgba(27, 94, 32, 0.4)",
                    background: "linear-gradient(90deg, #194d20 0%, #256427 100%)", // Slightly darker on hover
                  },
                }}
              >
                Contact Us
              </Button>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { md: "none" }, 
                ml: "auto",
                color: "#2e7d32", // Medium green icon
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { 
            width: 280, 
            boxSizing: "border-box",
            bgcolor: "#f1f8e9", // Very light green background
          },
        }}
      >
        <Box sx={{ 
          p: 2, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          bgcolor: "#e8f5e9", // Light green header
        }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)", // Dark to medium green gradient
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1,
              }}
            >
              <Star sx={{ color: "white", fontSize: 16 }} />
            </Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#1b5e20" }}> {/* Dark green text */}
              Shariah Audit
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} edge="end" aria-label="close menu" sx={{ color: "#2e7d32" }}> {/* Medium green icon */}
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(46, 125, 50, 0.2)" }} /> {/* Light green divider */}
        
        <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ position: 'relative', height: 36, width: 110 }}>
            <Image
              src="/images/isdb_logo.png"
              alt="Islamic Development Bank"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Box>
        <Divider sx={{ mb: 1, borderColor: "rgba(46, 125, 50, 0.2)" }} /> {/* Light green divider */}
        
        <List sx={{ pt: 1 }}>
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.href}
                  onClick={handleDrawerToggle}
                  selected={active}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    mb: 0.5,
                    "&.Mui-selected": {
                      bgcolor: "rgba(46, 125, 50, 0.15)", // Light green background for selected item
                      color: "#1b5e20", // Dark green text for selected item
                      "&:hover": {
                        bgcolor: "rgba(46, 125, 50, 0.2)", // Slightly darker on hover
                      },
                    },
                    "&:hover": {
                      bgcolor: "rgba(46, 125, 50, 0.1)", // Very light green on hover
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: active ? "#1b5e20" : "#2e7d32", // Dark green for active, medium green for inactive
                    minWidth: 40 
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ 
                      fontWeight: active ? "bold" : "medium",
                      color: active ? "#1b5e20" : "#2e7d32", // Dark green for active, medium green for inactive
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
          <Divider sx={{ my: 1.5, borderColor: "rgba(46, 125, 50, 0.2)" }} /> {/* Light green divider */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleOpenConfig()
                handleDrawerToggle()
              }}
              sx={{ 
                borderRadius: 2, 
                mx: 1, 
                mb: 0.5,
                "&:hover": {
                  bgcolor: "rgba(46, 125, 50, 0.1)", // Very light green on hover
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#2e7d32" }}> {/* Medium green icon */}
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Backend Configuration" 
                primaryTypographyProps={{ color: "#2e7d32" }} // Medium green text
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ 
              borderRadius: 2, 
              mx: 1, 
              mb: 0.5,
              "&:hover": {
                bgcolor: "rgba(46, 125, 50, 0.1)", // Very light green on hover
              },
            }}>
              <ListItemIcon sx={{ minWidth: 40, color: "#2e7d32" }}> {/* Medium green icon */}
                <ContactPage fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Contact Us" 
                primaryTypographyProps={{ color: "#2e7d32" }} // Medium green text
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      
      {/* Add spacing to account for the fixed header */}
      <Toolbar sx={{ mb: 2 }} />
    </>
  )
}