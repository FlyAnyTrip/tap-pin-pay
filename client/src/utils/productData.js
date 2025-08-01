// Updated API configuration with your actual backend URL
const API_BASE_URL = "https://tap-pin-pay-backend.vercel.app/api"

// Test API connection on load
const testConnection = async () => {
  try {
    console.log("🔄 Testing API connection...")
    const response = await fetch(`${API_BASE_URL}/health`)
    if (response.ok) {
      const result = await response.json()
      console.log("✅ API Connection successful:", result)
      return true
    } else {
      console.log("❌ API Connection failed:", response.status)
      return false
    }
  } catch (error) {
    console.error("❌ API Connection error:", error)
    return false
  }
}

// Test connection immediately
testConnection()

export const getProductById = async (id) => {
  try {
    console.log(`🔍 Fetching product from: ${API_BASE_URL}/product/${id}`)
    const response = await fetch(`${API_BASE_URL}/product/${id}`)
    if (response.ok) {
      const product = await response.json()
      console.log("✅ Product fetched successfully:", product)
      return product
    } else {
      console.log("❌ Product not found:", response.status)
      return null
    }
  } catch (error) {
    console.error("❌ Error fetching product:", error)
    // Fallback to local data if API fails
    return productDatabase[id] || null
  }
}

export const getAllProducts = async () => {
  try {
    console.log(`📦 Fetching all products from: ${API_BASE_URL}/products`)
    const response = await fetch(`${API_BASE_URL}/products`)
    if (response.ok) {
      const products = await response.json()
      console.log("✅ Products fetched successfully:", Object.keys(products).length, "products")
      return products
    } else {
      console.log("❌ Failed to fetch products:", response.status)
      return productDatabase
    }
  } catch (error) {
    console.error("❌ Error fetching products:", error)
    return productDatabase
  }
}

export const addProduct = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    if (response.ok) {
      const result = await response.json()
      console.log("✅ Product added successfully:", result)
      return result
    } else {
      throw new Error("Failed to add product")
    }
  } catch (error) {
    console.error("❌ Error adding product:", error)
    throw error
  }
}

export const updateProductStock = async (productId, stock) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/${productId}/stock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock }),
    })

    if (response.ok) {
      const result = await response.json()
      console.log("✅ Stock updated successfully:", result)
      return result
    } else {
      throw new Error("Failed to update stock")
    }
  } catch (error) {
    console.error("❌ Error updating stock:", error)
    throw error
  }
}

export const createOrder = async (orderData) => {
  try {
    console.log("💳 Creating order at:", `${API_BASE_URL}/orders`)
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })

    if (response.ok) {
      const result = await response.json()
      console.log("✅ Order created successfully:", result)
      return result
    } else {
      throw new Error("Failed to create order")
    }
  } catch (error) {
    console.error("❌ Error creating order:", error)
    throw error
  }
}

export const getOrderById = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/order/${orderId}`)
    if (response.ok) {
      const order = await response.json()
      console.log("✅ Order fetched successfully:", order)
      return order
    } else {
      console.log("❌ Order not found:", response.status)
      return null
    }
  } catch (error) {
    console.error("❌ Error fetching order:", error)
    return null
  }
}

// Sample product data for offline fallback
export const productDatabase = {
  FOOD001: {
    id: "FOOD001",
    name: "Vada Pav",
    price: 25.0,
    image: "/placeholder.svg?height=100&width=100&text=Vada+Pav",
    description: "Mumbai's famous street food - spicy potato fritter in bun",
  },
  FOOD002: {
    id: "FOOD002",
    name: "Pav Bhaji",
    price: 60.0,
    image: "/placeholder.svg?height=100&width=100&text=Pav+Bhaji",
    description: "Spicy vegetable curry served with buttered bread rolls",
  },
  FOOD003: {
    id: "FOOD003",
    name: "Dosa",
    price: 45.0,
    image: "/placeholder.svg?height=100&width=100&text=Dosa",
    description: "Crispy South Indian crepe served with sambar and chutney",
  },
  FOOD004: {
    id: "FOOD004",
    name: "Biryani",
    price: 120.0,
    image: "/placeholder.svg?height=100&width=100&text=Biryani",
    description: "Aromatic basmati rice with spiced chicken/mutton",
  },
  FOOD005: {
    id: "FOOD005",
    name: "Samosa",
    price: 15.0,
    image: "/placeholder.svg?height=100&width=100&text=Samosa",
    description: "Crispy triangular pastry filled with spiced potatoes",
  },
}

// Debug function to test API connectivity
export const testAPIConnection = async () => {
  return await testConnection()
}
