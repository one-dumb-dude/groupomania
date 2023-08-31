export interface userStore {
    user_id: number | null;
    username: string | null;
    loginStatus: 'idle' | 'loading' | 'success' | 'error';
    loginErrorMessage: string | null;
    signupSuccessMessage: string | null;
}
