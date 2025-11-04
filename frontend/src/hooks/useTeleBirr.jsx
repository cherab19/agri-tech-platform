import { useState, useCallback } from 'react';
import { telebirrService } from '../services/payment/telebirr';
import { useAuth } from '../contexts/AuthContext';

export const useTeleBirr = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();

  const initiatePayment = useCallback(async (paymentData) => {
    setProcessing(true);
    setError(null);

    try {
      // Add user information to payment data
      const enhancedPaymentData = {
        ...paymentData,
        customerPhone: user?.phone,
        customerEmail: user?.email,
        customerName: user?.name,
        userId: user?.id,
      };

      const response = await telebirrService.initiatePayment(enhancedPaymentData, token);
      
      if (response.success) {
        // Redirect to TeleBirr payment page or handle payment UI
        if (response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        }
        
        return {
          success: true,
          reference: response.data.reference,
          transactionId: response.data.transactionId,
          paymentUrl: response.data.paymentUrl,
        };
      } else {
        throw new Error(response.error || 'Payment initiation failed');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to initiate payment';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setProcessing(false);
    }
  }, [user, token]);

  const verifyPayment = useCallback(async (reference) => {
    setProcessing(true);
    setError(null);

    try {
      const response = await telebirrService.verifyPayment(reference, token);
      
      if (response.success) {
        return {
          success: true,
          status: response.data.status,
          transaction: response.data.transaction,
        };
      } else {
        throw new Error(response.error || 'Payment verification failed');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to verify payment';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setProcessing(false);
    }
  }, [token]);

  const getPaymentStatus = useCallback(async (reference) => {
    try {
      const response = await telebirrService.getPaymentStatus(reference, token);
      return response;
    } catch (err) {
      console.error('Error getting payment status:', err);
      return { success: false, error: err.message };
    }
  }, [token]);

  const clearError = useCallback(() => setError(null), []);

  return {
    processing,
    error,
    initiatePayment,
    verifyPayment,
    getPaymentStatus,
    clearError,
  };
};