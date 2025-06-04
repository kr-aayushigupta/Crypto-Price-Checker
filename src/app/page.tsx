

import React from "react";
import Searchbar from "@/app/Components/Searchbar";
import Display from "@/app/Components/Display";
import CryptoDisplay from "./Components/CryptDIsplay";

const App: React.FC = () => {
  

  return (
    <div className=" bg-[url('/bg2.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
     {/* <Display></Display>  */}

     <CryptoDisplay/>
     
    </div>
  );
};

export default App;
