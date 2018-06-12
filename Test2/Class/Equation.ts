import { isNull } from "util";

enum Operation { Plus = '+', Minus = '-', Divide = '/', Multiply = '*' };

export class EquationParser {

    //Преобразование в число с учетом знака
    private ToNumber(op: [Operation, number]): number {
        if (op[0] == Operation.Minus) {
            return -op[1];
        }
        return op[1];
    }

    //Операции над числами
    private DoOp(Op: Operation, Num1: number, Num2: number): number {
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
    }

    //Проверка на число
    private IsNum(char: string): boolean {
        return !isNaN(parseInt(char));
    }

    //Поддерживаемые операции
    private IsOp(char: string): Operation {
        switch (char) {
            case '+': return Operation.Plus;
            case '-': return Operation.Minus;
            case '/': return Operation.Divide;
            case '*': return Operation.Multiply;
            default: return null;
        }
    }


    Parse(input: String): number {

        if (input == '') return NaN;

        let primer: Array<[Operation, number]> = new Array();

        let currOp = Operation.Plus;
        let startIndex = 0;
        //Если в начале примера отрицательное число
        if (this.IsOp(input[0]) == Operation.Minus) {
            startIndex = 1;
            currOp = Operation.Minus;
        }

        //Заполнение массива знак/число
        let currStr: string = '';
        for (var i = startIndex; i < input.length; i++) {
            if (this.IsNum(input[i]))
                currStr = currStr + input[i];
            else {
                if (currStr == '')
                    return NaN;
                primer.push([currOp, parseInt(currStr)]);
                currStr = '';
                currOp = this.IsOp(input[i]);
                if (isNull(currOp))
                    return NaN;
            }


        }
        //Если пример заканчивается числом добавляем, если нет пример некорректный
        if (currStr == '') return NaN;
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
        let result: number = 0;
        for (var i = 1; i < primer.length; i++) {
            result = result + this.DoOp(Operation.Plus, this.ToNumber(primer[i - 1]), this.ToNumber(primer[i]));
            primer[i][1] = 0;
        }
        return result;
    }


    ToPrint(input: string): string {
        return `Результат ${input} = ${this.Parse(input).toString()}`;
    }
}


//export (EquationParser);