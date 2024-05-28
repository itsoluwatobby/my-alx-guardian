import { toast } from "react-toastify";

async function guardianAsyncWrapper<T>(callback: () => T, setAppStateType: React.Dispatch<React.SetStateAction<AppStateType>>) {
  try {
    return await callback();
  }
  catch(error) {
    const errorRes = error as ErrorResponse
    setAppStateType(prev => ({ ...prev, isError: true }))
    toast.error(errorRes.message);
    // return error;
  }
  finally {
    setAppStateType(prev => ({ ...prev, loading: false })) 
  }
}

export default guardianAsyncWrapper;