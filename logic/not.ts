import { And } from "./and";
import { Or } from "./or";
import { Literal } from "./literal";

export class Not {
  private parameter: And | Or | Not | Literal;

  constructor(parameter: And | Or | Not | Literal) {
    this.parameter = parameter;
  }


  public get param(): And | Or | Not | Literal {
    return this.parameter
  }


}

export function buildNotNode(parameter: And | Or | Not | Literal) {
  return new Not(parameter);
}