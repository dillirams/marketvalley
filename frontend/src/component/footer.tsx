import { Email } from "./icon/email";
import { Instagaram } from "./icon/ig";
import { LocationIcon } from "./icon/location";
import { Phone } from "./icon/phone";
import { Twitter } from "./icon/twitter";


export function Footer(){
    return <div className="w-full  bg-orange-400 grid md:grid-cols-2  ">
        <div className="flex flex-col gap-1 justify-center items-center">
            <div className="flex gap-1 items-center">
                <LocationIcon/>
                <p className="text-lg font-base text-white">91 Kurukshetra <br/> Harayna, India</p>
            </div>
            <div className="flex gap-1 items-center">
                <Phone/>
                <p className="text-lg font-base text-white">8950584512 <br/> 7015544534</p>
            </div>
            <div className="flex gap-1 items-center">
                <Email/>
                <p className="text-lg font-base text-white hover:text-blue-500">marketvalley@gmail.com</p>
            </div>
        </div>
         <div className="flex flex-col gap-1 justify-center items-center">
            <div className="flex gap-1 items-center">
               
                <p className="text-lg font-base text-white">MarketValley</p>
            </div>
            <div className="flex gap-1 items-center">
                
                <p className="text-lg font-base text-white">a platform where the shopping is simplified and saves time.</p>
            </div>
            <div className="flex gap-1 items-center">
                <Instagaram/>
                <Twitter/>
                
            </div>
        </div>
    </div>
}