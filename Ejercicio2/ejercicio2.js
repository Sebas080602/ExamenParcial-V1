"use strict";
// Ejercicio 2, lenguaje TypeScript
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// Solucion el Ejercicio 2
// 1. Importar los hooks de React y generar los datos simulados
var react_1 = require("react");
var initialBoards = [
    { id: 1, name: 'Board 1', description: 'Description for Board 1' },
    { id: 2, name: 'Board 2', description: 'Description for Board 2' },
    { id: 3, name: 'Board 3', description: 'Description for Board 3' },
    { id: 4, name: 'Board 4', description: 'Description for Board 4' },
    { id: 5, name: 'Board 5', description: 'Description for Board 5' },
    { id: 6, name: 'Board 6', description: 'Description for Board 6' },
    { id: 7, name: 'Board 7', description: 'Description for Board 7' },
    { id: 8, name: 'Board 8', description: 'Description for Board 8' },
    { id: 9, name: 'Board 9', description: 'Description for Board 9' },
    { id: 10, name: 'Board 10', description: 'Description for Board 10' },
];
// 2. generar datos aleatorios
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomBoardData() {
    var randomId = getRandomInt(1, 10);
    var randomName = "Board ".concat(randomId);
    var randomDescription = "Description for ".concat(randomName);
    return { id: randomId, name: randomName, description: randomDescription };
}
function useRandomBoardData() {
    var _a = (0, react_1.useState)(generateRandomBoardData()), randomBoardData = _a[0], setRandomBoardData = _a[1];
    return randomBoardData;
}
function useBoardData() {
    var _a = (0, react_1.useState)(useRandomBoardData()), boardData = _a[0], setBoardData = _a[1];
    return boardData;
}
// 3. manejar el estado global
function useBoardState(initialState) {
    var _a = (0, react_1.useState)(initialState), boards = _a[0], setBoards = _a[1];
    return [boards, setBoards];
    var handleBoardChange = function (event, boardId) {
        setBoards(function (prevBoards) { return prevBoards.map(function (board) { return board.id === boardId ? __assign(__assign({}, board), { name: event.target.value }) : board; }); });
    };
    return [boards, handleBoardChange];
}
var _a = useBoardState(initialBoards), boards = _a[0], setBoards = _a[1];
// 4. manejar los efectos colaterales
function useBoardEffect() {
    (0, react_1.useEffect)(function () {
        console.log('Effect triggered');
    }, []);
    var handleBoardClick = function (boardId) {
        console.log("Clicked on board ".concat(boardId));
    };
    return handleBoardClick;
}
// 5. manejar el estado de filtrado
function useFilterState(initialState) {
    var _a = (0, react_1.useState)(initialState), filter = _a[0], setFilter = _a[1];
    return [filter, setFilter];
    var handleFilterChange = function (event) {
        setFilter(event.target.value);
    };
    return [filter, handleFilterChange];
}
// 6. manejar el estado de ordenamiento
function useSortState(initialState) {
    var _a = (0, react_1.useState)(initialState), sort = _a[0], setSort = _a[1];
    return [sort, setSort];
    var handleSortChange = function (event) {
        setSort(event.target.value);
    };
    return [sort, handleSortChange];
}
// 7. manejar las interacciones del usuario
function useBoardInteraction() {
    var handleAddBoard = function () {
        var newBoard = generateRandomBoardData();
        setBoards(__spreadArray(__spreadArray([], boards, true), [newBoard], false));
    };
    var handleDeleteBoard = function (boardId) {
        var newBoards = boards.filter(function (board) { return board.id !== boardId; });
        setBoards(newBoards);
    };
    var handleUpdateBoard = function (updatedBoard) {
        var newBoards = boards.map(function (board) {
            return board.id === updatedBoard.id ? updatedBoard : board;
        });
        setBoards(newBoards);
    };
    var handleToggleBoardStatus = function (boardId) {
        var newBoards = boards.map(function (board) {
            return board.id === boardId ? __assign(__assign({}, board), { isActive: !board.isActive }) : board;
        });
        setBoards(newBoards);
    };
    var handleSortByName = function () {
        setSort('name');
    };
    var handleSortById = function () {
        setSort('id');
    };
    return { handleAddBoard: handleAddBoard, handleDeleteBoard: handleDeleteBoard };
}
// 8. manejar errores y casos de borde
function useErrorHandler() {
    var handleError = function () {
        throw new Error('An error occurred');
        console.error('An error occurred');
        return null;
    };
    return { handleError: handleError };
}
// 9. Creamos el componente principal
function App() {
    var _a = useBoardState(initialBoards), boards = _a[0], setBoards = _a[1];
    var _b = useFilterState(''), filter = _b[0], setFilter = _b[1];
    var _c = useSortState('name'), sort = _c[0], setSort = _c[1];
    var _d = useBoardInteraction(), handleAddBoard = _d.handleAddBoard, handleDeleteBoard = _d.handleDeleteBoard;
    var handleError = useErrorHandler().handleError;
    var filteredBoards = boards.filter(function (board) {
        return board.name.toLowerCase().includes(filter.toLowerCase());
    });
    var sortedBoards = filteredBoards.sort(function (a, b) {
        return sort === 'name' ? a.name.localeCompare(b.name) : a.id - b.id;
    });
    return type = "text";
    value = { filter: filter };
    onChange = {}(e);
    setFilter(e.target.value);
}
/>
    < select;
value = { sort: sort };
onChange = {}(e);
setSort(e.target.value);
    >
        value;
"name" > Sort;
by;
Name < /option>
    < option;
value = "id" > Sort;
by;
ID < /option>
    < /select>
    < /div>
    < button;
onClick = { handleAddBoard: handleAddBoard } > Add;
Board < (/button>);
{
    sortedBoards.map(function (board) { return key = { board: board, : .id } >
        { board: board, : .name } - { board: board, : .description }
        < button; }, onClick = {}(), handleDeleteBoard(board.id));
}
    >
        Delete;
Board
    < /button>
    < /li>;
/ul>
    < button;
onClick = { handleError: handleError } > Error < /button>
    < /div>;
;
// 10. Exportar el componente principal
exports.default = App;
