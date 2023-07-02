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

    if (response.status === 200) {
      let data = await response.json();
      return data;
    } else {
      throw new Error("Failed to login");
    }
  } catch (error) {
    console.log(error);
  }
};

export default useLogin;
