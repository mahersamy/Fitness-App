import {environment} from "@fitness-app/environment/baseUrl.dev";

export class EndPoint {
    static SIGNUP = `${environment.baseApiUrl}auth/signup`;
    static SIGNIN = `${environment.baseApiUrl}auth/signin`;
    static CHANGE_PASSWORD = `${environment.baseApiUrl}auth/change-password`;
    static UPLOAD_PROFILE_PHOTO = `${environment.baseApiUrl}auth/upload-photo`;
    static PROFILE_DATA = `${environment.baseApiUrl}auth/profile-data`;
    static LOGOUT = `${environment.baseApiUrl}auth/logout`;
    static FORGET_PASSWORD = `${environment.baseApiUrl}auth/forgotPassword`;
    static VERIFY_RESET = `${environment.baseApiUrl}auth/verifyResetCode`;
    static RESET_PASSWORD = `${environment.baseApiUrl}auth/resetPassword`;
    static DELETE_ACCOUNT = `${environment.baseApiUrl}auth/deleteMe`;
    static EDIT_PROFILE = `${environment.baseApiUrl}auth/editProfile`;
    static LEVELS = `${environment.baseApiUrl}levels`;
    static LEVELS_BY_MUSCLE = `${environment.baseApiUrl}levels/difficulty-levels/by-prime-mover`;
    static MUSCLES = `${environment.baseApiUrl}muscles`;
    static EXERCISES = `${environment.baseApiUrl}exercises`;
    static EXERCISES_BY_MUSCLE_DIFFICULTY = `${environment.baseApiUrl}exercises/by-muscle-difficulty`;
    static MEALS_BY_CATEGORY = `${environment.mealApiUrl}filter.php`;
}
