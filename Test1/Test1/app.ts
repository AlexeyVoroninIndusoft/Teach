import { isNull } from "util";

enum Operation { Plus = '+', Minus = '-', Divide = '/', Multiply = '*'};

//Преобразование в число с учетом знака
function ToNumber(op:[Operation, number]): number {
    if (op[0] == Operation.Minus) {
        return -op[1];
    }
    return op[1];
}

//Операции над числами
function DoOp(Op: Operation, Num1: number, Num2: number): number {
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
function IsNum(char: string): boolean {
    return !isNaN(parseInt(char));
}

//Поддерживаемые операции
function IsOp(char: string): Operation {
    switch (char) {
        case '+': return Operation.Plus;
        case '-': return Operation.Minus;
        case '/': return Operation.Divide;
        case '*': return Operation.Multiply;
        default: return null;
    }
}

function Parse(input: String): number {

    if (input == '') return NaN;

    let primer: Array<[Operation, number]> = new Array();
    
    let currOp = Operation.Plus;
    let startIndex = 0;
    //Если в начале примера отрицательное число
    if (IsOp(input[0]) == Operation.Minus) {
        startIndex = 1;
        currOp = Operation.Minus;
    }

    //Заполнение массива знак/число
    let currStr: string = '';
    for (var i = startIndex; i < input.length; i++) {
            if (IsNum(input[i]))
                currStr = currStr + input[i];
            else {
                if (currStr == '')
                    return NaN;
                primer.push([currOp, parseInt(currStr)]);
                currStr = '';
                currOp = IsOp(input[i]);
                if (isNull(currOp))
                    return NaN;
            }
        

    }
    //Если пример заканчивается числом добавляем, если нет пример некорректный
    if (currStr == '') return NaN;
    primer.push([currOp, parseInt(currStr)]);

    //Если одно число выводим сразу
    if (primer.length == 1)
        return ToNumber(primer[0]);
    
    //Выполняем операции умножения/деления
    for (var i = 1; i < primer.length; i++) {
        if ((primer[i][0] == Operation.Divide) || (primer[i][0] ==Operation.Multiply)) {           
            primer[i][1] = DoOp(primer[i][0], ToNumber(primer[i - 1]), ToNumber(primer[i]));
            primer[i][0] = Operation.Plus;
            primer[i-1][1] = 0;
        }
     }

    //Выполняем операции сложения результатов c учетом знака
    let result: number = 0; 
    for (var i = 1; i < primer.length; i++) {        
        result = result + DoOp(Operation.Plus, ToNumber(primer[i - 1]), ToNumber(primer[i]));
        primer[i][1] = 0;               
    }    
    return result;
}

//Тестовые примеры
console.log('Результат 1+2 = ' + Parse('1+2').toString());
console.log('Результат 2+3*2 = ' + Parse('2+3*2').toString());
console.log('Результат 1-6/2 = ' + Parse('1-6/2').toString());

console.log('Результат 10-60/20 = ' + Parse('10-60/20').toString());
console.log('Результат 1-3/2 = ' + Parse('1-3/2').toString());
console.log('Результат 1 = ' + Parse('1').toString());
console.log('Результат -1 = ' + Parse('-1').toString());
console.log('Результат 1-2*2*2 = ' + Parse('1-2*2*2').toString());
while (0 == 0) {

}
