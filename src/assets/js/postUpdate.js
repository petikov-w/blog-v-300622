import {ref, computed} from "vue";
import stores from "../store/stores"

const dialogVisibleUpdate = ref(false);
// const current_post = ref([]);
const current_post = computed(() => stores.getters.getCurrentPost);



const handleSaveUpdate = async() => {
    // console.log("==========> ", current_post.value.title);
    const data = {
        title: current_post.value.title,
        body: current_post.value.body
    };
    const res = await fetch(`http://api.blog.loc/posts/${current_post.value.id}`,
        {
            method: "PATCH",
            body: JSON.stringify(data)
        });
    if (res.ok === true)  await stores.dispatch('setPosts');
    stores.dispatch('setIsNewPost', true);
    stores.dispatch('setIsUpdatePost', false);
    // newPost.value = true;
    // updatePost.value = false;
    dialogVisibleUpdate.value=false;
};
const clickPostUpdate = (value) => {
    stores.dispatch('setIsNewPost', false);
    stores.dispatch('setIsUpdatePost', true);
    stores.dispatch('setCurrentPost', value);
    //current_post.value = value;
    //console.log("====000====>>>  ",current_post.value);
};
const hiddenDialogUpdate = () => {dialogVisibleUpdate.value=false;}
const handleChange = () => dialogVisibleUpdate.value = true;
export {
    dialogVisibleUpdate,
    clickPostUpdate,
    hiddenDialogUpdate,
    handleSaveUpdate,
    handleChange
}