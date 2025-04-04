import { defineStore } from 'pinia'
import { ref } from 'vue'

function initState() {
    return {
        isCollapse: false
    }
}
const getImage = (user) =>
    new URL(`../assets/images/${user}.png`, import.meta.url).href;
// import.meta.url 表示当前的绝对路径 href是URL的一个属性，表示一个字符串。

export const useAllDataStore = defineStore('allData', () => {

    const state = ref(initState())
    return {
        state,
        getImage,
    }
})
