import { RestUrls } from "./Urls";
import Axios from "axios";

export class RestDataSource {
    SendRequest = (method, url) => Axios.request({method, url});

    GetData = (dataType) => this.SendRequest("get", RestUrls[dataType]);
}