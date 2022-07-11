<template lang="pug">
//.wrapper-admin
.wrapper
  .title-panel Панель администратора
  form.note-form(@submit.prevent="onSubmit")
   .input
      label(for="email") Адрес электронной почты
      input( required name="email" id="email" placeholder="email")
      p Текущий адрес эл.почты: <strong>{{ email }} </strong>
   .input
      label(for="telefon") Телефон в шапке сайта
      input(required name="telefon" id="telefon" placeholder="Телефон")
      p Текущий номер телефона: <strong>{{ telefon }} </strong>

  button(@click="handleSave" type="submit") Сохранить

</template>

<script>
// import $router from "@/routers";
import {useStore} from 'vuex'
import {computed} from "vue";

export default {
  name: "AdminPage",
  setup() {
    const store = useStore();
    store.dispatch('setSettings');
    const telefon = computed(() => PhoneNumberFormat(store.getters.getTelefon));
    const email = computed(() => store.getters.getEmail);
    console.log(telefon,"  ",email);
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

    const handleSave = () => {};

    return {telefon, email, handleSave }
  }
}
</script>

<style lang="scss" scoped>
::placeholder {
  text-transform: lowercase;
  @include font(16px, 500, 20px, #2D2D2D80);
}
.input {
  display: flex;
  align-items: center;
  margin-bottom: -10px;
  p {
    margin-bottom: 20px;
    color: #2D2D2D;
  }
}

.title-panel {
  //font-family: $font-RobotoSlab;
  background-color: #4468e0;
  @include font(25px, 600, 30px, #FFFFFF);
  letter-spacing: 1.2px;
  padding: 10px 0 10px 20px ;
  margin: 25px 0;
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


</style>