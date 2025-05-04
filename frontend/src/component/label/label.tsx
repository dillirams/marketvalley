
interface LabelProps{
    text:String
}

export function Label(props:LabelProps){
    return <div className="pl-2">
        <label className="text-lg font-semibold" htmlFor="">{props.text}</label>  
    </div> 
}