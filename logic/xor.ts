import { Literal } from "./literal";
import { Not } from "./not";
import { And } from "./and";
import { Or } from "./or";

export class Xor {
  private A: Literal | Not | And | Or | Xor;
  private B: Literal | Not | And | Or | Xor;
  constructor(A:Literal | Not | And | Or | Xor,B:Literal | Not | And | Or | Xor) {
    this.A = A;
    this.B = B;
  }

  public get paramA() : Literal | Not | And | Or | Xor {
    return this.A;
  }

  
  public get paramB() : Literal | Not | And | Or | Xor {
    return this.B;
  }
}

export function buildXorNode(A: Literal | Not | And | Or | Xor, B: Literal | Not | And | Or | Xor) {
  return new Xor(A, B);
}