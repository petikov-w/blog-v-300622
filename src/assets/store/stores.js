import {createStore} from "vuex";
import {ref} from "vue";

export default createStore({
        state: function () {
            const telefon = ref("79094282452");
            const contentHeader=  {
                logo: require('@/assets/images/logo-2.jpg'),
                telefon: telefon.value,
                subtitle: "Срочный вопрос"
            }

            const main_content = {
                title: "Качественный газ для газгольдера",
                subtitle: "Доставка в любое время дня и ночи вне зависимости от погодных условий"
            };

            // const images = {
            //     big_car: require('@/assets/images/car_1.png'),
            //     button: require('@/assets/images/btn_zakaz_gaz.png')
            // }
            return {
                main_content,
                // images,
                contentHeader,
                telefon
            }
        }
    }
    )
