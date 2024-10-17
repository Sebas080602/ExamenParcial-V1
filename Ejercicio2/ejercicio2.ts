// Ejercicio 2, lenguaje TypeScript

// Solucion el Ejercicio 2


// 1. Importar los hooks de React y generar los datos simulados

import React, { useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef } from 'react';

interface BoardData {
    id: number;
    name: string;
    description: string;
}

const initialBoards: BoardData[] = [
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

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function generateRandomBoardData(): BoardData {
    const randomId = getRandomInt(1, 10);
    const randomName = `Board ${randomId}`;
    const randomDescription = `Description for ${randomName}`;

    return { id: randomId, name: randomName, description: randomDescription };
}

function useRandomBoardData(): BoardData {
    const [randomBoardData, setRandomBoardData] = useState<BoardData>(generateRandomBoardData());
    return randomBoardData;
}

function useBoardData() {
    const [boardData, setBoardData] = useState<BoardData>(useRandomBoardData());
    return boardData;
}


// 3. manejar el estado global

function useBoardState(initialState: BoardData[]): [BoardData[], React.Dispatch<React.SetStateAction<BoardData[]>>] {
    const [boards, setBoards] = useState(initialState);
    return [boards, setBoards];
    const handleBoardChange = (event: React.ChangeEvent<HTMLInputElement>, boardId: number) => {
        setBoards(prevBoards => prevBoards.map(board => board.id === boardId? {...board, name: event.target.value } : board));
    };
    return [boards, handleBoardChange];
}

const [boards, setBoards] = useBoardState(initialBoards);

// 4. manejar los efectos colaterales

function useBoardEffect() {
    useEffect(() => {
        console.log('Effect triggered');
    }, []);
    const handleBoardClick = (boardId: number) => {
        console.log(`Clicked on board ${boardId}`);
    };
    return handleBoardClick;
}


// 5. manejar el estado de filtrado

function useFilterState(initialState: string): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [filter, setFilter] = useState(initialState);
    return [filter, setFilter];
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };
    return [filter, handleFilterChange];
}


// 6. manejar el estado de ordenamiento

function useSortState(initialState: string): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [sort, setSort] = useState(initialState);
    return [sort, setSort];
    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSort(event.target.value);
    };
    return [sort, handleSortChange];
}


// 7. manejar las interacciones del usuario

function useBoardInteraction() {
    const handleAddBoard = () => {
        const newBoard = generateRandomBoardData();
        setBoards([...boards, newBoard]);
    };

    const handleDeleteBoard = (boardId: number) => {
        const newBoards = boards.filter((board) => board.id !== boardId); 
        setBoards(newBoards);
    };
    const handleUpdateBoard = (updatedBoard: BoardData) => {
        const newBoards = boards.map((board) =>
            board.id === updatedBoard.id ? updatedBoard : board
        );
        setBoards(newBoards);
    };
    const handleToggleBoardStatus = (boardId: number) => {
        const newBoards = boards.map((board) =>
            board.id === boardId ? { ...board, isActive: !board.isActive } : board
        );
        setBoards(newBoards);
    };
    const handleSortByName = () => {
        setSort('name');
    };

    const handleSortById = () => {
        setSort('id');
    };


    return { handleAddBoard, handleDeleteBoard };
}


// 8. manejar errores y casos de borde

function useErrorHandler() {
    const handleError = () => {
        throw new Error('An error occurred');
        console.error('An error occurred');
        return null;
    };
    return { handleError };
}


// 9. Creamos el componente principal

function App() {
    const [boards, setBoards] = useBoardState(initialBoards);
    const [filter, setFilter] = useFilterState('');
    const [sort, setSort] = useSortState('name');
    const { handleAddBoard, handleDeleteBoard } = useBoardInteraction();
    const { handleError } = useErrorHandler();
    const filteredBoards = boards.filter((board) =>
        board.name.toLowerCase().includes(filter.toLowerCase())
    );
    const sortedBoards = filteredBoards.sort((a, b) =>
        sort === 'name' ? a.name.localeCompare(b.name) : a.id - b.id
    );
    return (
        <div>
            <div>
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="name">Sort by Name</option>
                    <option value="id">Sort by ID</option>
                </select>
            </div>
            <button onClick={handleAddBoard}>Add Board</button>
            <ul>
                {sortedBoards.map((board) => (
                    <li key={board.id}>
                        {board.name} - {board.description}
                        <button
                            onClick={() => handleDeleteBoard(board.id)}
                        >
                            Delete Board
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={handleError}>Error</button>
        </div>
    );
}


// 10. Exportar el componente principal

export default App;