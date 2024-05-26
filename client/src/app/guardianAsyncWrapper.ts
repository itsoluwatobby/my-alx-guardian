async function guardianAsyncWrapper<T>(callback: () => T, setAppStateType: React.Dispatch<React.SetStateAction<AppStateType>>) {
  try {
    return await callback();
  }
  catch(error) {
    // handle errors later
    setAppStateType(prev => ({ ...prev, isError: true })) 
    return error;
  }
  finally {
    setAppStateType(prev => ({ ...prev, loading: false })) 
  }
}

export default guardianAsyncWrapper;