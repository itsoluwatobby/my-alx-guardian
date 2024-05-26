/* eslint-disable @typescript-eslint/no-explicit-any */
import { app } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, getAuth, Auth } from "firebase/auth";

class ThirdPartyAuthentication {

  private googleProvider = new GoogleAuthProvider();
  private githubProvider = new GithubAuthProvider();
  private auth: Auth = getAuth(app);
  
  constructor() {
    this.auth.useDeviceLanguage();
    this.githubProvider.setCustomParameters({
      'display': 'popup'
    });
  }

  async googleSignup(): Promise<{user: any; token: string}> {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)!;
      const token = credential.accessToken as string;
      const user = result.user;
      return { user, token }
    }
    catch (error: any) {
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ error, credential });
      return error;
    }
  }
  async githubSignup(): Promise<{user: any; token: string}> {
    try {
      const result = await signInWithPopup(this.auth, this.githubProvider)
      const credential = GithubAuthProvider.credentialFromResult(result)!;
      const token = credential.accessToken as string;
      const secret = credential.secret as string;
      const user = result.user;
      console.log(secret);
      return { user, token };
    }
    catch (error: any) {
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      console.log({ error, credential });
      return error;
    }
  }
}

export const thirdPartyAuthentication = new ThirdPartyAuthentication();
