"use client"

import React, { useState } from 'react'

interface weatherdatatype{

    locations:{
        name:string;
        region:string;
        country:string;
    };
    current:{
        temp_c:number;
        condition:{
            text:string;
            icon:string;
        };
        feelslike_c:number;
        heatindex_c:number;
        wind_kph:number;
        humidity:number;

    }


}

function Practice() {

    const [data,setdata]=useState<weatherdatatype | null>(null);

    const [loading,setloading]=useState(false);
    const [error,seterror]=useState<String | null>(null);

    const handleweather=async(city:string)=>{
        const API_KEY = "f99b1408528f4863af494641250406"; // 🔁 Replace with your key
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;
        
        try{
            setloading(true);
            seterror(null);

            const res=await fetch(url);
            if (!res.ok){
                throw new Error("City Not Found");

            }
            const mydata=await res.json();
            setdata(mydata);


        }catch(e:any){
            seterror(e.message);
            setdata(null)

        }finally{
            setloading(false);
        }
    }





  return (
    <div>

        {loading && <p>...Loading</p>}
        {error && <p>Some Error occurred : {error}</p>}

        {data && (
            <div >

                
            
            
            
            
            
            
            
             </div>
            )}

    </div>
  )
}

export default Practice