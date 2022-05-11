let drawColour = 'black';
// let gridItemSide = 20;
let isClick = false;
// let gridLen = prompt('Enter grid length:', 16);
// let gridLen = 16;

setDrawColour = (col) => drawColour = col;

addEventListener('mousedown', () => isClick = true);
addEventListener('mouseup', () => isClick = false);

function drawGrid(gridLen) {
    let grid = document.getElementById('draw-grid-container');

    grid.innerHTML = '' //clear previous grid

    grid.style.gridTemplateColumns = 'auto '.repeat(gridLen)

    for (let i = 0; i < gridLen; i++) {
        let b = document.createElement('div');
        b.classList.add('draw-grid-col');
        grid.appendChild(b);

        for (let j = 0; j < gridLen; j++) {
            let a = document.createElement('div');

            a.addEventListener('mousedown', function() {
                isClick = true;
                this.style.backgroundColor = drawColour;
            });
            
            a.addEventListener('mouseup', () => isClick = false);

            a.addEventListener('mouseenter', function(){
                if (isClick) this.style.backgroundColor = drawColour;
            })

            a.classList.add('draw-grid-item');
            // a.style.width = a.style.height = gridItemSide + 'px';
            a.textContent = gridLen*j + i;
            b.appendChild(a);
        }
    }
}

drawGrid(16);