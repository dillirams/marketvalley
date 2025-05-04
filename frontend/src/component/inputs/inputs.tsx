interface InputProps{
    name?:string,
    register?:any
    placeholder:string,
    type:string,
    error?:string
    
}

const defaultStyle='px-3 py-2 shadow-xl rounded-xl w-full  '

 export function Input(props:InputProps){
return <div className="my-2">
    <input {...props.register(props.name,{required:`${props.name} is required`,
    ...(props.name==='name'&&({minLength:{value:5,message:"min length is 5 "},
    maxLength:{value:10,message:"max length is 10"}})),
    ...(props.name==='password'&& ({minLength:{value:4,message:"password must be at least 4 character"}}))
    })}  type={props.type} placeholder={props.placeholder} className={`${defaultStyle}`} />
    {props.error&&(<p className="text-red-500 text-sm mt-1 ml-1">{props.error}</p>)}
</div>
 }