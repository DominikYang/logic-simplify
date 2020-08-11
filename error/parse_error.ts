import { repeat } from 'lodash';

interface ParseErrorData extends Error {
  found: string;
  expected: ParseErrorExpected[] | null;
  location: any;
}

interface ParseErrorExpected {
  description: string;
}

export class ParseError extends Error {
  shortMessage: string;
  returnMessage: string;

  constructor(error: ParseErrorData, expression: any) {
    let message = error.message;
    const fullMessage = [message, expression, repeat('-', error.location.start.offset) + '^'].join(
      '\n'
    );
    super(fullMessage);
    Object.setPrototypeOf(this, ParseError.prototype);
    this.name = 'ParseError';
    this.shortMessage = message;
    this.returnMessage = `Line ${error.location.start.line} , column ${error.location.start.column} : ${this.shortMessage}`;
  }
}