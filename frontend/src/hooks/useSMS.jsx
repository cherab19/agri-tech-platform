import { useState, useCallback } from 'react';
import { smsService } from '../services/sms/smsService';
import { useAuth } from '../contexts/AuthContext';

export const useSMS = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const sendSMS = useCallback(async (smsData) => {
    setSending(true);
    setError(null);

    try {
      const response = await smsService.sendSMS(smsData, token);
      
      if (response.success) {
        return {
          success: true,
          messageId: response.data.messageId,
          status: response.data.status,
        };
      } else {
        throw new Error(response.error || 'SMS sending failed');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to send SMS';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setSending(false);
    }
  }, [token]);

  const sendOrderConfirmation = useCallback(async (orderData, recipientPhone) => {
    const smsData = {
      to: recipientPhone,
      template: 'order_confirmation',
      variables: {
        order_number: orderData.order_number,
        total_amount: orderData.total_amount,
        estimated_delivery: orderData.estimated_delivery,
      },
    };

    return sendSMS(smsData);
  }, [sendSMS]);

  const sendDeliveryUpdate = useCallback(async (deliveryData, recipientPhone) => {
    const smsData = {
      to: recipientPhone,
      template: 'delivery_update',
      variables: {
        order_number: deliveryData.order_number,
        status: deliveryData.status,
        driver_name: deliveryData.driver_name,
        estimated_arrival: deliveryData.estimated_arrival,
      },
    };

    return sendSMS(smsData);
  }, [sendSMS]);

  const sendPaymentConfirmation = useCallback(async (paymentData, recipientPhone) => {
    const smsData = {
      to: recipientPhone,
      template: 'payment_confirmation',
      variables: {
        amount: paymentData.amount,
        reference: paymentData.reference,
        date: paymentData.date,
      },
    };

    return sendSMS(smsData);
  }, [sendSMS]);

  const sendOTP = useCallback(async (phoneNumber, otpCode) => {
    const smsData = {
      to: phoneNumber,
      template: 'otp_verification',
      variables: {
        otp_code: otpCode,
        expiry_minutes: 10,
      },
    };

    return sendSMS(smsData);
  }, [sendSMS]);

  const clearError = useCallback(() => setError(null), []);

  return {
    sending,
    error,
    sendSMS,
    sendOrderConfirmation,
    sendDeliveryUpdate,
    sendPaymentConfirmation,
    sendOTP,
    clearError,
  };
};