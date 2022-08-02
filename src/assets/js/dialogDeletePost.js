import {ref} from "vue";
import {useStore} from "vuex";


const store = useStore();

const dialogVisibleDelete = ref(false);

const clickPostDelete = async (value) => {
    current_post.value = value;
    const res = await fetch(`http://api.blog.loc/posts/${current_post.value.id}`,
        { method: "DELETE" });
    if (res.ok === true)  await store.dispatch('setPosts');
    dialogVisibleDelete.value=false;
};

const hiddenDialogDelete = () => {dialogVisibleDelete.value=false;}

export {dialogVisibleDelete, clickPostDelete, hiddenDialogDelete}