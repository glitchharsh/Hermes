const getName = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(
    "https://harsh0p.pythonanywhere.com/auth/retrieve/",
    {
      method: "POST",
      headers: headersList,
    }
  );

  let data = await response.json();
  console.log(data);
  return data;
};

export default getName;
