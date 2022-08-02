<template lang="pug">
.wrapper
  AdminPanel
    include ../assets/pug/AdminMenu
  form.settings-form(@submit.prevent="onSubmit")
   .input
      label(for="email") Адрес электронной почты
      input( required name="email" id="email" placeholder="email")
      p Текущий адрес эл.почты: <strong>{{ email }} </strong>
   .input
      label(for="telefon") Телефон в шапке сайта
      input(required name="telefon" id="telefon" placeholder="Телефон")
      p Текущий номер телефона: <strong>{{ telefon }} </strong>

   button(@click="handleSave()" type="submit") Сохранить

</template>

<script>

import {useStore} from 'vuex'
import { computed} from "vue";
import AdminPanel from "@/components/AdminPanel";
import {PhoneNumberFormat} from "@/assets/js/function";

export default {
  name: "AdminPageMainSet",
  components: {AdminPanel},

  setup() {
    const store = useStore();
    store.dispatch('setSettings');
    const telefon = computed(() => PhoneNumberFormat(store.getters.getTelefon));
    const telefon_a = computed(() => store.getters.getTelefon);
    const email = computed(() => store.getters.getEmail);

    const handleSave = async() => {
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
        if (resData.status === true) { store.dispatch('setSettings');}
        document.getElementById('email').value = "";
        document.getElementById('telefon').value = "";

    };

    return {telefon, email, handleSave }
  }
}
</script>

<style lang="scss" scoped>
</style>