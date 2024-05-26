

/**
 * @desc reduceTextLength: function to truncate content length
 * @param content text to truncate
 * @param maxLength desired length to truncate to (default is 20 characters)
 * @param option ("letter" | "word") default letter
 * @returns truncated content
 */
export const reduceTextLength = (content: string, maxLength=20, option:('letter'|'word')='letter') => {
  let responseOutput = '';
  if(option === 'letter'){
    responseOutput = content?.length > maxLength ? content?.substring(0, maxLength) +'...' : content
  }
  else if(option === 'word'){
    responseOutput = content?.split(' ')?.length > maxLength ? content?.substring(0, maxLength * 4) +'...' : content
  }
  return responseOutput
}

/**
 * @desc checkCount: function that checks the length of a content
 * @param content
 * @Return returns content length
 */
export const checkCount = <T>(content: T[] | T): string => {
  let count = ''; 
  const length = Array.isArray(content) ? content?.length : content as number;
  if(length <= 999){
    if(Array.isArray(content)){
      if(length == 1 && content[0] == '') count = '0'
      else count = length.toString()
    }
    else count = length.toString()
  }
  else if(length > 999 && length <= 999_999)
    count = ((length / 1000).toFixed(1)).toString() + 'K'
  else if(length > 999_999 && length <= 999_999_999)
    count = ((length / 1000_000).toFixed(1)).toString() + 'M'
  else if(length > 999_999_999)
    count = ((length / 1000_000_000).toFixed(1)).toString() + 'B'
  return count
}

/**
 * @desc formatPrice: function to format price into human readable form
 * @param {*} price
 * @Return returns formatted price
 */
export const formatPrice = (price:number=0, decimalPlace=0) => {
  return price.toFixed(decimalPlace).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/**
 * @description fansRating - returns rate count 
 * @params rate
 */

export const fansRatings = (rate: number) => {
  return [...Array(rate).keys()]
}

/**
 * @desc dateFormatter: function to change the date format to {Year/Month/Day}
 * @param {*} date format {Day/Month/Year}
 * @Return returns formatted date
 */

// export const dateFormatter = (date: string): string => {
//   let minimumDate;
//   minimumDate = date?.split("/");
//   if (minimumDate[0]?.length == 1 && minimumDate[1]?.length == 1) {
//     minimumDate = `${minimumDate[2]}-0${minimumDate[0]}-0${minimumDate[1]}`;
//   } else if (minimumDate[0]?.length > 1 && minimumDate[1]?.length == 1) {
//     minimumDate = `${minimumDate[2]}-${minimumDate[0]}-0${minimumDate[1]}`;
//   } else if (minimumDate[0]?.length == 1 && minimumDate[1]?.length > 1) {
//     minimumDate = `${minimumDate[2]}-0${minimumDate[0]}-${minimumDate[1]}`;
//   } else {
//     minimumDate = `${minimumDate[2]}-${minimumDate[0]}-${minimumDate[1]}`;
//   }
//   return minimumDate
// }

export function sanitizeString(entry: string) {
  const val =  entry.trim()
  val.replace(/</g, '&lt;') // Replace less-than sign
    .replace(/>/g, '&gt;') // Replace greater-than sign
    .replace(/"/g, '&quot;') // Replace double quote
    .replace(/'/g, '&#39;'); // Replace single quote
  return val
}

/**
 * @description sanitizeEntries - sanitizes object entries
 * @param entries - object to sanitize
 * 
 * @returns the sanitized object
 */
export function sanitizeEntries<T extends object>(entries: T): T {
  const sanitizedValues = Object.entries(entries).map(([key, value]) => {
    if (typeof value === 'string') return [key, sanitizeString(value)]
    else return [key, value]
  })
  return Object.fromEntries(sanitizedValues)
}

export const convertToMinutes = (duration: number): number | string => {
  if (duration === 0) return '--:--';
  else if (duration < 60) {
    const getSeconds = (Math.floor(duration)).toString();
    const padSeconds = getSeconds.length === 1 ? getSeconds.padStart(2, '0') : getSeconds;
    return `00.${padSeconds}`;
  }
  else {
    const minutes = (Math.floor(duration / 60)).toString();
    const seconds = (Math.floor(duration % 60)).toString();
    const padSeconds = seconds.length === 1 ? seconds.padStart(2, '0') : seconds;
    const padMinutes = minutes.length === 1 ? minutes.padStart(2, '0') : minutes;
    return `${padMinutes}.${padSeconds}`;
  }
}

export const getName = (name: string): string => name[0];