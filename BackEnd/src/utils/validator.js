const validatorLib = require("validator");
// req.body

const validate = (data)=> {
    const mandatoryField = ['firstname', 'emailId', 'password'];
    const IsAllowed = mandatoryField.every((k)=>Object.keys(data).includes(k));

    if(!IsAllowed){
        throw new Error("Some field Missing");
    }
    if(!validatorLib.isEmail(data.emailId)){
        throw new Error("Invalid Email");
    }
    if(!validatorLib.isStrongPassword(data.password)){
        throw new Error("Weak Password");
    }
}

module.exports = validate;
