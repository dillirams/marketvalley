import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "./label/label";
import { Input } from "./inputs/inputs";
import Button from "./Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type FormInputs={
    file:FileList,
    productName:string,
    price:number,
    description:string,
   
   
}

export function AddItems(){
    const {id}=useParams();
    const navigate=useNavigate();
    const {register,
             handleSubmit} =useForm<FormInputs>();

  const submitInput: SubmitHandler<FormInputs> = async (data) => {
            const formData = new FormData();
            formData.append("file", data.file[0]); // FileList to File
            formData.append("name", data.productName);
            formData.append("description", data.description);
            formData.append("price", data?.price);
        
            const response = await axios.post(`http://localhost:3000/user/additems/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": localStorage.getItem("token") ,
                },
            });
        
            navigate(`/viewitems/${id}`);
        };


    return  <div className="bg-blue-300 h-screen w-screen flex justify-center items-center">
        <form onSubmit={handleSubmit(submitInput)}   className=" w-96 bg-white rounded-xl p-2">
            <div className="w-full flex justify-center text-2xl font-bold">Add Items</div>
            <div className="mt-5">
                <Label text={"Upload Photo"}/>
                 <Input register={register} placeholder="Upload file" type="file" name="file"/>
                 <Label text={"product Name :"}/>
                 <Input register={register} placeholder="Enter product name" type="text" name="productName"/>
                 <Label text={"Description"}/>
                 <Input register={register} placeholder="Description" type="text" name="description"/>
                 
                 <Label text={"Price"}/>
                 <Input register={register} placeholder="Enter Price" type="number" name="price"/>
                 
               
            </div>
            <div>
                <Button variant="primary" title="Add Items "  size="special" />
            </div>
         
        </form>
        </div>
}