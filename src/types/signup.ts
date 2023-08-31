export type Signup = {
    username: string | null;
    usernameMinLength: number;
    usernameMaxLength: number;
    usernameRegExp: string;
    usernameErrorMessage: string | null;
    password: string | null;
    passwordMinLength: number;
    passwordMaxLength: number;
    passwordErrorMessage: string | null;
    confirmPassword: string | null;
    signupErrorMessage: string | null;
    validityValid: boolean;
}
