/**
 * Payment Service
 * User Story 4.1: 支付集成
 */

export interface PaymentConfig {
  priceId: string;
  priceAmount: number; // in cents
  currency: string;
  productName: string;
}

export interface PaymentSession {
  id: string;
  url: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  amount: number;
}

export interface PaymentResult {
  success: boolean;
  session?: PaymentSession;
  error?: string;
}

// Default configuration
export const DEFAULT_PAYMENT_CONFIG: PaymentConfig = {
  priceId: 'price_default',
  priceAmount: 500, // $5.00
  currency: 'usd',
  productName: 'MemoryMigrator - Single Export',
};

/**
 * Calculate Stripe fees
 */
export function calculateStripeFee(amount: number): number {
  // Stripe fee: 2.9% + $0.30
  return Math.round(amount * 0.029 + 30);
}

/**
 * Calculate net amount after fees
 */
export function calculateNetAmount(amount: number): number {
  return amount - calculateStripeFee(amount);
}

/**
 * Create payment session (mock for MVP)
 * In production, this would call Stripe API
 */
export async function createPaymentSession(
  config: PaymentConfig = DEFAULT_PAYMENT_CONFIG
): Promise<PaymentResult> {
  try {
    // In production:
    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',
    //   line_items: [{ price: config.priceId, quantity: 1 }],
    //   success_url: `${domain}/success`,
    //   cancel_url: `${domain}/cancel`,
    // });

    // Mock response
    const session: PaymentSession = {
      id: `cs_test_${Date.now()}`,
      url: `https://checkout.stripe.com/pay/cs_test_${Date.now()}`,
      status: 'pending',
      amount: config.priceAmount,
    };

    return {
      success: true,
      session,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '创建支付会话失败',
    };
  }
}

/**
 * Verify payment status
 */
export async function verifyPayment(sessionId: string): Promise<PaymentResult> {
  try {
    // In production, verify with Stripe API
    // const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Mock: assume payment successful
    const session: PaymentSession = {
      id: sessionId,
      url: '',
      status: 'paid',
      amount: DEFAULT_PAYMENT_CONFIG.priceAmount,
    };

    return {
      success: true,
      session,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '验证支付失败',
    };
  }
}

/**
 * Create refund (for failed exports)
 */
export async function createRefund(paymentId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // In production:
    // await stripe.refunds.create({ payment_intent: paymentId });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '退款失败',
    };
  }
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = 'usd'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  
  return formatter.format(amount / 100);
}

/**
 * Check if payment is within refund window (7 days)
 */
export function isRefundable(createdAt: number): boolean {
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return (now - createdAt) < sevenDays;
}

/**
 * Validate payment amount
 */
export function validateAmount(amount: number): { valid: boolean; error?: string } {
  if (amount <= 0) {
    return { valid: false, error: '金额必须大于0' };
  }
  
  if (amount > 999999) { // ~$10,000 max
    return { valid: false, error: '金额超出限制' };
  }
  
  return { valid: true };
}
