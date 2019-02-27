const GRID_WIDTH = 1280;
const GRID_HEIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;
const GAME_SPEED = 100;

let isPlaying = false;

const root = document.querySelector('#root');
const table = createTable(GRID_ROWS, GRID_COLS);

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

    root.appendChild(table);

    return table;
}