var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autoinc(target, propertyKey) {
    var _val = target[propertyKey];
    var getter = function () {
        _val = _val + 1;
        console.log("getter: \u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0432\u0430\u0435\u043C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0441\u0447\u0435\u0442\u0447\u0438\u043A\u0430 \u043D\u0430 1 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438. \u041D\u043E\u0432\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 " + _val + " ");
        return _val;
    };
    var setter = function (newVal) {
        console.log("setter: \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0441\u0447\u0435\u0442\u0447\u0438\u043A\u0430: " + newVal);
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
var Counter = /** @class */ (function () {
    function Counter() {
    }
    Counter.prototype.InitCounter = function (value) {
        this.Value = value;
    };
    __decorate([
        autoinc
    ], Counter.prototype, "Value", void 0);
    return Counter;
}());
var counter = new Counter();
counter.InitCounter(0);
for (var i = 0; i < 5; i++) {
    console.log(counter.Value);
}
counter.InitCounter(100);
for (var i = 0; i < 5; i++) {
    console.log(counter.Value);
}
while (true) { }
//# sourceMappingURL=app.js.map