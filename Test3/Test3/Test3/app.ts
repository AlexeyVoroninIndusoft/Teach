function autoinc(target: object, propertyKey: any): void {
    let _val: number = target[propertyKey];
    let getter = function () {       
        _val = _val + 1;
        console.log(`getter: Увеличиваем значение счетчика на 1 при получении. Новое значение ${_val} `);
        return _val;
    };

    let setter = function(newVal: number) {
        console.log(`setter: Установлено значение счетчика: ${newVal}`);
        _val = newVal;

    };

    // удаляем старое свойство
    if (delete this[propertyKey]) {

        // И создаем новое свойство с геттером и сеттером
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }

}


class Counter {
    @autoinc
    Value: number;

    InitCounter(value: number): void {
        this.Value = value;
    }
}


let counter: Counter = new Counter();


counter.InitCounter(0);
for (var i = 0; i < 5; i++) {
    console.log(counter.Value);
}

counter.InitCounter(100);
for (var i = 0; i < 5; i++) {
    console.log(counter.Value);
}
