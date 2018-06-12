"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var Operation;
(function (Operation) {
    Operation["Plus"] = "+";
    Operation["Minus"] = "-";
    Operation["Divide"] = "/";
    Operation["Multiply"] = "*";
})(Operation || (Operation = {}));
;
var EquationParser = /** @class */ (function () {
    function EquationParser() {
    }
    //Преобразование в число с учетом знака
    EquationParser.prototype.ToNumber = function (op) {
        if (op[0] == Operation.Minus) {
            return -op[1];
        }
        return op[1];
    };
    //Операции над числами
    EquationParser.prototype.DoOp = function (Op, Num1, Num2) {
        switch (Op) {
            case Operation.Plus:
                {
                    return Num1 + Num2;
                }
            case Operation.Minus:
                {
                    return Num1 - Num2;
                }
            case Operation.Divide:
                {
                    if (Num2 == 0)
                        return NaN;
                    return Num1 / Num2;
                }
            case Operation.Multiply:
                {
                    return Num1 * Num2;
                }
            default:
                return NaN;
        }
    };
    //Проверка на число
    EquationParser.prototype.IsNum = function (char) {
        return !isNaN(parseInt(char));
    };
    //Поддерживаемые операции
    EquationParser.prototype.IsOp = function (char) {
        switch (char) {
            case '+': return Operation.Plus;
            case '-': return Operation.Minus;
            case '/': return Operation.Divide;
            case '*': return Operation.Multiply;
            default: return null;
        }
    };
    EquationParser.prototype.Parse = function (input) {
        if (input == '')
            return NaN;
        var primer = new Array();
        var currOp = Operation.Plus;
        var startIndex = 0;
        //Если в начале примера отрицательное число
        if (this.IsOp(input[0]) == Operation.Minus) {
            startIndex = 1;
            currOp = Operation.Minus;
        }
        //Заполнение массива знак/число
        var currStr = '';
        for (var i = startIndex; i < input.length; i++) {
            if (this.IsNum(input[i]))
                currStr = currStr + input[i];
            else {
                if (currStr == '')
                    return NaN;
                primer.push([currOp, parseInt(currStr)]);
                currStr = '';
                currOp = this.IsOp(input[i]);
                if (util_1.isNull(currOp))
                    return NaN;
            }
        }
        //Если пример заканчивается числом добавляем, если нет пример некорректный
        if (currStr == '')
            return NaN;
        primer.push([currOp, parseInt(currStr)]);
        //Если одно число выводим сразу
        if (primer.length == 1)
            return this.ToNumber(primer[0]);
        //Выполняем операции умножения/деления
        for (var i = 1; i < primer.length; i++) {
            if ((primer[i][0] == Operation.Divide) || (primer[i][0] == Operation.Multiply)) {
                primer[i][1] = this.DoOp(primer[i][0], this.ToNumber(primer[i - 1]), this.ToNumber(primer[i]));
                primer[i][0] = Operation.Plus;
                primer[i - 1][1] = 0;
            }
        }
        //Выполняем операции сложения результатов c учетом знака
        var result = 0;
        for (var i = 1; i < primer.length; i++) {
            result = result + this.DoOp(Operation.Plus, this.ToNumber(primer[i - 1]), this.ToNumber(primer[i]));
            primer[i][1] = 0;
        }
        return result;
    };
    EquationParser.prototype.ToPrint = function (input) {
        return "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 " + input + " = " + this.Parse(input).toString();
    };
    return EquationParser;
}());
//Тестовые примеры
var equation = new EquationParser();
console.log(equation.ToPrint('1+2'));
console.log(equation.ToPrint('2+3*2'));
console.log(equation.ToPrint('1-6/2'));
console.log(equation.ToPrint('10-60/20'));
console.log(equation.ToPrint('1-3/2'));
console.log(equation.ToPrint('1'));
console.log(equation.ToPrint('-1'));
console.log('Результат 1-2*2*2 = ' + equation.Parse('1-2*2*2').toString());
while (true) { }
//# sourceMappingURL=app.js.map