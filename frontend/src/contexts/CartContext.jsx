import React, { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem('agar_cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
        calculateTotals(parsedCart)
      } catch (error) {
        console.error('Error parsing cart data:', error)
        localStorage.removeItem('agar_cart')
      }
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('agar_cart', JSON.stringify(cartItems))
    calculateTotals(cartItems)
  }, [cartItems])

  const calculateTotals = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    
    setCartTotal(total)
    setItemCount(count)
  }

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id)
      
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        
        // Remove if quantity becomes 0 or less
        if (updatedItems[existingItemIndex].quantity <= 0) {
          return updatedItems.filter(item => item.id !== product.id)
        }
        
        return updatedItems
      } else {
        // Add new item to cart
        if (quantity <= 0) return prevItems
        
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          farmer: product.farmer,
          image: product.image,
          unit: product.unit,
          availableQuantity: product.availableQuantity
        }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('agar_cart')
  }

  const getCartItem = (productId) => {
    return cartItems.find(item => item.id === productId)
  }

  const value = {
    cartItems,
    cartTotal,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext