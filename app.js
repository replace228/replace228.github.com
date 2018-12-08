var tiles = [];
var freeCell = {y: 3, x: 3};
var shuffled = false;

/* вызываем функции поля и костяшек */
createField();
createTiles();
animateTiles();
shuffleTiles();

/* создаем поле */
function createField() {
    var x, y, cell;
    for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
            cell = createCellNull();
            cell.y = y;
            cell.x = x;
            setCellOffset(cell);
            appendCell(cell);
        }       
    }
}

function createCellNull() {
    var cell = document.createElement('div');
    cell.classList.add('field-cell', 'field-cell-null');
    return cell;
}

function setCellOffset(cell) {
    let left = 5 + (5 + 90) * cell.x;
    left = left + 'px';
    cell.style.left = left;
    let top = 5 + (5 + 90) * cell.y;
    top = top + 'px';
    cell.style.top = top;
}

function appendCell(cell) {
    let field = document.getElementById('field');
    field.appendChild(cell);
}

/* создаем костяшки */
function createTiles() {
    var x, y, cell, n;
    for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
            n = y * 4 + x + 1;
            // убираем число 16
            if (n < 16) {
                cell = createCellTile();
                cell.y = y;
                cell.x = x;
                cell.innerHTML = n;
                setCellOffset(cell);
                appendCell(cell);
                /* добавляем костяшку в массив */
                tiles.push(cell);
            }
        }       
    }
}

function createCellTile() {
    var cell = document.createElement('div');
    cell.classList.add('field-cell', 'field-cell-tile');
    return cell;
}

function beetween(a, b, t) {
    return a <= t && t <= b || b <= t && t <= a;
}

function tileClick(event) {
    var bar = event.target, i, tile;
    var oldX = bar.x, oldY = bar.y;
    if (bar.y == freeCell.y) {
        for (i = 0; i < tiles.length; i++) {
            tile = tiles[i];
            if (tile.y == bar.y && beetween(bar.x, freeCell.x, tile.x)) {
                if (bar.x < freeCell.x) tile.x += 1;
                else  tile.x -= 1;
                setCellOffset(tile);
            }
        }
        freeCell = {y: oldY, x: oldX};
    }
    else if (bar.x == freeCell.x) {
        for (i = 0; i < tiles.length; i++) {
            tile = tiles[i];
            if (tile.x == bar.x && beetween(bar.y, freeCell.y, tile.y)) {
                if (bar.y < freeCell.y) tile.y += 1;
                else  tile.y -= 1;
                setCellOffset(tile);
            }
        }
        freeCell = {y: oldY, x: oldX};
    }
    /* проверяем собрана ли головоломка */
    if (shuffled) {
        checkVictory();   
    }
}

/* добавляем событие click на костяшки */
function animateTiles() {
    var i = 1;
    for (i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', tileClick);
    }
}

/* перемешиваем костяшки */
function shuffleTiles() {
    var i, index;
    for (i = 0; i < 1000; i++) {
        index = Math.floor(Math.random() * tiles.length);
        tiles[index].click();
    }
    shuffled = true;
}

/* проверяем сборку */
function checkVictory() {
    var i, n;
    for (i = 0; i < tiles.length; i++) {
        n = tiles[i].y * 4 + tiles[i].x + 1;
        if (tiles[i].innerHTML != n) return;
    }
    alert('Вы победили');
}