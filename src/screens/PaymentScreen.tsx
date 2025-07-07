import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView, Image, } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { usePaymentGatway, usePaymentGuid } from '../hooks/auth/get-user-wallet-info';
import { isValidURL } from '../utils/helper';

const PaymentScreen = () => {
  const route = useRoute();
  const { apiData }: any = route.params || {};

  const { data: getway, isLoading: getwayLoading } = usePaymentGatway()
  const { data: guid, isLoading: guidLoading } = usePaymentGuid()

  if (!apiData) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available.</Text>
      </View>
    );
  }

  const { order_id, payment_url, upi_id_hash, upi_intent } = apiData;

  const handleOpenUrl = (url: any) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    }
  };

  // console.log("guid: ", guid?.data?.data);
  // console.log("getway: ", getway?.data?.data);


  // navigation.navigate(NavigationString.TransactionSuccessful, { amount: addAmount, bonus: bonuseAmount, bonusCashExpireDate: data?.data?.bonusCashExpireDate })

  /*  const openURL = (url: string) => {
     const finalURL = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
     Linking.openURL(finalURL);
   }; */
  const openURL = (url: string) => {
    // console.log("url: ", url);

    const finalURL = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    // console.log("finalURL: ", finalURL);
    if (url.startsWith("http://") || url.startsWith("https://")) {
      Linking.openURL(finalURL).catch(err => console.warn("Failed to open URL:", err));
    }
  };

  const extractStepAndContent = (text: string) => {
    const regex = /^(step\s*\d+[\)\.\s]*)/i; // match "step 1)", "step 2.", "step 3", etc.
    const match = text.match(regex);

    if (match) {
      const step = match[1].trim(); // "Step 6)"
      const content = text.replace(regex, "").trim(); // "https://www.wonbybid.com/"
      return { step, content };
    }

    return { step: null, content: text };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Payment Gateway</Text>

      {/* <View style={styles.section}>
        <Text style={styles.label}>Payment</Text>
        <TouchableOpacity onPress={() => handleOpenUrl(payment_url)} style={styles.imageContainer}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1042/1042392.png', }} style={styles.image} resizeMode="contain" />
          <Text style={{ color: "white", fontSize: 24 }}>Tap here to open the QR code</Text>
        </TouchableOpacity>
      </View> */}

      {/* <Text style={[styles.label, { marginBottom: 16 }]}>Pay via UPI Apps</Text> */}

      <View style={{ height: 500, marginVertical: 16 }}>
        <WebView
          source={{ uri: payment_url }}
          style={{ flex: 1, borderRadius: 8 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>

      {getway?.data?.data?.isActive ?
        <View style={styles.paymentMethodsContainer}>
          <TouchableOpacity style={styles.paymentMethod} onPress={() => handleOpenUrl(upi_intent?.bhim_link)}>
            <Image source={require("../assets/images/bhim-upi-icon.png")} style={styles.paymentMethodImage} resizeMode="contain" />
            {/* <Image source={{ uri: upi_intent?.bhim_link || 'https://cdn-icons-png.flaticon.com/512/1042/1042392.png', }} style={styles.paymentMethodImage} resizeMode="contain" /> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentMethod} onPress={() => handleOpenUrl(upi_intent?.phonepe_link)}>
            <Image source={require("../assets/images/phone.png")} style={styles.paymentMethodImage} resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentMethod} onPress={() => handleOpenUrl(upi_intent?.gpay_link)}>
            <Image source={require("../assets/images/gpay.png")} style={styles.paymentMethodImage} resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentMethod} onPress={() => handleOpenUrl(upi_intent?.paytm_link)}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Paytm_logo.png/800px-Paytm_logo.png', }} style={styles.paymentMethodImage} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        :
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>How To Make Payment</Text>
          {/* {guid?.data?.data?.map((item: any, ind: any) => {
            const name = item?.name;
            return (
              <View key={ind}>
                <TouchableOpacity onPress={() => openURL(name)}>
                  <Text style={[styles.paragraph, { color: '#ccc', textDecorationLine: isValidURL(name) ? 'underline' : 'none' }]}>{name}</Text>
                </TouchableOpacity>
              </View>
            )
          })} */}
          {guid?.data?.data?.map((item: any, ind: number) => {
            const name = item?.name || "";
            const { step, content } = extractStepAndContent(name);

            return (
              <View key={ind} style={{ marginBottom: 10 }}>
                {step && <Text style={[styles.paragraph, { fontWeight: "bold" }]}>{step}</Text>}
                <TouchableOpacity onPress={() => openURL(content)}>
                  {/* <Text style={{ color: "blue", textDecorationLine: "underline" }}>{content}</Text> */}
                  <Text style={styles.paragraph}>{content}</Text>
                </TouchableOpacity>
                {/* {isValidURL(content) ? (
                  <TouchableOpacity onPress={() => openURL(content)}>
                    <Text style={{ color: "blue", textDecorationLine: "underline" }}>{content}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.paragraph}>{content}</Text>
                )} */}
              </View>
            );
          })}

        </ScrollView>
      }



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    width: '100%',
  },
  label: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  value: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  imageContainer: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentMethod: {
    width: '24%',
    aspectRatio: 1,
    backgroundColor: '#222',
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  paymentMethodImage: {
    width: '100%',
    height: '100%',
  },
  noDataText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "white"
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: "white"

  },
  subHeading2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: "white"

  },
  paragraph: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 20,
    color: '#ccc',

  },
});

export default PaymentScreen;