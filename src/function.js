export const secWord = (str, count) => {
    const adis = str.split(" ");
    let result = '';
    for(let i=0; i < count; i++) {
        if(typeof adis[i]==='undefined') adis[i]="";
        result += adis[i]+" "; }
    result += "...";
    return result;}