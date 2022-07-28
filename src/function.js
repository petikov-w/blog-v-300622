export const secWord = (str, count) => {
    const adis = str.split(" ");
    let result = '';
    for(let i=0; i < count; i++) {
        if(typeof adis[i]==='undefined') adis[i]="";
        result += adis[i]+" "; }
    result += "...";
    return result;}

export const PhoneNumberFormat = (number) => {
    let temp_number;
    let pref;
    temp_number = `${number}`;
    if (temp_number[0] == '8') {
        pref = temp_number.substr(0, 1)
    }
    // console.log(temp_number);
    if (temp_number[0] == '7') {
        pref = '+' + temp_number.substr(0, 1)
    }
    temp_number = temp_number.substr(-10);
    return `${pref} (${temp_number.substr(0, 3)}) ${temp_number.substr(3, 3)}-${temp_number.substr(6, 2)}-${temp_number.substr(8, 2)}`;
}
