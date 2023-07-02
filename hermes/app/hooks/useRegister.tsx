const url = "https://harsh0p.pythonanywhere.com/auth/register/";

const useRegister = async (name:string, phoneNumber:any, email:string, age:any, gender:any, password:string) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
    phone_number: phoneNumber,
    email: email,
    password: password,
    age: age,
    gender: gender,
  });

  try {
    let response = await fetch(
      "https://harsh0p.pythonanywhere.com/auth/register/",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

export default useRegister;
