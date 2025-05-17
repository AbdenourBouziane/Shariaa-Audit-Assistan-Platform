"use server"

import { API_ENDPOINTS, USE_DEMO_MODE } from "@/config/api"
import type { AuditResult, ShariahStandard } from "@/types"
import { MOCK_AUDIT_RESULT, MOCK_STANDARDS, getMockStandardsForClause } from "@/utils/mock-data"

// Helper function to safely fetch with timeout
async function safeFetch(url: string, options: RequestInit = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function auditProduct(productText: string, useSearch: boolean): Promise<AuditResult> {
  try {
    // Always try to connect to the backend first
    const response = await safeFetch(API_ENDPOINTS.AUDIT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_text: productText,
        use_search: useSearch,
      }),
    })

    return response
  } catch (error) {
    console.error("Error in auditProduct:", error)

    // Only use mock data if we're in demo mode or if the backend is unavailable
    if (USE_DEMO_MODE) {
      console.info("Falling back to mock audit result data")
      // Add a small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      return MOCK_AUDIT_RESULT
    }

    // If we're not in demo mode, rethrow the error
    throw error
  }
}

export async function fetchApplicableStandards(productType: string): Promise<ShariahStandard[]> {
  try {
    // Always try to connect to the backend first
    const data = await safeFetch(
      `${API_ENDPOINTS.APPLICABLE_STANDARDS}?product_type=${encodeURIComponent(productType)}`,
    )
    return data.standards || []
  } catch (error) {
    console.error("Error in fetchApplicableStandards:", error)

    // Only use mock data if we're in demo mode or if the backend is unavailable
    if (USE_DEMO_MODE) {
      console.info("Falling back to mock standards data")
      // Add a small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600))
      return MOCK_STANDARDS
    }

    // If we're not in demo mode, rethrow the error
    throw error
  }
}

export async function searchStandards(query: string): Promise<ShariahStandard[]> {
  try {
    // Always try to connect to the backend first
    const data = await safeFetch(`${API_ENDPOINTS.SEARCH_STANDARDS}?query=${encodeURIComponent(query)}`)
    return data.results || []
  } catch (error) {
    console.error("Error in searchStandards:", error)

    // Only use mock data if we're in demo mode or if the backend is unavailable
    if (USE_DEMO_MODE) {
      console.info("Falling back to mock search results")
      // Add a small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600))
      return getMockStandardsForClause(query)
    }

    // If we're not in demo mode, rethrow the error
    throw error
  }
}

export async function checkServerHealth() {
  try {
    // Always try to connect to the backend first
    const data = await safeFetch(API_ENDPOINTS.HEALTH, { cache: "no-store" })

    return {
      ...data,
      is_demo_mode: false,
    }
  } catch (error) {
    console.error("Error checking server health:", error)

    // Only return demo mode if we're configured to use it
    if (USE_DEMO_MODE) {
      return {
        status: "demo",
        search_enabled: true,
        is_demo_mode: true,
      }
    }

    // Otherwise, return unavailable status
    return {
      status: "unavailable",
      search_enabled: false,
      is_demo_mode: false,
    }
  }
}
