export class Exception {
    constructor(name, message) {
        this.message = message;
        this.name = name;
    }
}

export class ResultValidation {

    constructor(success, error){
        this._success = success;
        this._error = error;
    }

    get success(){
        return this._success;
    }

    get error(){
        return this._error;
    }

    set success(success){
        this._success = success;
    }

    set error(error){
        this._error = error;
    }

}

const ERROR_USERNAME_TAG = "EXCEPTION_INVALID_USERNAME";

export function ValidateEmail(email){
    if(email===""){
        throw new Exception("ExceptionEmptyEmail","Empty email");
    }
    else if (!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email))){
        throw new Exception("ExceptionInvalidEmail","Invalid email");
    }
    return true;
}

export function ValidatePassword(password){
    if(password===""){
        throw new Exception("ExceptionEmptyPassword","Empty password");
    }
    let re = /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))(?=.{6,})/u;
    if(!(re.test(password))){
        throw new Exception("ExceptionInvalidPassword", "Invalid password");
    }
    return true;
}

export function ValidateUsername(username){
    if(username===""){
        return new ResultValidation(false, new Exception(ERROR_USERNAME_TAG, "Empty username"));
    }else{
        let re = /^[a-zA-Z0-9]{3,}$/u;
        if(!re.test(username)){
            return new ResultValidation(false, new Exception(ERROR_USERNAME_TAG, "Invalid username"));
        }
    }
    return new ResultValidation(true, null);
}

export function ValidateInternationalNames(name){
    let re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    return re.test(name);
}

export function ValidateAlphabeticWords(word){
    let re = /^[a-zA-Z-]{2,}$/u;
    return re.test(word);
}