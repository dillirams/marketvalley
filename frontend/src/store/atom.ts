import {atom} from "recoil";

const items= atom({
    key:"items",
    default:""
})
export const viewitematom= atom({
    key:"viewitematom",
    default:""
})
// interface locationtype{
//     latitude:number,
//     longitude:number,
// }
export const locationatom=atom({
    key:"locationatom",
    default:{latitude:0,longitude:0}
})
export {items}