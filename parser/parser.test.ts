import { parse } from "./parser";
import { buildAndNode } from "../logic/and";
import { buildOrNode } from "../logic/or";
import { buildNotNode } from "../logic/not";
import { buildLiteralNode } from "../logic/literal";

//todo 字符匹配完善，目前只支持纯大写字母匹配，不支持带引号的字符解析
let test = 'not (A and (B or C))';
console.log(parse(test, {buildAndNode,buildOrNode,buildNotNode,buildLiteralNode}));