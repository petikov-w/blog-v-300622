import {ref, computed} from "vue";
// import {ref} from "vue";
import stores from "../store/stores"
import router from "../../routers"

const dialogVisibleUpdate = ref(false);
const current_post = computed(() => stores.getters.getCurrentPost);

const handleSaveUpdate = async() => {
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
    // stores.dispatch('setIsListPosts', true);
    // stores.dispatch('setIsUpdatePost', false);
    dialogVisibleUpdate.value=false;
    // console.log("****** W ******* ",current_post.value);
    router.push({ name: 'admin-posts-list' });
    stores.dispatch('setCurrentRoute', 'admin-posts-list');
};

const clickPostUpdate = (value) => {
    // stores.dispatch('setIsListPosts', false);
    // stores.dispatch('setIsUpdatePost', true);
    stores.dispatch('setCurrentPost', value);
    router.push({ name: 'admin-post-update' });
    stores.dispatch('setCurrentRoute', 'admin-post-update');
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