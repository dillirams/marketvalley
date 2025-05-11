
interface StaticInputProps{
    reference?:any,
    Onchange:()=>void,
    placeholder:string
}

export function StaticInput(props:StaticInputProps){
    return   <input
          type="text"
          ref={props.reference}
          onChange={props.Onchange}
          className="px-3 py-2 w-50 sm:w-100 flex items-center rounded-xl border-1"
          placeholder={props.placeholder}
        />
}