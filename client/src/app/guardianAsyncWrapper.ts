import { toast } from "react-toastify";

async function guardianAsyncWrapper<T>(callback: () => T, setAppStateType: React.Dispatch<React.SetStateAction<AppStateType>>) {
  try {
    await callback();
  }
  catch(error) {
    console.log(error)
    const errorRes = error as ErrorResponse
    setAppStateType(prev => ({ ...prev, isError: true }))
    toast.error(errorRes.message);
  }
  finally {
    setAppStateType(prev => ({ ...prev, loading: false })) 
  }
}

export default guardianAsyncWrapper;