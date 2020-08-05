export class Literal {
  private parameter: string;

  constructor(parameter:string) {
    this.parameter = parameter;
  }

  
  public get param() : string {
    return this.parameter;
  }
  
}

export function buildLiteralNode(parameter: string) {
  return new Literal(parameter);
}