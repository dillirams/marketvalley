import axios from "axios";
import  Button  from "../Button";
import { Input } from "../inputs/inputs";
import { SubmitHandler, useForm} from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom";



type FormInputs={
    name:string,
    email:string,
    password:string
}

export function Signin(){
   const navigate=useNavigate()
    
    const {register, 
        handleSubmit,
        formState:{errors}}=useForm<FormInputs>()
    
    const inputSubmit:SubmitHandler<FormInputs>=async({name, email, password})=>{
        console.log(name)
        try{
            const response=await axios.post("http://localhost:3000/user/signin",{
                username:name,
                email,
                password
            })
            const jwt=response.data.token;
            localStorage.setItem("token",jwt)
            navigate('/dashboard')
           
        }catch(e){
            console.log(e)
        }
        
    }

    return <div className="bg-gray-400 h-screen w-screen flex justify-center items-center ">
        <form onSubmit={handleSubmit(inputSubmit)} className="bg-white h-96 flex flex-col w-96 rounded-xl p-4">
            <div className="w-full py-2 font-bold flex justify-center self-start ">Sign In</div>
            <div className="">

                <div>
                    <Input type="text " placeholder="name" register={register} name="name" error={errors.name?.message}/>
                     <Input type="email" placeholder="email" register={register} name="email" error={errors.email?.message}/>
                     <Input type="password" placeholder="password" register={register} name="password"error={errors.password?.message}/>
                </div>
                <div className="">
                    <Button title="sign in" variant="primary" size="special" />
                  
                </div>

            </div>
           
        </form>

    </div>
}

