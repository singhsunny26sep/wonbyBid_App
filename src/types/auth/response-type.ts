export interface GET_USER_LOGIN {
  success: boolean;
  message: string;
  data: {
    _id: string;
    email: string;
    otp: number;
  };
}


export interface GET_VERFIED_OTP {
  data: {
    _id: string;
  };
  message: string;
  success: boolean;
  token: string;
}