import { toast } from "react-toastify";

export const guardianAsyncWrapper = async <T>(callback: () => T, setAppStateType: React.Dispatch<React.SetStateAction<AppStateType>>) => {
  try {
    return await callback();
  }
  catch(error) {
    const errorRes = error as ErrorResponse
    setAppStateType(prev => ({ ...prev, isError: true }))
    console.log(errorRes.response)
    const msg = errorRes.response.data.message.split(': ')[1] ?? errorRes.response.data.message
    toast.error(msg);
  }
  finally {
    setAppStateType(prev => ({ ...prev, loading: false })) 
  }
}
