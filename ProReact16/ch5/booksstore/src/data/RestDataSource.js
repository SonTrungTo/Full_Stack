import { RestUrls } from "./Urls";
import Axios from "axios";

export class RestDataSource {
    SendRequest = (method, url, params) => Axios.request({method, url, params});

    GetData = (dataType, params) =>
    this.SendRequest("get", RestUrls[dataType], params);
}