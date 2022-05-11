let drawColour = 'black';
let isClick = false;
// let gridLen = prompt('Enter grid length:', 16);
let gridLen = 16;

addEventListener('mousedown', () => isClick = true);
addEventListener('mouseup', () => isClick = false);

let grid = document.getElementById('draw-grid-container');
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
        a.textContent = gridLen*j + i;
        b.appendChild(a);
    }
}