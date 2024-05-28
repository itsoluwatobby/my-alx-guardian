import { guardianAPI } from "../config";
import { AUTH } from "../endpoints/auth.endpoints";

const {
  signin, accountActivation, register, signout, verifyOTP,
  resendOTP, forgotPassword, passwordReset,
} = AUTH;

class AuthenticationAPI{

  async signup(newUser: UserInfoType): Promise<RegistrationResponse> {
    const response = await guardianAPI[register.method](
      register.url, newUser) as { data: RegistrationResponse };
    return response.data
  }

  async activateAccount(credential: AccountActivationRequest): Promise<AccountActivationResponse> {
    const response = await guardianAPI[accountActivation.method](
      accountActivation.url, credential) as { data: AccountActivationResponse };
    return response.data
  }

  async login(credential: LoginRequest): Promise<LoginResponse> {
    const response = await guardianAPI[signin.method](
      signin.url, credential) as { data: LoginResponse };
    return response.data
  }

  async logout(user: LogoutRequest): Promise<LogoutResponse> {
    const response = await guardianAPI[signout.method](
      signout.url, user) as { data: LogoutResponse };
    return response.data
  }

  async forgot_Password(credential: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const response = await guardianAPI[forgotPassword.method](
      forgotPassword.url, credential) as { data: ForgotPasswordResponse };
    return response.data
  }

  async password_reset(passObj: PasswordResetRequest): Promise<PasswordResetResponse> {
    const response = await guardianAPI[passwordReset.method](
      passwordReset.url, passObj) as { data: PasswordResetResponse };
    return response.data
  }

  async resendOtp(otpObj: ResendOTPRequest): Promise<ResendOTPResponse> {
    const response = await guardianAPI[resendOTP.method](
      resendOTP.url, otpObj) as { data: ResendOTPResponse };
    return response.data
  }

  async verifyOtp(credential: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    const response = await guardianAPI[verifyOTP.method](
      verifyOTP.url, credential) as { data: VerifyOTPResponse };
    return response.data
  }
}

export const authenticationAPI = new AuthenticationAPI();
