import { Raleway } from "next/font/google";
import React, { useState } from 'react';
import { read, utils } from 'xlsx';


const raleway = Raleway({
    weight: ["400", "500", "800"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

export default function Button() {
    const [data , setData] = useState([]);

    const handleImport = ($event: any) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target?.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows:any = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setData(rows);
                    console.log(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    return (
    <div className="border-black border-2 flex flex-col mt-28 py-3 px-4 gap-y-3">
        <p className={`${raleway.className} font-medium text-base`}>
          Upload Contact Numbers
        </p>
        <div className="mx-auto">

          <input type="file" name="file" hidden className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>             
           
           <label className={`${raleway.className} bg-[#5A4AE3] text-white uppercase rounded-[30px] py-2 px-[51px] font-extrabold`} htmlFor="inputGroupFile">UPLOAD</label>

        </div>
        <div className="w-[150px]">
          <p className={`${raleway.className} font-bold text-base italic`}>
            Supported Formats excel, csv
          </p>
        </div>
      </div>
    );
}