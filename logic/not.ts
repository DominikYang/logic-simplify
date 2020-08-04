import { And } from "./and";
import { Or } from "./or";

export class Not {
  private parameter: Symbol | And | Or | Not;
  constructor(parameter:Symbol | And | Or | Not) {
    this.parameter = parameter;
  }
}

export function buildNotNode(parameter: Symbol | And | Or | Not) {
  return new Not(parameter);
}