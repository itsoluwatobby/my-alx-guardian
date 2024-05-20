async function guardianAsyncWrapper<T>(callback: () => T) {
  try {
    return await callback();
  }
  catch(error) {
    // handle errors later
    return error;
  }
}

export default guardianAsyncWrapper;