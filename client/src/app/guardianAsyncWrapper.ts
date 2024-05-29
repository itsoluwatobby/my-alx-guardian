import { toast } from "react-toastify";

export const guardianAsyncWrapper = async <T>(callback: () => T, setAppStateType: React.Dispatch<React.SetStateAction<AppStateType>>) => {
  try {
    return await callback();
  }
  catch(error) {
    console.log(error);
    const errorRes = error as ErrorResponse
    setAppStateType(prev => ({ ...prev, isError: true }))
    console.log(errorRes.response)
    toast.error(errorRes.response.data.message.split(': ')[1]);
  }
  finally {
    setAppStateType(prev => ({ ...prev, loading: false })) 
  }
}
