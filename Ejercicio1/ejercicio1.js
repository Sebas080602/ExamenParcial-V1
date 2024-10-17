var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function createLogger(options) {
    var logger = {
        log: function (message) {
            if (options.level === "info") {
                console.info(message);
            }
            else if (options.level === "warn") {
                console.warn(message);
            }
            else if (options.level === "error") {
                console.error(message);
            }
            else {
                console.log(message);
            }
        },
    };
    return logger;
}
// 4. Generics para crear clases y funciones reutilizables
var Queue = /** @class */ (function () {
    function Queue() {
        this.data = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.data.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.data.shift();
    };
    Object.defineProperty(Queue.prototype, "size", {
        get: function () {
            return this.data.length;
        },
        enumerable: false,
        configurable: true
    });
    return Queue;
}());
// 5. Programación orientada a objetos (POO) y la herencia, polimorfismo, abstraccion y encapsulacion
var TaskQueue = /** @class */ (function (_super) {
    __extends(TaskQueue, _super);
    function TaskQueue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskQueue.prototype.processTasks = function () {
        while (this.size > 0) {
            var task = this.dequeue();
            if (task) {
                this.processTask(task);
            }
        }
    };
    TaskQueue.prototype.processTask = function (task) {
        // Implementación de la lógica para procesar la tarea
    };
    return TaskQueue;
}(Queue));
// 6. Manejo de null y undefined con narrowing
function processTask(task) {
    if (task) {
        // Aquí task es de tipo Task
        console.log(task.description);
    }
    else {
        console.log("Task is null or undefined");
    }
}
// Simulación de un Event Loop en Node.js
var logger = createLogger({ level: "info" });
var taskQueue = new TaskQueue();
logger.log("Añadiendo tareas al queue");
taskQueue.enqueue({ id: 1, description: "Tarea 1", status: "pending" });
taskQueue.enqueue({ id: 2, description: "Tarea 2", status: "pending" });
taskQueue.enqueue({ id: 3, description: "Tarea 3", status: "pending" });
logger.log("Procesando tareas");
taskQueue.processTasks();
// Simulación de microtareas y macrotareas
var promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Microtask 1 resolved");
    }, 0);
});
var promise2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Microtask 2 resolved");
    }, 100);
});
logger.log("Executing macrotask");
setTimeout(function () {
    logger.log("Macrotask 1 executed");
}, 50);
logger.log("Executing microtask");
promise1.then(logger.log);
promise2.then(logger.log);
logger.log("Macrotask 2 executed");
logger.log("Event Loop finished");
