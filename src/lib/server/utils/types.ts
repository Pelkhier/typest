export type UserToken = {
    name: string;
    email: string;
    id: number;
    textSize: string;
    keyboardSound: boolean;
    keyboardShow: boolean;
};

export type UserSigninInfo = {
    name: string;
    email: string;
    password: string;
};

export type UserLoginInfo = {
    email: string;
    password: string;
};
