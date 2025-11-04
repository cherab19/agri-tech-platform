import React, { useState } from 'react';
import { useTeleBirr } from '../../../hooks/useTeleBirr';
import LoadingSpinner from '../../common/LoadingSpinner';

const TelebirrPayment = ({ amount, onSuccess, onError, disabled }) => {
  const [processing, setProcessing] = useState(false);
  const { initiatePayment } = useTeleBirr();

  const handlePayment = async () => {
    if (disabled || processing) return;
    
    setProcessing(true);
    try {
      const paymentData = {
        amount: amount,
        currency: 'ETB',
        description: `Payment for agricultural products - ETB ${amount}`,
        returnUrl: `${window.location.origin}/vendor/payment/success`,
        cancelUrl: `${window.location.origin}/vendor/payment/cancel`
      };

      const result = await initiatePayment(paymentData);
      
      if (result.success) {
        onSuccess({
          reference: result.reference,
          transactionId: result.transactionId,
          amount: amount
        });
      } else {
        onError(result.error || 'Payment initiation failed');
      }
    } catch (error) {
      onError(error.message || 'Payment processing error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="telebirr-payment">
      <button
        className={`telebirr-btn ${processing ? 'processing' : ''}`}
        onClick={handlePayment}
        disabled={disabled || processing}
      >
        {processing ? (
          <>
            <LoadingSpinner size="small" />
            Processing Payment...
          </>
        ) : (
          <>
            <span className="telebirr-icon">📱</span>
            Pay with TeleBirr
          </>
        )}
      </button>
      
      <div className="payment-details">
        <p className="amount">Amount: ETB {amount}</p>
        <p className="instruction">
          You will be redirected to TeleBirr to complete your payment securely
        </p>
      </div>
    </div>
  );
};

export default TelebirrPayment;