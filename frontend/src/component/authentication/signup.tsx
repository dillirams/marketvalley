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

export function Signup(){
   const navigate=useNavigate()
    
    const {register, 
        handleSubmit,
        formState:{errors}}=useForm<FormInputs>()
    
    const inputSubmit:SubmitHandler<FormInputs>=async({name, email, password})=>{
        console.log(name)
        try{
            const response=await axios.post("http://localhost:3000/user/signup",{
                username:name,
                email,
                password
            })
            navigate('/signin')
           
        }catch(e){
            console.log(e)
        }
        
    }

    return <div className="bg-gray-400 h-screen w-screen flex justify-center items-center ">
        <form onSubmit={handleSubmit(inputSubmit)} className="bg-white h-96 flex flex-col w-96 rounded-xl p-4">
            <div className="w-full py-2 font-bold flex justify-center self-start ">Sign Up</div>
            <div className="">

                <div>
                    <Input type="text " placeholder="name" register={register} name="name" error={errors.name?.message}/>
                     <Input type="email" placeholder="email" register={register} name="email" error={errors.email?.message}/>
                     <Input type="password" placeholder="password" register={register} name="password"error={errors.password?.message}/>
                </div>
                <div className="">
                    <Button title="create account" variant="primary" size="special" />
                    <div className="pt-4 flex justify-center">
                        <p>Already have account? <NavLink to={'/signin'}><span className="text-purple-700">sign in </span></NavLink></p>
                    </div>
                </div>

            </div>
           
        </form>

    </div>
}

