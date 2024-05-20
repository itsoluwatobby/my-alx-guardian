type RegexType = 'passwd' | 'email'
export const validation_regex: Record<RegexType, RegExp> = {
  "email": /^[a-zA-Z\d]+[@][a-zA-Z\d]{2,}\.[a-z]{2,4}$/,
  "passwd": /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!£%?&])[A-Za-z\d@£$!%?&]{9,}$/
}
