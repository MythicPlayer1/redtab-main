import { Country } from "country-state-city";
import NepaliDate from 'nepali-date-converter'
export function emailValidator(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

//phone number validation for nepal and atleast 10 digit and starts with 9 and all should be number
export function phoneValidator(phone: string) {
  const re = /^\d{1,18}$/;
  return re.test(phone);
}

//form validation for all field in the form, if any field is empty it will return false
export function formValidator(data: any) {
  let isValid = true;
  for (let key in data) {
    if (data[key] === "") {
      isValid = false;
    }
  }
  return isValid;
}

//country verification
export function countryValidator(country: string) {
  const countryList= Country.getAllCountries();
  //if the country is found in the list then return true or return false 
  return countryList.find((item) => item.name === country);
  
}


//date converter
export function convertDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function convertDateToNepaliFormat() {
  const date = new Date();
  const nepaliDate = new NepaliDate(date);
  const year = nepaliDate.getYear();
  const month = String(nepaliDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
  const day = String(nepaliDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function convertDateToNepali() {
  const date = new Date();
  const nepaliDate = new NepaliDate(date);
  const year = nepaliDate.getYear();
  const month = String(nepaliDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
  const day = String(nepaliDate.getDate()).padStart(2, '0');
  return {year, month, day};
}

//if inputs field has some string, convert them inoto number and return the number
export function numberConverter(value: string): boolean {
  if (value === "") {
    return false;
  }
  
  // Regular expression to check if the string is a 10-digit number starting with 9
  const regex = /^9\d{9}$/;
  if (!regex.test(value)) {
    return false;
  }

  const numberValue = Number(value);
  return !isNaN(numberValue);
}

export const getMerchantOutletUUID =()=>{
  const data= sessionStorage.getItem("token-storage");
  const merchantProfileUUID = JSON.parse(data as string)?.state?.merchantProfileUUID[0]?.uuid;
  return merchantProfileUUID;
}

// function to get the first and second letter of the name
export const takeFirstLetterOfFullName = (name: string): string => {
  if (!name) {
    return "RT";
  }

  // remove any non-alphabetic characters
  const removeNonAlphabetFromName = name.replace(/^[^a-zA-Z]+/, ""); 

  // Split the name by spaces
  const nameArray = removeNonAlphabetFromName.split(" ").filter((word) => word.length > 0);

  // remove non-alphabetic characters from the first word
  const firstWord = nameArray[0]?.replace(/[^a-zA-Z]/g, "");

  // get the first letter after removing non-alphabetic characters
  const firstLetter = firstWord?.charAt(0)?.toUpperCase();

  // check for non-alphabetic characters in the second word
  const secondWord = nameArray[1];
  const hasNonAlphabetInSecondWord = secondWord && /[^a-zA-Z]/.test(secondWord);

  // If the second word exists and doesn't contain non-alphabetic characters, take the first letter
  const secondLetter = !hasNonAlphabetInSecondWord && nameArray[1]
    ? nameArray[1].charAt(0).toUpperCase()
    : undefined;

  // If both letters are present, return both, else return only the first letter
  if (firstLetter && secondLetter) {
    return firstLetter + secondLetter;
  } else if (firstLetter) {
    return firstLetter;
  } else {
    return "RT";
  }
};

export const checkMerchantUUID = ()=>{
  const data= localStorage.getItem("merchant-profile-storage");
  const merchantProfileUUID = JSON.parse(data as string)?.state?.merchantProfileUUID;
  if(merchantProfileUUID && merchantProfileUUID !== ""){
    return merchantProfileUUID;
  }else{
    return null;
  }
}

//write a function to check the future date if input date is future data then retrn false else return true
export function futureDateValidator(date: string) {
  try {
    const currentDate = new NepaliDate();
    const inputDate = new NepaliDate(date);
    if(currentDate.toJsDate() >= inputDate.toJsDate()){
      return true;
    }else{
      return{status: false, message: "Date should not be in future"};
    }
    
  } catch (error) {
    return {status: false, message: "Invalid date format"};
  }
 

  
  
}


// futureDateValidator("2078-01-01");
