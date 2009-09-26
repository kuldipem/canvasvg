/*****
*
*   The contents of this file were written by Kevin Lindsey
*   copyright 2002-2003 Kevin Lindsey
*
*   This file was compacted by jscompact
*   A Perl utility written by Kevin Lindsey (kevin@kevlindev.com)
*
*****/

Svg.VERSION=1.0;
Svg.NAMESPACE="http://www.w3.org/2000/svg";
function Svg(){}
TransformParser.PARAMCOUNT={matrix:[6],translate:[1,2],scale:[1,2],rotate:[1,3],skewX:[1],skewY:[1]};
TransformParser.METHODNAME={matrix:"matrix",translate:"translate",scale:"scale",rotate:"rotate",skewX:"skewX",skewY:"skewY"}
function TransformParser(){this._lexer=new TransformLexer();this._handler=null;}
TransformParser.prototype.parseTransform=function(transformText){if(typeof(transformText)!="string")throw new Error("TransformParser.parseTransform: The first parameter must be a string");if(this._handler!=null&&this._handler.beginParse!=null)this._handler.beginParse();var lexer=this._lexer;lexer.setTransformText(transformText);var token=lexer.getNextToken();while(token.typeis(TransformToken.EOD)==false){var command;var param_counts;var params=new Array();switch(token.type){case TransformToken.MATRIX:case TransformToken.TRANSLATE:case TransformToken.SCALE:case TransformToken.ROTATE:case TransformToken.SKEWX:case TransformToken.SKEWY:command=token.text;param_counts=TransformParser.PARAMCOUNT[command];token=lexer.getNextToken();break;default:throw new Error("TransformParser.parseTransform: expected transform type: "+token.text);}if(token.type!=TransformToken.LPAREN){throw new Error("TransformParser.parserTransform: expected opening parenthesis: "+token.text);}token=lexer.getNextToken();while(token!=TransformToken.EOD&&token.type==TransformToken.NUMBER){params.push(token.text-0);token=lexer.getNextToken();}var valid=false;var actual_count=params.length;for(var i=0;i<param_counts.length;i++){if(param_counts[i]==actual_count){valid=true;break;}}if(valid==false){throw new Error("TransformParser.parserTransform: incorrect number of arguments for "+command);}if(token.type!=TransformToken.RPAREN){throw new Error("TransformParser.parserTransform: expected closing parenthesis: "+token.text);}token=lexer.getNextToken();if(this._handler!=null){var handler=this._handler;var method=TransformParser.METHODNAME[command];if(handler[method]!=null)handler[method].apply(handler,params);}}};
TransformParser.prototype.setHandler=function(handler){this._handler=handler;};
TransformLexer.VERSION=1.0;
function TransformLexer(transformText){if(transformText==null)transformText="";this.setTransformText(transformText);}
TransformLexer.prototype.setTransformText=function(transformText){if(typeof(transformText)!="string")throw new Error("TransformLexer.setTransformText: The first parameter must be a string");this._transformText=transformText;};
TransformLexer.prototype.getNextToken=function(){var result=null;var buffer=this._transformText;while(result==null){if(buffer==null||buffer==""){result=new TransformToken(TransformToken.EOD,"");}else if(buffer.match(/^([ \t\r\n,]+)/)){buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(matrix)\b/)){result=new TransformToken(TransformToken.MATRIX,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(translate)\b/)){result=new TransformToken(TransformToken.TRANSLATE,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(scale)\b/)){result=new TransformToken(TransformToken.SCALE,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(rotate)\b/)){result=new TransformToken(TransformToken.ROTATE,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(skewX)\b/)){result=new TransformToken(TransformToken.SKEWX,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(skewY)\b/)){result=new TransformToken(TransformToken.SKEWY,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(\()/)){result=new TransformToken(TransformToken.LPAREN,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(\))/)){result=new TransformToken(TransformToken.RPAREN,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)){result=new TransformToken(TransformToken.NUMBER,parseFloat(RegExp.$1));buffer=buffer.substr(RegExp.$1.length);}else{throw new Error("TransformLexer.getNextToken: unrecognized text "+buffer);}}this._transformText=buffer;return result;};
TransformToken.UNDEFINED=0;
TransformToken.MATRIX=1;
TransformToken.TRANSLATE=2;
TransformToken.SCALE=3;
TransformToken.ROTATE=4;
TransformToken.SKEWX=5;
TransformToken.SKEWY=6;
TransformToken.LPAREN=7;
TransformToken.RPAREN=8;
TransformToken.NUMBER=9;
TransformToken.EOD=10;
function TransformToken(type,text){if(arguments.length>0){this.init(type,text);}}
TransformToken.prototype.init=function(type,text){this.type=type;this.text=text;};
TransformToken.prototype.typeis=function(type){return this.type==type;}