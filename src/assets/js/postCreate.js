//import {ref, computed} from "vue";
import stores from "../store/stores"

const handleSave = async() => {
    const post_title = (document.getElementById('body-title').value.length===0
        ? 'Ошибка 1'
        : document.getElementById('body-title').value);
    const post_body = (document.getElementById('body-post').value.length===0
        ? 'Ошибка 2'
        : document.getElementById('body-post').value);
    let formData = new FormData();
    formData.append('title', post_title);
    formData.append('body', post_body);
    const res =await fetch('http://api.blog.loc/posts',{method: "POST", body: formData});
    if (res.ok) { await stores.dispatch('setPosts') }
    document.getElementById('body-title').value = "";
    document.getElementById('body-post').value = "";
    await stores.dispatch('setPosts');
};

export {
    handleSave
}