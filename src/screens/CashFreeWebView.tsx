import React, { useEffect, useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import {
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';




import {
 CFDropCheckoutPayment,
 CFEnvironment,
 CFPaymentComponentBuilder,
 CFPaymentModes,
 CFSession,
 CFThemeBuilder,
} from 'cashfree-pg-api-contract';

const PaymentScreen = ({ route }) => {
  const { order_token, order_id } = route.params;
  const [paymentStatus, setPaymentStatus] = useState('');

    const changeResponseText = (text) => {
    console.log(text); // replace with your state setter
  };

useEffect(() => {
    console.log('MOUNTED');

    CFPaymentGatewayService.setCallback({
      onVerify(orderID) {
        changeResponseText('orderId is :' + orderID);
      },
      onError(error, orderID) {
        changeResponseText(
          'exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID
        );
      },
    });

    return () => {
      console.log('UNMOUNTED');
      CFPaymentGatewayService.removeCallback();
    };
  }, []);
  const startPayment = () => {

    try {
        const session = new CFSession(
           order_token,
           order_id,
            CFEnvironment.SANDBOX
        );
        
        console.log('Session', JSON.stringify(session));

        // CFPaymentGatewayService.doWebPayment(session);
        // requestAnimationFrame(() => {
  CFPaymentGatewayService.doWebPayment(session);
// });

    } catch (e: any) {
        console.log(e.message);
    }
    
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pay Now" onPress={startPayment} />
      {paymentStatus ? <Text style={{ marginTop: 20 }}>{paymentStatus}</Text> : null}
    </View>
  );
};

export default PaymentScreen;
