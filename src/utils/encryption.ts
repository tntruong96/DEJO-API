
import * as CryptoJS  from 'crypto-js';

const password = 'dejosaigon';



export const encrypt =  (text: string) => {

    const encryptedText = CryptoJS.AES.encrypt(text, password);
    
    return encryptedText;
}

export const decrypt =   (encryptedText) => {
   
    const decryptedText = CryptoJS.AES.decrypt(encryptedText, password);
    return decryptedText.toString(CryptoJS.enc.Utf8);
}
