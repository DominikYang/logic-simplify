
// Initialization block
{
  const {buildAndNode,buildOrNode,buildNotNode,buildLiteralNode} = options
}

start = OrExpression

OrExpression 
  = left: AndExpression Or right: OrExpression{
    return buildOrNode(left,right);
  }
  / AndExpression

AndExpression
 = left : NotExpression And right: AndExpression{
   return buildAndNode(left,right);
 }
  / NotExpression

NotExpression
 = Not expression:SubExpression{
   return buildNotNode(expression);
 } / SubExpression

//list
SubExpression 
  = '(' Space* expression:OrExpression Space*')'{
    return expression;
  }
  / ValueExpression

ValueExpression
  =  value:Literal{
    return buildLiteralNode(value);
  }

Literal "literal"
  = QuotedString / UnquotedLiteral


ListOfValues
  = '(' Space* partial:OrListOfValues trailing:OptionalSpace ')' {
    return '(' + partial +')';
  }
    / Value

OrListOfValues
  = partialLeft:AndListOfValues Or partialRight:OrListOfValues {
    return partialLeft + ' or ' + partialRight;
  }
  / AndListOfValues
  
AndListOfValues
  = partialLeft:NotListOfValues And partialRight:AndListOfValues {
    return partialLeft + ' and ' + partialRight;
  }
  / NotListOfValues

NotListOfValues
  = Not partial:ListOfValues {
    return 'not ' + partial;
  }
  / ListOfValues

Value "value"
  = value:QuotedString {
    return value;
  }
  / value:UnquotedLiteral {
    return value;
  }

QuotedString
  = '"' chars:QuotedCharacter* '"' {
    return "\"" + chars.join('') + "\"";
  }

QuotedCharacter
  = EscapedWhitespace
  / '\\' char:[\\"] { return char; }
  / char:[^"] { return char; }

UnquotedLiteral
  = chars:UnquotedCharacter+ {
    return chars.join('').trim();
  }

UnquotedCharacter
  = EscapedWhitespace
  / EscapedSpecialCharacter
  / EscapedKeyword
  / !SpecialCharacter !Keyword  char:. { return char; }

Or "OR"
  = Space+ 'or'i Space+
  
And "AND"
  = Space+ 'and'i Space+
  
Not "NOT"
  = 'not'i Space+

Space "whitespace"
  = [\ \t\r\n]

EscapedWhitespace
  = '\\t' { return '\t'; }
  / '\\r' { return '\r'; }
  / '\\n' { return '\n'; }

EscapedSpecialCharacter
  = '\\' char:SpecialCharacter { return char; }
  
SpecialCharacter
  = [\\():<>"{}]

EscapedKeyword
  = '\\' keyword:('or'i / 'and'i / 'not'i) { return keyword; }

Keyword
  = Or / And / Not
  
 OptionalSpace
  =  Space*