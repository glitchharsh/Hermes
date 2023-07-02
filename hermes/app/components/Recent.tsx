import React from 'react';
import { Raleway } from "next/font/google";
const raleway = Raleway({
    weight: ["400", "500", "700", "800"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
  });
const url = "https://harsh0p.pythonanywhere.com/recommendation/";
const Recent = ({type}:any) => {
    const [data, setData] = React.useState({
        saved_sms: [],
        saved_email: [],
    });

    React.useEffect(() => {
        fetch(url,{
            method: "POST",
            headers: {
                "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5MTY2Mzg1LCJpYXQiOjE2ODgzMDIzODUsImp0aSI6IjQ1OGU0NWVhOTdjMzRmZjI5MGU4MmIzMGY5ZDYxOGI5IiwidXNlcl9pZCI6NywibmFtZSI6IkhvbmV5IFNpbmdoIn0.9Me09HaSAFO2J401xDQJzzNPyY5PqH04vuzPogb7iW4'
            },
        })
        .then((res) => res.json())
        // reverse the array to show the latest first
        .then((data) => {data.saved_email.reverse();data.saved_sms.reverse(); setData(data)} )  
    }, [type]);

    console.log(data)
    console.log(type)

    return(
        <div className="flex flex-col gap-y-9">
        <p
          className={`${raleway.className} font-bold text-center mt-16 text-xl`}
        >
          Recent Generations #
        </p>
        <div className='max-h-[45vh] overflow-scroll oveflow-x-hidden'>
            {/* @ts-ignore */}
            {
                type === "sms"
            ?  data.saved_sms.length !== 0 && data.saved_sms.map((item,index) => {
                return (
                    <div key={index} className="mx-8 border-2 h-[120px] bg-white overflow-hidden mb-2">
                        {/* @ts-ignore */}
                    <p className="text-sm p-4 overflow-hidden">{item }</p>
                    </div>
                );
            }
            )
            :
            data.saved_email.length !== 0 && data.saved_email.map((item,index) => {
                return (
                    <div key={index} className="mx-8 border-2 h-[120px] bg-white overflow-hidden mb-2">
                        {/* @ts-ignore */}
                    <p className="text-sm p-4 overflow-hidden">{item }</p>
                    </div>
                );
            }
            )}
        </div>

            
      </div>
    )
}

export default Recent;