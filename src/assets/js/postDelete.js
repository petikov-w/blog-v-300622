import {ref, computed} from "vue";
import stores from "../store/stores"

const dialogVisibleDelete = ref(false);
// const current_post = ref([]);
const current_post = computed(() => stores.getters.getCurrentPost);
const clickPostDelete = async () => {
   const res = await fetch(`http://api.blog.loc/posts/${current_post.value.id}`,{ method: "DELETE" });
   if (res.ok) { dialogVisibleDelete.value=false; await stores.dispatch('setPosts') }
    stores.dispatch('setIsNewPost', true);
    stores.dispatch('setIsUpdatePost', false);
};
const showDialogDelete = (value) => {
    dialogVisibleDelete.value=true;
    stores.dispatch('setCurrentPost', value);
    // current_post.value=value;
}
const hiddenDialogDelete = () => {dialogVisibleDelete.value=false;}

export {dialogVisibleDelete,
        clickPostDelete,
        showDialogDelete,
        hiddenDialogDelete }