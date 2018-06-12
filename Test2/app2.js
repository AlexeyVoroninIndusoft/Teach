"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Equation_1 = require("./Class/Equation");
//Тестовые примеры
var equation = new Equation_1.EquationParser();
console.log(equation.ToPrint('1+2'));
console.log(equation.ToPrint('2+3*2'));
console.log(equation.ToPrint('1-6/2'));
console.log(equation.ToPrint('10-60/20'));
console.log(equation.ToPrint('1-3/2'));
console.log(equation.ToPrint('1'));
console.log(equation.ToPrint('-1'));
console.log('Результат 1-2*2*2 = ' + equation.Parse('1-2*2*2').toString());
while (true) { }
//# sourceMappingURL=app2.js.map