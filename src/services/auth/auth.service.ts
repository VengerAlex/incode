import axios, {getAuthUrl} from "../../api";
import localstorageService from "../localstorage/localstorage.service";
import {IRegisterResponse, ITokens} from "../../redux/reducers/user/user.interface";

class AuthService {
    async login(username: string, password: string) {
        const response = await axios.post<ITokens>(
            getAuthUrl("login"),
            {username, password}
        )

        if (response.data.accessToken){
            localstorageService.set("accessToken", response.data.accessToken);
        }

        return response
    }

    async register(username: string, password: string, displayName: string) {
        const response = await axios.post<IRegisterResponse>(
            getAuthUrl("register"),
            {username, password, displayName}
        )

        return response
    }

    async logout() {
        const response = await axios.get(getAuthUrl("logout"))

        localstorageService?.remove("accessToken")

        return response
    }
}

export default new AuthService();