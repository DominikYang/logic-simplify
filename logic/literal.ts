export class Literal {
  private parameter: string;

  constructor(parameter:string) {
    this.parameter = parameter;
  }
}

export function buildLiteralNode(parameter: string) {
  return new Literal(parameter);
}