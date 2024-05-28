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