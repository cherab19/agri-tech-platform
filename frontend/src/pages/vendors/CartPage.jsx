import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCart } from '../../contexts/CartContext'
import { VendorLoading } from '../../components/common/LoadingSpinner'
import { notify } from '../../components/common/Notification'
import './cart-page.scss'

const CartPage = () => {
  const { t } = useLanguage()
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState('cart') // cart, delivery, payment, confirmation

  // Delivery options should come from the backend; remove hard-coded mocks.
  const deliveryOptions = []

  // selectedDelivery will be provided by backend/checkout flow; default to null when unavailable
  const [selectedDelivery, setSelectedDelivery] = useState(null)

  // Clear default address — keep empty fields so user can enter their own address
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    region: '',
    instructions: ''
  })

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
    notify.success(t('cart.item_removed', 'Item removed from cart'))
  }

  const handleClearCart = () => {
    if (window.confirm(t('cart.clear_cart_confirm', 'Are you sure you want to clear your cart?'))) {
      clearCart()
      notify.success(t('cart.cart_cleared', 'Cart cleared successfully'))
    }
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      notify.error(t('cart.empty_cart', 'Your cart is empty'))
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setCheckoutStep('delivery')
      notify.success(t('cart.proceed_to_delivery', 'Proceeding to delivery details'))
    } catch (error) {
      notify.error(t('cart.checkout_failed', 'Checkout failed. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      setCheckoutStep('confirmation')
      clearCart()
      notify.success(t('cart.order_placed', 'Order placed successfully!'))
    } catch (error) {
      notify.error(t('cart.order_failed', 'Failed to place order. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  const totalWithDelivery = cartTotal + (selectedDelivery?.price || 0)

  if (loading) {
    return (
      <div className="cart-page-loading">
        <VendorLoading />
      </div>
    )
  }

  return (
    <div className="cart-page">
      {/* Page Header */}
      <div className="page-header py-4 bg-white border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">
                {t('cart.shopping_cart', 'Shopping Cart')}
              </h1>
              <p className="text-muted mb-0">
                {checkoutStep === 'cart' 
                  ? t('cart.review_items', 'Review your items before checkout')
                  : checkoutStep === 'delivery'
                  ? t('cart.delivery_details', 'Enter delivery details')
                  : t('cart.order_confirmation', 'Order confirmation')
                }
              </p>
            </div>
            <div className="col-auto">
              <div className="checkout-steps">
                <div className="steps d-flex align-items-center">
                  <div className={`step ${checkoutStep === 'cart' ? 'active' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-label">{t('cart.cart', 'Cart')}</div>
                  </div>
                  <div className="step-connector"></div>
                  <div className={`step ${checkoutStep === 'delivery' ? 'active' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-label">{t('cart.delivery', 'Delivery')}</div>
                  </div>
                  <div className="step-connector"></div>
                  <div className={`step ${checkoutStep === 'confirmation' ? 'active' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-label">{t('cart.confirm', 'Confirm')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="cart-content py-4">
        <div className="container-fluid">
          <div className="row g-4">
            {/* Left Column - Cart Items / Delivery Form */}
            <div className="col-lg-8">
              {checkoutStep === 'cart' && (
                <div className="cart-items-section">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold mb-0">
                          {t('cart.cart_items', 'Cart Items')} ({cartItems.length})
                        </h5>
                        {cartItems.length > 0 && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleClearCart}
                          >
                            <i className="fas fa-trash me-1"></i>
                            {t('cart.clear_cart', 'Clear Cart')}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      {cartItems.length > 0 ? (
                        <div className="cart-items">
                          {cartItems.map((item) => (
                            <div key={item.id} className="cart-item d-flex align-items-center py-3 border-bottom">
                              {/* Product Image */}
                              <div className="item-image me-3">
                                <div className="bg-light rounded d-flex align-items-center justify-content-center" 
                                     style={{ width: '80px', height: '80px' }}>
                                  <i className="fas fa-carrot text-primary fs-4"></i>
                                </div>
                              </div>

                              {/* Product Details */}
                              <div className="item-details flex-grow-1">
                                <h6 className="item-name fw-semibold mb-1">
                                  {item.name}
                                </h6>
                                <p className="item-farmer text-muted small mb-2">
                                  {t('cart.by', 'By')} {item.farmer}
                                </p>
                                  <div className="item-price fw-bold text-primary">
                                  ETB{item.price}/{item.unit}
                                </div>
                              </div>

                              {/* Quantity Controls */}
                              <div className="item-quantity me-4">
                                <div className="quantity-controls d-flex align-items-center">
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                  <span className="quantity mx-3 fw-semibold">
                                    {item.quantity} {item.unit}
                                  </span>
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= item.availableQuantity}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>

                              {/* Total Price */}
                              <div className="item-total me-4">
                                <h6 className="fw-bold text-dark mb-0">
                                  ETB{(item.price * item.quantity).toLocaleString()}
                                </h6>
                              </div>

                              {/* Remove Button */}
                              <div className="item-actions">
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-cart text-center py-5">
                          <div className="empty-icon mb-3">
                            <i className="fas fa-shopping-cart text-muted" style={{ fontSize: '3rem' }}></i>
                          </div>
                          <h5 className="text-muted mb-2">
                            {t('cart.empty_cart', 'Your cart is empty')}
                          </h5>
                          <p className="text-muted mb-3">
                            {t('cart.add_items_to_cart', 'Add some fresh produce to get started')}
                          </p>
                          <a href="/vendor/marketplace" className="btn btn-primary">
                            <i className="fas fa-store me-2"></i>
                            {t('cart.browse_marketplace', 'Browse Marketplace')}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 'delivery' && (
                <div className="delivery-section">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 py-3">
                      <h5 className="fw-bold mb-0">
                        {t('cart.delivery_details', 'Delivery Details')}
                      </h5>
                    </div>
                    <div className="card-body">
                      {/* Delivery Address */}
                      <div className="delivery-address mb-4">
                        <h6 className="fw-semibold mb-3">
                          {t('cart.delivery_address', 'Delivery Address')}
                        </h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">{t('cart.street_address', 'Street Address')}</label>
                            <input
                              type="text"
                              className="form-control"
                              value={deliveryAddress.street}
                              onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">{t('cart.city', 'City')}</label>
                            <input
                              type="text"
                              className="form-control"
                              value={deliveryAddress.city}
                              onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">{t('cart.region', 'Region')}</label>
                            <select
                              className="form-select"
                              value={deliveryAddress.region}
                              onChange={(e) => setDeliveryAddress(prev => ({ ...prev, region: e.target.value }))}
                            >
                              <option value="Addis Ababa">Addis Ababa</option>
                              <option value="Oromia">Oromia</option>
                              <option value="Amhara">Amhara</option>
                              <option value="SNNPR">SNNPR</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <label className="form-label">{t('cart.delivery_instructions', 'Delivery Instructions (Optional)')}</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              value={deliveryAddress.instructions}
                              onChange={(e) => setDeliveryAddress(prev => ({ ...prev, instructions: e.target.value }))}
                              placeholder={t('cart.instructions_placeholder', 'Any special instructions for the driver...')}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Options */}
                      <div className="delivery-options">
                        <h6 className="fw-semibold mb-3">
                          {t('cart.delivery_options', 'Delivery Options')}
                        </h6>
                        <div className="options-list">
                          {deliveryOptions.length > 0 ? (
                            deliveryOptions.map((option) => (
                              <div
                                key={option.id}
                                className={`delivery-option card mb-2 cursor-pointer ${
                                  selectedDelivery?.id === option.id ? 'border-primary' : ''
                                }`}
                                onClick={() => setSelectedDelivery(option)}
                              >
                                <div className="card-body">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      checked={selectedDelivery?.id === option.id}
                                      onChange={() => setSelectedDelivery(option)}
                                    />
                                    <label className="form-check-label w-100">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                          <h6 className="mb-1">{option.name}</h6>
                                          <p className="text-muted small mb-0">{option.description}</p>
                                        </div>
                                        <div className="text-end">
                                          <div className="fw-bold text-primary">ETB{option.price}</div>
                                          <small className="text-muted">{option.estimated}</small>
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-muted small py-3">
                              {t('cart.no_delivery_options', 'No delivery options are available. Please contact support or proceed to place order for pickup.')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 'confirmation' && (
                <div className="confirmation-section">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                      <div className="confirmation-icon mb-4">
                        <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                      </div>
                      <h3 className="fw-bold text-success mb-3">
                        {t('cart.order_confirmed', 'Order Confirmed!')}
                      </h3>
                      <p className="text-muted mb-4">
                        {t('cart.order_confirmed_desc', 'Your order has been placed successfully. You will receive a confirmation email shortly.')}
                      </p>
                      <div className="order-details mb-4">
                        <p className="mb-2">
                          <strong>{t('cart.order_number', 'Order Number')}:</strong> #ORD-{Date.now().toString().slice(-6)}
                        </p>
                        <p className="mb-2">
                          <strong>{t('cart.estimated_delivery', 'Estimated Delivery')}:</strong> {selectedDelivery?.estimated || t('cart.no_estimated_delivery', '—')}
                        </p>
                        <p className="mb-0">
                          <strong>{t('cart.total_amount', 'Total Amount')}:</strong> ETB{totalWithDelivery.toLocaleString()}
                        </p>
                      </div>
                      <div className="action-buttons">
                        <a href="/vendor/orders" className="btn btn-primary me-3">
                          {t('cart.view_orders', 'View Orders')}
                        </a>
                        <a href="/vendor/marketplace" className="btn btn-outline-primary">
                          {t('cart.continue_shopping', 'Continue Shopping')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            {(checkoutStep === 'cart' || checkoutStep === 'delivery') && (
              <div className="col-lg-4">
                <div className="order-summary">
                  <div className="card border-0 shadow-sm sticky-top" style={{ top: '2rem' }}>
                    <div className="card-header bg-white border-0 py-3">
                      <h5 className="fw-bold mb-0">
                        {t('cart.order_summary', 'Order Summary')}
                      </h5>
                    </div>
                    <div className="card-body">
                      {/* Items List */}
                      <div className="summary-items mb-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="summary-item d-flex justify-content-between align-items-center mb-2">
                            <div className="item-info">
                              <span className="item-name small">{item.name}</span>
                              <br />
                              <small className="text-muted">
                                {item.quantity} {item.unit} × ETB{item.price}
                              </small>
                            </div>
                            <div className="item-total fw-semibold">
                              ETB{(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Totals */}
                      <div className="summary-totals">
                        <div className="d-flex justify-content-between mb-2">
                          <span>{t('cart.subtotal', 'Subtotal')}</span>
                          <span>ETB{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>{t('cart.delivery_fee', 'Delivery Fee')}</span>
                          <span>{selectedDelivery ? `ETB${selectedDelivery.price.toLocaleString()}` : t('cart.no_delivery_selected', '—')}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                          <span>{t('cart.total', 'Total')}</span>
                          <span className="text-primary">ETB{totalWithDelivery.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <div className="checkout-button mt-4">
                        {checkoutStep === 'cart' ? (
                          <button
                            className="btn btn-primary w-100 py-3 fw-semibold"
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0 || loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                {t('cart.processing', 'Processing...')}
                              </>
                            ) : (
                              <>
                                <i className="fas fa-lock me-2"></i>
                                {t('cart.proceed_to_checkout', 'Proceed to Checkout')}
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            className="btn btn-success w-100 py-3 fw-semibold"
                            onClick={handlePlaceOrder}
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                {t('cart.placing_order', 'Placing Order...')}
                              </>
                            ) : (
                              <>
                                <i className="fas fa-check me-2"></i>
                                {t('cart.place_order', 'Place Order')}
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Security Notice */}
                      <div className="security-notice text-center mt-3">
                        <small className="text-muted">
                          <i className="fas fa-lock me-1"></i>
                          {t('cart.secure_checkout', 'Secure checkout with TeleBirr')}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage