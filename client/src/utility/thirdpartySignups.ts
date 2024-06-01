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

  async googleSignup(): Promise<any> {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      return result.user;
    }
    catch (error: any) {
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ error, credential });
      return error;
    }
  }
  async githubSignup(): Promise<any> {
    try {
      const result = await signInWithPopup(this.auth, this.githubProvider);
      return result.user;
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
