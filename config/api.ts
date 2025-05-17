// Check if API URL is explicitly set
const hasApiUrl = !!process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== ""

// Only use demo mode if API URL is not set or in preview environment
export const USE_DEMO_MODE = !hasApiUrl || process.env.VERCEL_ENV === "preview"

// Always use the provided API URL if available, otherwise use localhost as fallback
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export const API_ENDPOINTS = {
  AUDIT: `${API_BASE_URL}/audit`,
  EXTRACT: `${API_BASE_URL}/extract`,
  CHECK_CLAUSE: `${API_BASE_URL}/check-clause`,
  SEARCH_STANDARDS: `${API_BASE_URL}/search-standards`,
  STANDARD_DETAILS: `${API_BASE_URL}/standard-details`,
  FIND_SOURCE: `${API_BASE_URL}/find-source`,
  APPLICABLE_STANDARDS: `${API_BASE_URL}/applicable-standards`,
  HEALTH: `${API_BASE_URL.replace("/api", "")}/health`,
}
