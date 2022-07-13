<template lang="pug">
.wrapper
  AdminPanel
    include ../assets/pug/AdminMenu
  form.note-form(@submit.prevent="onSubmit")
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

export default {
  name: "AdminPageMainSet",
  components: {AdminPanel},

  setup() {
    const store = useStore();
    store.dispatch('setSettings');
    const telefon = computed(() => PhoneNumberFormat(store.getters.getTelefon));
    const telefon_a = computed(() => store.getters.getTelefon);
    const email = computed(() => store.getters.getEmail);
    //console.log(telefon,"  ",email);
    const PhoneNumberFormat = (number) => {
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
    const handleSave = async() => {
        const email_r = (document.getElementById('email').value.length===0
                         ? email.value
                         : document.getElementById('email').value);
        const telefon_r = (document.getElementById('telefon').value.length===0
                         ? telefon_a.value
                         : document.getElementById('telefon').value);
        const data = { "mail": email_r, "telefon": telefon_r }


        // console.log('=uuuu=> ',document.getElementById('email').value.length);
        // console.log('=0=> ',email, '=0=> ',telefon_a);
        // console.log('=1=> ',email_r);
        // console.log('=2=> ',telefon_r);
        // console.log('= data => ',data);
        // console.log('= data 2 => ',JSON.stringify(data));

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
::placeholder {
  text-transform: lowercase;
  @include font(16px, 500, 20px, #2D2D2D80);
}

.note-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  .input {
    display: flex;
    align-items: center;
    margin-bottom: -10px;
    p {
      margin-bottom: 20px;
      color: #2D2D2D;
    }
  }
  .telefon {
    //font-family: $font-OpenSans;
    @include font(20px, 400, 30px, #ffffff);
  }
  #telefon {
    margin-left: 35px;
  }

  label {
    margin-right: 20px!important;
    color: #303133;
    padding-bottom: 15px;
    @include font(18px, 400, 18px, #0c0c0c);
  }

  input {
    display: flex;
    align-items: center;
    width: 300px;
    height: 40px;
    border-radius: 5px;
    padding: 5px 20px;
    margin: 5px 17px 25px;
    color: #EF5221;
    background-color: #c8cdd2;
    border: none;
  }

  button{
    margin-top: 30px!important;
    padding: 10px 30px;
    border-radius: 8px;
    border: 1px solid #EF6D00;
    cursor: pointer;
    background: #EF6D00;
    color: #f1f1f1;
    width: max-content;
    &:hover {
      background: #f1f1f1;
      color: #EF6D00;
      border: 1px solid #EF6D00;
    }
  }
}


</style>