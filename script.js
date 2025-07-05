class Cell {
    constructor(isAlive) {
        this.isAlive = isAlive;
    }
}

const ROW_SIZE = 80;
const COLUMN_SIZE = 80;

// initialisation
let iniCellArray = [];
table = document.getElementById("table");
for (let i = 0; i < ROW_SIZE; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < COLUMN_SIZE; j++) {
        const td = document.createElement("td");
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

const createCellArray = () => {
    for (let i = 0; i < ROW_SIZE; i++) {
        iniCellArray[i] = new Array(ROW_SIZE);
        for (let j = 0; j < COLUMN_SIZE; j++) {
            iniCellArray[i][j] = new Cell(Math.random() < 0.3);
        }
    }
}

createCellArray();

// helper functions
const inRange = (i, j) => {
    return i >= 0 && j >= 0 && i < ROW_SIZE && j < COLUMN_SIZE;
}

const countNeighborAliveCells = (rowIndex, columnIndex, cellArray) => {
    let count = 0;
    for (let i = rowIndex - 1; i < rowIndex + 2; i++) {
        for (let j = columnIndex - 1; j < columnIndex + 2; j++) {
            if (!(i === rowIndex && j === columnIndex) && inRange(i, j) && cellArray[i][j].isAlive) {
                count++;
            }
        }
    }
    return count;
}

const initialiseCellArray = () => {
    let newCellArray = [];
    for (let i = 0; i < COLUMN_SIZE; i++) {
        newCellArray[i] = new Array(ROW_SIZE);
        for (let j = 0; j < ROW_SIZE; j++) {
            newCellArray[i][j] = new Cell(false);
        }
    }
    return newCellArray;
}

const renderCellArray = (newCellArray) => {
    let table = document.getElementById("table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        for (let j = 0, col; col = row.cells[j]; j++) {
            col.style.backgroundColor = newCellArray[i][j].isAlive ? "#0130AA" : "#E7E7E7";
        }
    }
}

// loop
let interval;
const next = () => {
    let cellArray = iniCellArray;
    let iteration = 0;
    interval = setInterval(() => {
        if (iteration >= Number.MAX_VALUE) {
            clearInterval(interval);
            return;
        }

        let newCellArray = initialiseCellArray();
        for (let i = 0; i < COLUMN_SIZE; i++) {
            for (let j = 0; j < ROW_SIZE; j++) {
                const neighbors = countNeighborAliveCells(i, j, cellArray);
                const isAlive = cellArray[i][j].isAlive;
                if ((neighbors < 2 || neighbors > 3) && isAlive) {
                    newCellArray[i][j].isAlive = false;
                } else if (neighbors === 3 && !isAlive) {
                    newCellArray[i][j].isAlive = true;
                } else {
                    newCellArray[i][j].isAlive = isAlive;
                }
            }
        }
        renderCellArray(newCellArray);
        cellArray = newCellArray;
        iteration++;
    }, 100);
}

next();

// refresh button
document.getElementById("restart").addEventListener("click", () => {
    if (interval) {
        clearInterval(interval);
    }
    document.getElementById("restart").classList.add("animation");
    setTimeout(() => {
        document.getElementById("restart").classList.remove("animation");
    }, 1000);
    createCellArray();
    next()
})

// info button
document.getElementById("info-button").addEventListener("click", () => {
    const info = document.getElementById("info-text");
    if (info.classList.contains("show")) {
        info.classList.remove("show");
    } else {
        info.classList.add("show");
    }
});
