import { Dimensions } from "react-native";

 export const serverBaseURL = 'https://restapi.wonbybid.com/api/';
// export const serverBaseURL = 'http://192.168.29.4:5000/api/';

// export const razorKeyTest = "rzp_live_gv4FVdLog5EVaq"
// Testing
// export const razorKeyTest = "rzp_test_FxjiqHF1LmQjjQ"
// Production
export const razorKeyTest = "rzp_live_8ibKv8nWx4tt7j"


//Device dimensions
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export const deviceWidth = viewportWidth;
export const deviceHeight = viewportHeight;

export const shadowStyle = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
}

/* export function formatAmount(amount: number) {
  const crore = 10000000;
  const lakh = 100000;

  if (amount >= crore) {
    return `${(amount / crore).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} Cr`;
  } else if (amount >= lakh) {
    return `${(amount / lakh).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} L`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} K`;
  } else {
    return amount?.toString(); // return as-is for amounts less than 1000
  }
} */
export function formatAmount(amount: number): string {
  const crore = 10000000;
  const lakh = 100000;

  if (amount >= crore) {
    // Crore formatting remains as it is
    return `${(amount / crore).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} Cr`;
  } else if (amount >= lakh) {
    // For Lakh, add "Lakh" or "Lakhs" based on the value
    const formattedAmount = (amount / lakh).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    const suffix = amount >= 2 * lakh ? "Lakhs" : "Lakh";
    return `${formattedAmount} ${suffix}`;
  } else if (amount >= 1000) {
    // For values in the thousands, show exact value with 2 decimal places
    return amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  } else {
    // For amounts less than 1000, return as-is
    return amount?.toFixed?amount?.toFixed(2):`${amount}`;
  }
}


export const CatergoryTypes = [
  { label: 'All', value: 'all' },
  { label: '15 min', value: '15' },
  { label: '30 min', value: '30' },
  { label: '1 hour', value: '1' },

]

export const CatergoryTimeSlotTypes = [
  { label: '10:00 am', value: '10:00' },
  { label: '11:00 am', value: '11:00' },
  { label: '12:00 pm', value: '12:00' },
  { label: '01:00 pm', value: '01:00' },
  { label: '02:00 pm', value: '02:00' },


]

export const transactionTypes = [
  { label: 'All', value: 'All' },
  { label: 'Credit', value: 'credit' },
  { label: 'Debit', value: 'debit' },
  { label: 'Withdraw', value: 'withdraw' },
  { label: 'Winning', value: 'winning' },
]

export const privateContestTransactionTypes = [
  { label: 'All Transactions', value: 'alltransactions' },
  { label: 'Withdrawals', value: 'withdrawals' },
  { label: 'Game Transaction', value: 'gametransaction' },
  { label: 'Bonuses', value: 'bonuses' },
  { label: 'Other Transactions', value: 'othertransactions' },
]