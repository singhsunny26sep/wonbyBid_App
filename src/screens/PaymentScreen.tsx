import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView, Image, } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const PaymentScreen = () => {
  const route = useRoute();
  const { apiData }: any = route.params || {};

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

  // navigation.navigate(NavigationString.TransactionSuccessful, { amount: addAmount, bonus: bonuseAmount, bonusCashExpireDate: data?.data?.bonusCashExpireDate })

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

      <View style={{ height: 550, marginVertical: 16 }}>
        <WebView
          source={{ uri: payment_url }}
          style={{ flex: 1, borderRadius: 8 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>

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
});

export default PaymentScreen;