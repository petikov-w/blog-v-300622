import {computed} from "vue";
import stores from "../store/stores"
import {PhoneNumberFormat} from "./function"


const telefon = computed(() => PhoneNumberFormat(stores.getters.getTelefon));
const telefon_a = computed(() => stores.getters.getTelefon);
const email = computed(() => stores.getters.getEmail);

const handleSaveSet = async() => {
    const email_r = (document.getElementById('email').value.length===0
        ? email.value
        : document.getElementById('email').value);
    const telefon_r = (document.getElementById('telefon').value.length===0
        ? telefon_a.value
        : document.getElementById('telefon').value);
    const data = { "mail": email_r, "telefon": telefon_r }
    const res =await fetch('http://api.blog.loc/settings',
        {method: "PATCH", body: JSON.stringify(data)});
    let resData = await res.json();
    if (resData.status === true) {await stores.dispatch('setSettings');}
    document.getElementById('email').value = "";
    document.getElementById('telefon').value = "";
};

export {
    telefon,
    telefon_a,
    email,
    handleSaveSet
}