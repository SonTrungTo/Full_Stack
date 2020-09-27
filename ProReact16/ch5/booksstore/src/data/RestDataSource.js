import { RestUrls } from "./Urls";
import Axios from "axios";

export class RestDataSource {
    constructor(err_handler) {
        this.error_handler = err_handler || (() => {});
    }

    SendRequest = (method, url, params, data) => 
    Axios.request({method, url, params, data});

    GetData = (dataType, params) =>
    this.SendRequest("get", RestUrls[dataType], params);

    StoreData = (dataType, data) =>
    this.SendRequest("post", RestUrls[dataType], {}, data);
}