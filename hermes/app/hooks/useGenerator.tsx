const url = "https://harsh0p.pythonanywhere.com/recommendation/";

interface IGenerator {
  prompt: string;
  maxChars: number;
  tone: string;
  formality: number;
  the_type: string; // SMS or Email
  token: any;
}

const useGenerator = async (props: IGenerator) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${props.token}`,
  };

  const the_promt: string =
    `You are a ${props.the_type} text generator, convert this string to a ${props.the_type}, as per given constraints` +
    `, "${props.prompt}." ` +
    `The constaints are, "${props.formality}% Formal", "${props.maxChars} Character limit", "Tone ${props.tone}", "Type ${props.the_type}".`;

  const url_type = props.the_type === "sms" ? "sms" : "email";

  console.log(the_promt);
  let bodyContent = JSON.stringify({
    prompt: the_promt,
    maxTokens: 2048 - the_promt.length - 1,
  });

  try {
    let response = await fetch(url + url_type + "/", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data: string;
    data = await response.json();
    // @ts-ignore
    console.log(data.data.trim());
    // @ts-ignore
    return data.data ? data.data.trim() : data;
  } catch (error) {
    console.log("Error in useGen", error);
  }
};

export default useGenerator;
