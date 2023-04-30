let profileForm = document.getElementById("profile-form");
let countrySelection = document.getElementById("select_country");
let stateSelection = document.getElementById("select_state");
let citySelection = document.getElementById("select_city");
let profileImage = document.getElementById("profile_image");

if (localStorage.getItem("email") != null) {
    document.getElementById("email").innerHTML = localStorage.getItem("email");
}

if(localStorage.getItem("firstname") != null){
    document.getElementById("first_name").value = localStorage.getItem("firstname");
}


if(localStorage.getItem("lastname") != null){
    document.getElementById("last_name").value = localStorage.getItem("lastname");
}

if(localStorage.getItem("country") != null){
    document.getElementById("default_country").innerText = localStorage.getItem("country")
}

if(localStorage.getItem("state") != null){
    document.getElementById("default_state").innerText = localStorage.getItem("state")
}

if(localStorage.getItem("city") != null){
    document.getElementById("default_city").innerText = localStorage.getItem("city")
}

if(localStorage.getItem("profile_image") != null){
    profileImage.src = localStorage.getItem("profile_image");
}

countrySelection.addEventListener("click",(e)=>{
    let country = countrySelection.value;
    e.preventDefault();

    fetch("http://localhost:3002/getGeo", {
        method: "POST",
        body: JSON.stringify({
            country,
            state:"",
            city:""
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then((res)=>res.json()).then((res)=>{
        if(res.status=="Success"){
            res.data.forEach((itm,idx)=>{
                let _option = document.createElement("option");
                _option.text = itm.name;
                _option.value = itm.id;
                countrySelection.appendChild(_option);
            })
        }else{
            console.log("err",res);
        }
    }).catch(err=>{
        console.log("err",err);
    });
})

stateSelection.addEventListener("click",(e)=>{
    let country = countrySelection.value;
    e.preventDefault();

    fetch("http://localhost:3002/getGeo", {
        method: "POST",
        body: JSON.stringify({
            country,
            state:"",
            city:""
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then((res)=>res.json()).then((res)=>{
        if(res.status=="Success"){
            console.log("Res",res);
            res.data.forEach((itm,idx)=>{
                let _option = document.createElement("option");
                _option.text = itm.name;
                _option.value = itm.id;
                stateSelection.appendChild(_option);
            })
        }else{
            console.log("err",res);
        }
    }).catch(err=>{
        console.log("err",err);
    });
})

citySelection.addEventListener("click",(e)=>{
    let country = countrySelection.value;
    let state = stateSelection.value;
    e.preventDefault();

    fetch("http://localhost:3002/getGeo", {
        method: "POST",
        body: JSON.stringify({
            country,
            state,
            city:""
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then((res)=>res.json()).then((res)=>{
        if(res.status=="Success"){
            console.log("Res",res);
            res.data.forEach((itm,idx)=>{
                let _option = document.createElement("option");
                _option.text = itm.name;
                _option.value = itm.id;
                citySelection.appendChild(_option);
            })
        }else{
            console.log("err",res);
        }
    }).catch(err=>{
        console.log("err",err);
    });
})


profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstName = profileForm.first_name.value;
    let lastName = profileForm.last_name.value;
    let image = profileForm.image.files[0];
    let country = profileForm.country.value;
    let state = profileForm.state.value;
    let city = profileForm.city.value;

    let image_encoding = null;

    getBase64(image).then(
        data => {
            image_encoding = data;
            profileImage.src = data;


            const req_obj = {
                country,
                state,
                city,
                firstName,
                lastName,
                image:image_encoding,
            }
        
            fetch("http://localhost:3002/editProfile", {
                method: "POST",
                credentials: "same-origin",
                body: JSON.stringify({
                  ...req_obj
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                }
            }).then((res)=>res.json()).then((res)=>{
                if(res.status=="Success"){
                    console.log("Res",res);
                }else{
                    console.log("err",res);
                }
            }).catch(err=>{
                console.log("err",err);
            });
        }
    )


    
    

  });

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

function handleLogout(){
    localStorage.clear();
    location.replace("http://localhost:3002/")
}