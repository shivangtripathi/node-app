const getOtpButton = document.getElementById("get_otp");

const submitButton = document.getElementById("submitButton");

getOtpButton.addEventListener("click",(e)=>{
    e.preventDefault();
    let email = document.getElementById("uname");
    console.log("Email",email.value);
    if(!validateEmail(email.value)){
        document.getElementById("validation").classList.remove("d-none");
    }else{
       // email.attributes.add("disabled");
       _getOtp(email.value);
       email.disabled = true;
       getOtpButton.disabled = true;
    }
})

submitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    let _email = document.getElementById("uname").value;
    let otp = document.getElementById("otp").value;
    if(!(otp==="" && _email==="")){
        validateOtp(_email,otp);
    }

    
})


function _getOtp(email){
    fetch("http://localhost:3002/getotp", {
        method: "POST",
        body: JSON.stringify({
            email: email
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then((res)=>res.json()).then((res)=>{
        if(res.status=="Success"){
            console.log("Pleas use OTP", res.otp," to proceed. Valid only for 60 seconds");
        }
    });

}


function validateEmail(inputText) {
    var mailFormat =  /\S+@\S+\.\S+/;
    if (inputText.match(mailFormat)) {
      return true;
    } else {
      return false;
    }
  }
  

function validateOtp(email,otp){
    fetch("http://localhost:3002/verifyotp", {
        method: "POST",
        body: JSON.stringify({
            email,
            otp
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then((res)=>res.json()).then((res)=>{
        if(res.status=="Success"){
            if(res.user){
                const {firstname,lastname,country,state,city,profileImage} = res.user;
                if(email){
                    localStorage.setItem("email",email);
                }
                if(firstname){
                    localStorage.setItem("firstname",firstname);
                }
                if(lastname){
                    localStorage.setItem("lastname",lastname);
                }
                if(country){
                    localStorage.setItem("country",country);
                }
                if(state){
                    localStorage.setItem("state",state);
                }
                if(city){
                    localStorage.setItem("city",city);
                }
                if(profileImage){
                    localStorage.setItem("profile_image",profileImage)
                }
            }
            location.replace("http://localhost:3002/editProfile")
        }
    });
}
