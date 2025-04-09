import { ta } from 'element-plus/es/locales.mjs';
import { defineStore } from 'pinia'
import { ref } from 'vue'

function initState() {
    return {
        isCollapse: false,
        tags: [
            {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "home",
            },
        ],
    }
}
const getImage = (user) =>
    new URL(`../assets/images/${user}.png`, import.meta.url).href;
// import.meta.url 表示当前的绝对路径 href是URL的一个属性，表示一个字符串。
export const useAllDataStore = defineStore('allData', () => {

    const state = ref(initState())
    function addMenu(val) {
        if (val.name !== 'home') {
            //这里添加如果点击的不是home时，先找一下tags中是否存在点击的菜单
            let index = state.value.tags.findIndex(item => item.name === val.name)
            //如果不存在则添加到tags中
            index === -1 ? state.value.tags.push(val) : ""
        }
    }
    function updateTags(tag) {
        let index = state.value.tags.findIndex((item) => item.name === tag.name)
        state.value.tags.splice(index, 1)
    }
    return {
        state,
        getImage,
        addMenu,
        updateTags
    }
})
