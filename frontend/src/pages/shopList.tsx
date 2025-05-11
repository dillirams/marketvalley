import { useRecoilValue } from "recoil";
import NavSecond from "../component/NavSecond";
import ShopCart from "../component/shopCart";
import { useContent } from "../hooks/useFetch";
import { items } from "../store/atom";
import { useNavigate } from "react-router-dom";


export function ShopList(){
    const navigate=useNavigate()
     const name=useRecoilValue(items);
     console.log(name)
    const content: { shopName: string; image: string; address:string,_id:string }[] = useContent('http://localhost:3000/user/shop',"shop");
    console.log(content)
    return <div className=" flex flex-col items-center   ">
            <div className="w-full m-4 flex">
                <NavSecond palceholder="search shop"/>
            </div>
             <div className="grid w-3/5 sm:grid-cols-2 md:grid-cols-3">
            {content.filter((shop)=>shop?.shopName.toLowerCase().includes(name.toLowerCase())).map((shop)=><ShopCart name={shop.shopName} onClick={()=>{
                navigate(`/viewitems/${shop._id}`)
            }} address={shop.address} image={`http://localhost:3000/images/${shop.image}`}/>)}
                </div>
    </div>
}