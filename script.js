let gridLen = prompt('Enter grid length:', 16);
// let gridLen = 16;

let grid = document.getElementById('draw-grid-container');
grid.style.gridTemplateColumns = 'auto '.repeat(gridLen)

for (let i = 0; i < gridLen; i++) {
    let b = document.createElement('div');
    b.classList.add('draw-grid-col');
    grid.appendChild(b);

    for (let j = 0; j < gridLen; j++) {
        let a = document.createElement('div');
        a.classList.add('draw-grid-item');
        a.textContent = gridLen*j + i;
        b.appendChild(a);
    }
}


Array.from(document.getElementsByClassName('draw-grid-item')).forEach(e => {
    e.addEventListener('mouseover', function(){
        this.style.backgroundColor = 'black';
    })
});