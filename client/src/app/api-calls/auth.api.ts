import { guardianAPI } from "../config";
import { AUTH } from "../endpoints/auth.endpoints";

const {
  signin, accountActivation, register, signout, verifyOTP,
  resendOTP, forgotPassword, passwordReset,
} = AUTH;

export const signup = async (newUser: UserInfoType): Promise<RegistrationResponse> => {
  const response = await guardianAPI[register.method](
    register.url, newUser) as { data: RegistrationResponse };
  return response.data
}

export const activateAccount = async (credential: AccountActivationRequest): Promise<AccountActivationResponse> => {
  const response = await guardianAPI[accountActivation.method](
    accountActivation.url, credential) as { data: AccountActivationResponse };
  return response.data
}

export const login = async (credential: LoginRequest): Promise<LoginResponse> => {
  const response = await guardianAPI[signin.method](
    signin.url, credential) as { data: LoginResponse };
  return response.data
}

export const logout = async (user: LogoutRequest): Promise<LogoutResponse> => {
  const response = await guardianAPI[signout.method](
    signout.url, user) as { data: LogoutResponse };
  return response.data
}

export const forgot_Password = async (credential: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  const response = await guardianAPI[forgotPassword.method](
    forgotPassword.url, credential) as { data: ForgotPasswordResponse };
  return response.data
}

export const password_reset = async (passObj: PasswordResetRequest): Promise<PasswordResetResponse> => {
  const response = await guardianAPI[passwordReset.method](
    passwordReset.url, passObj) as { data: PasswordResetResponse };
  return response.data
}

export const resendOtp = async (otpObj: ResendOTPRequest): Promise<ResendOTPResponse> => {
  const response = await guardianAPI[resendOTP.method](
    resendOTP.url, otpObj) as { data: ResendOTPResponse };
  return response.data
}

export const verifyOtp = async (credential: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
  const response = await guardianAPI[verifyOTP.method](
    verifyOTP.url, credential) as { data: VerifyOTPResponse };
  return response.data
}
