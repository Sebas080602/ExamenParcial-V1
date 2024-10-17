
// 1. Tipos avanzados (tipo de union e interseccion)
type TaskStatus = "pending" | "resolved" | "rejected";

interface Task {
  id: number;
  description: string;
  status: TaskStatus;
}

// Intersección de tipos
type PromiseLike<T> = Promise<T> | Thenable<T>;

// 2. Utility types (Pick, Partial, Omit, Readonly)
type PickType<T, K extends keyof T> = {
  [P in K]: T[P];
};

type OmitType<T, K extends keyof T> = PickType<T, Exclude<keyof T, K>>;

type PartialType<T> = {
  [P in keyof T]?: T[P];
};

type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P];
};

// 3. Interfaces y tipos de funciones
interface Logger {
  log(message: string): void;
}

type LoggerOptions = {
  level?: "info" | "warn" | "error";
};

function createLogger(options: LoggerOptions): Logger {
    const logger = {
      log: (message: string) => {
        if (options.level === "info") {
          console.info(message);
        } else if (options.level === "warn") {
          console.warn(message);
        } else if (options.level === "error") {
          console.error(message);
        } else {
          console.log(message);
        }
      },
    };

    return logger;
}

// 4. Generics para crear clases y funciones reutilizables
class Queue<T> {
  private data: T[] = [];

  enqueue(item: T): void {
    this.data.push(item);
  }

  dequeue(): T | undefined {
    return this.data.shift();
  }

  get size(): number {
    return this.data.length;
  }
}

// 5. Programación orientada a objetos (POO) y la herencia, polimorfismo, abstraccion y encapsulacion
class TaskQueue extends Queue<Task> {
  processTasks(): void {
    while (this.size > 0) {
      const task = this.dequeue();
      if (task) {
        this.processTask(task);
      }
    }
  }

  private processTask(task: Task): void {
    // Implementación de la lógica para procesar la tarea
  }
}

// 6. Manejo de null y undefined con narrowing
function processTask(task: Task | null | undefined): void {
  if (task) {
    // Aquí task es de tipo Task
    console.log(task.description);
  } else {
    console.log("Task is null or undefined");
  }
}

// Simulación de un Event Loop en Node.js
const logger = createLogger({ level: "info" });

const taskQueue = new TaskQueue();

logger.log("Añadiendo tareas al queue");
taskQueue.enqueue({ id: 1, description: "Tarea 1", status: "pending" });
taskQueue.enqueue({ id: 2, description: "Tarea 2", status: "pending" });
taskQueue.enqueue({ id: 3, description: "Tarea 3", status: "pending" });

logger.log("Procesando tareas");
taskQueue.processTasks();

// Simulación de microtareas y macrotareas
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Microtask 1 resolved");
  }, 0);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Microtask 2 resolved");
    }, 100);
  });

  logger.log("Executing macrotask");
  setTimeout(() => {
    logger.log("Macrotask 1 executed");
  }, 50);

  logger.log("Executing microtask");
  promise1.then(logger.log);
  promise2.then(logger.log);
  logger.log("Macrotask 2 executed");
  logger.log("Event Loop finished");
