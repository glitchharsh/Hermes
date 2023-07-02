const useLogin = async (email, password) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email: email,
    password: password,
  });

  try {
    let response = await fetch(
      "https://harsh0p.pythonanywhere.com/auth/login/",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.text();
    console.log(data);
    return data?.access;
  } catch (error) {
    console.log(error);
  }
};

export default useLogin;
