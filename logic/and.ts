import { Not } from "./not";
import { Literal } from "./literal";
import { Xor } from "./xor";
import { Or } from "./or";

export class And {
  private A: Literal | Not | And | Or | Xor;
  private B: Literal | Not | And | Or | Xor;
  constructor( A:Literal | Not | And | Or | Xor, B:Literal | Not | And | Or | Xor) {
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

export function buildAndNode(A: Literal | Not | And | Or | Xor, B: Literal | Not | And | Or | Xor) {
  return new And(A, B);
}