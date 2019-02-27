const GRID_WIDTH = 1280;
const GRID_HEIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;
const GAME_SPEED = 100;

const grid = createGrid(GRID_ROWS, GRID_COLS);
const nextGrid = createGrid(GRID_ROWS, GRID_COLS);

let isPlaying = false;

const root = document.querySelector('#root');
const table = createTable(GRID_ROWS, GRID_COLS);
createControls();

function updateView() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = table.rows[i].cells[j];
            const isCellAlive = grid[i][j];

            cell.classList.toggle('alive', isCellAlive)
        }
    }
}

function createTable(rows, cols) {
    const table = document.createElement('table');

    table.className = 'grid';

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        row.className = 'row';

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');
            cell.className = 'cell';
            cell.width = GRID_WIDTH / cols ;
            cell.height = GRID_HEIGHT / rows;

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    table.addEventListener('click', (evt) => {
        if (!event.target.classList.contains('cell')) {
            return
        }

        const cell = evt.target;
        const rowIndex = cell.parentNode.rowIndex;
        const cellIndex = cell.cellIndex;
        const isCellAlive = grid[rowIndex][cellIndex] === 1;

        grid[rowIndex][cellIndex] = isCellAlive ? 0 : 1;

        cell.classList.toggle('alive', !isCellAlive);
    });

    root.appendChild(table);

    return table;
}

function createControls() {
    const startButton = document.createElement('button');
    startButton.className = 'material-icons';
    startButton.textContent = 'play_arrow';
    startButton.addEventListener('click', (evt) => {
        if (isPlaying) {
            isPlaying = false;
            evt.target.textContent = 'play_arrow';
        } else {
            isPlaying = true;
            evt.target.textContent = 'pause';
        }
    });

    const resetButton = document.createElement('button');
    resetButton.className = 'material-icons';
    resetButton.textContent = 'replay';
    resetButton.addEventListener('click', (evt) => {
        isPlaying = false;
        startButton.textContent = 'play_arrow';
    });

    const randomizeButton = document.createElement('button');
    randomizeButton.className = 'material-icons';
    randomizeButton.textContent = 'transform';
    randomizeButton.addEventListener('click', (evt) => {
        isPlaying = false;
        startButton.textContent = 'play_arrow';
        
        randomizeGrid();
        console.log(grid);
        updateView();
    });


    const container = document.createElement('div');
    container.className = 'controls';

    container.append(startButton, resetButton, randomizeButton);

    root.appendChild(container);
}

function createGrid(rows, cols) {
    const grid = [];

    for (let i = 0; i < rows; i++) {
        grid[i] = [];

        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }

    return grid;
}

function randomizeGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = Math.round(Math.random());
        }
    }
}