/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

export const guardianAsyncWrapper = async <T>(callback: () => T, setAppStateType: React.Dispatch<React.SetStateAction<AppStateType>>) => {
  try {
    return await callback();
  }
  catch(error: any) {
    const errorRes = error as ErrorResponse
    if (error.status === 'failed') {
      const msg = 'Image upload filed';
      setAppStateType(prev => ({ ...prev, isError: true, error: msg }))
      toast.error(msg);
    }
    else {
      const data = errorRes.response.data;
      const msg = data.message.split(': ')[1] ?? data.message
      setAppStateType(prev => ({ ...prev, isError: true, error: msg }))
      toast.error(msg);
    }
  }
  finally {
    setAppStateType(prev => ({ ...prev, loading: false })) 
  }
}
