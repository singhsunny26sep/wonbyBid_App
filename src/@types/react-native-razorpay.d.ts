declare module 'react-native-razorpay' {
  export interface RazorpayOptions {
    description: string;
    image: string;
    currency: string;
    key: string;
    amount: string; // Amount in paise
    name: string;
    prefill: {
      email: string;
      contact: string;
      name: string;
    };
    theme?: {
      color: string; // Hex color code
    };
  }

  export interface ExternalWalletSelection {
    walletName: string;
  }

  export default class RazorpayCheckout {
    static open(options: RazorpayOptions): Promise<string>;
    static onExternalWalletSelection(
      callback: (data: ExternalWalletSelection) => void
    ): void;
  }
}
