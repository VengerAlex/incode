export interface IUserState{
    username?: string
    displayName?: string
    id?: number
    admin?: boolean,
    "accessToken": string,
    "refreshToken": string
}

export interface IUserInitialState {
    user: IUserState | null
    isLoading: boolean
    errorSignIn: string
    errorSignUp: string
}
