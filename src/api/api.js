import { mock } from "mockjs";
import request from "./request";

//请求首页左侧的数据
export default {
    getTableData() {
        return request({
            url: "/home/getTable",
            method: "get",
        })
    }
}