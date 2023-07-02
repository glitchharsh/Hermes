const url = "https://harsh0p.pythonanywhere.com/auth/register/";

const useRegister = async (name, phoneNumber, email, age, gender, password) => {
  let headersList = {
    Accept: "*/*",
    // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMDYzMjQ3LCJpYXQiOjE2ODEwNTk2NDcsImp0aSI6IjJjOWEyODAzZDc3NTQ1NTI5N2E1ZWM5ZWY5ODQyMTc0IiwidXNlcl9pZCI6NSwibmFtZSI6Inh5eiJ9.sB_JIkky7MuHkSEUSKWfTrnI0AffElRq76JqOeOsV-s",
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
};

export default useRegister;
