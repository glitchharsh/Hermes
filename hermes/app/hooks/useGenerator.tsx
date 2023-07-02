const url = "https://harsh0p.pythonanywhere.com/recommendation/";

interface IGenerator {
    prompt: string;
    maxChars: number;
    tone: string;
    formality: number;
    the_type: string; // SMS or Email
}


const useGenerator = async (props: IGenerator) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
     "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5MTY2Mzg1LCJpYXQiOjE2ODgzMDIzODUsImp0aSI6IjQ1OGU0NWVhOTdjMzRmZjI5MGU4MmIzMGY5ZDYxOGI5IiwidXNlcl9pZCI6NywibmFtZSI6IkhvbmV5IFNpbmdoIn0.9Me09HaSAFO2J401xDQJzzNPyY5PqH04vuzPogb7iW4'

  };

  const the_promt:string = `You are a ${props.the_type} text generator, convert this string to a ${props.the_type}, as per given constraints`
  + `, "${props.prompt}." `
  +`The constaints are, "${props.formality}% Formal", "${props.maxChars} Character limit", "Tone ${props.tone}", "Type ${props.the_type}".`

  const url_type = props.the_type === "sms" ? "sms" : "email";

  console.log(the_promt);
  let bodyContent = JSON.stringify({
    prompt: the_promt,
    maxTokens: 2048 - the_promt.length - 1,
  });

  try {
    let response = await fetch(
    url + url_type + "/",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
    let data:string;
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
