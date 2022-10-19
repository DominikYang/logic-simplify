import { toCNF, toDNF } from "..";
import { parseString } from "../functions/utils";


let ss =  "not ( filter0 and ( not filter1 or filter2))"
// let ss = "not (filter1 and not (filter2 or (filter3 and not (filter4 and filter5) and not filter6 or filter7 or filter8 and filter9 or not filter10 and filter11 and not filter12 or (filter13 and filter14))))"
// let ss = "a or b or c or d or e or f or g or h or i or j or k or l or m or n"
console.time('test')
let simplifiedString = parseString(ss);
console.log(simplifiedString);
// let simplifiedString = toCNF(ss)
console.timeEnd('test')



console.time('total')
simplifiedString = toCNF(ss)
console.log(simplifiedString);
console.timeEnd('total')
// let arr = simplifiedString.split(' ')
// let result = []
// for (let index = 0; index < arr.length; index++) {
//     const literal = arr[index];
//     if (literal == 'not' && index < arr.length - 1 && arr[index + 1].startsWith('filter')) result.push(arr[index + 1]) 
// }


// console.log(result);
