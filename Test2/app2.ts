import { EquationParser } from "./Class/Equation";

//Тестовые примеры
let equation = new EquationParser();
console.log(equation.ToPrint('1+2'));
console.log(equation.ToPrint('2+3*2'));
console.log(equation.ToPrint('1-6/2'));

console.log(equation.ToPrint('10-60/20'));
console.log(equation.ToPrint('1-3/2'));
console.log(equation.ToPrint('1'));
console.log(equation.ToPrint('-1'));
console.log('Результат 1-2*2*2 = ' + equation.Parse('1-2*2*2').toString());

while (true) {}
