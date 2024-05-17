import { Context, useContext } from "react"
import { GuardianContext } from "../context/GuardianContext"

export const useGuardianContext = () => {
  return useContext<GuardianContextType>(GuardianContext as Context<GuardianContextType>)
}