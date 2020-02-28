const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const chai = require("chai");
const expect = chai.expect;
const lineCodeProcessing = require("../../build/lineCodeProcessing");

describe("Source Code Processing", () => {
  const classesDeclarations = [
    "class HelloWorld{",
    "class HelloWorld {",
    "class HelloWorld  {",
    " class HelloWorld{",
    " class HelloWorld {",
    " class HelloWorld  {",
    "  class HelloWorld{",
    "  class HelloWorld {",
    "  class HelloWorld  {",
    "class  HelloWorld extends React.Component {"
  ];
  const cssClassesDeclarations = [
    '<button className="SomeClass" onClick={ this.functionToExecute.bind(this) }>SUBMIT</button>'
  ];
  const namedFunctions = [
    "function functionName(){",
    "function functionName (arg1, arg2) {",
    "functionName (arg1, arg2, arg3) {",
    "functionName = function (arg1, arg2) {",
    "functionName = (arg1, arg2) => {",
    "functionName = function otherName (arg1, arg2) => {",
    "array.forEach(function functionName() {",
    "export const functionName = (arg1, arg2) => {",
    "functionName(arg1: any): any {",
    "async functionName(arg1: any): any {",
    "public functionName(arg1: any): any {",
    "public async functionName(arg1: any): any {",
    "public static functionName(arg1: any): any {",
    "private functionName(arg1: any): any {",
    "protected functionName(arg1: any): any {",
    "static functionName(arg1: any): any {",
    "export functionName(arg1: any): any {"
  ];
  const nonNamedFunctions = [
    "function() {",
    "function(arg1, arg2) {",
    "() => {",
    "(arg1, arg2) => {"
  ];
  const jSBuiltInStatements = [
    "if (a > 0)  {",
    "switch (n) {",
    "for(let i=0; i < 10; i++) {",
    "while(true) {",
    "catch(error) {"
  ];
  it("Check if the line code represents a class declaration", () => {
    classesDeclarations.forEach(classDeclaration => {
      expect(
        lineCodeProcessing.checkClassDeclaration(classDeclaration)
      ).to.equal(true);
    });
    cssClassesDeclarations.forEach(cssClassDeclaration => {
      expect(
        lineCodeProcessing.checkClassDeclaration(cssClassDeclaration)
      ).to.equal(false);
    });
  }),
    it("Get class name from a line code representing a class declaration", () => {
      classesDeclarations.forEach(classDeclaration => {
        expect(lineCodeProcessing.className(classDeclaration)).to.equal(
          "HelloWorld"
        );
      });
    }),
    it("Check if the code line represents a named function declaration", () => {
      namedFunctions.forEach(namedFunction => {
        expect(lineCodeProcessing.checkIfFunction(namedFunction)).to.equal(
          true
        );
      });
      nonNamedFunctions.forEach(nonNamedFunction => {
        expect(lineCodeProcessing.checkIfFunction(nonNamedFunction)).to.equal(
          false
        );
      });
    });
  it("Check if the code line represents an if, switch, while, for or catch statement", () => {
    jSBuiltInStatements.forEach(jSBuiltInStatement => {
      expect(
        lineCodeProcessing.checkIfJSBuiltInStatement(jSBuiltInStatement)
      ).to.equal(true);
    });
  });
  it("Get function name from a line code representing a function declaration", () => {
    namedFunctions.forEach(namedFunction => {
      expect(lineCodeProcessing.functionName(namedFunction)).to.equal(
        "functionName"
      );
    });
  });
});