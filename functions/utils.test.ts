import { fullPerm, getTruthValue, getTruthTable } from "./utils";
import { Literal } from "../logic/literal";
import { And } from "../logic/and";
import { Or } from "../logic/or";


let map = new Map<string, boolean>();
map.set('A', true);
map.set('B', true);

//console.log(getTruthValue(new And(new Literal('A'),new Literal('B')),map));
console.log(getTruthTable(['A','B','C'],new And(new Literal('A'),new Or(new Literal('B'),new Literal('C')))));
