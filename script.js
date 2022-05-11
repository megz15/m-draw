let drawColour = 'black';
let isClick = false;
let isRandomColour = false;

let randomColourButton = document.getElementById('random-colour-button');

function setDrawColour(col) {
    stopRandomColouring();
    drawColour = col;
}

function selectErasor() {
    stopRandomColouring();
    drawColour = 'white';
    document.getElementById('colour-picker-input').value='#ffffff';
}

// const randomHsl = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`
function setRandomDrawColour() {
    if (isRandomColour) {
        drawColour = '#' + (Math.random().toString(16) + "000000").substring(2,8)
        document.getElementById('colour-picker-input').value = drawColour;
    }
}

function stopRandomColouring() {
    isRandomColour = false;
    randomColourButton.textContent = 'Random Colours';
}

function selectRandomColourButton() {
    if (randomColourButton.textContent === 'Stop') {
        stopRandomColouring()
    } else {
        isRandomColour = true;
        randomColourButton.textContent = 'Stop';
    }
}

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
                setRandomDrawColour()
                this.style.backgroundColor = drawColour;
            });
            
            a.addEventListener('mouseup', () => isClick = false);

            a.addEventListener('mouseenter', function(){
                if (isClick) {
                    setRandomDrawColour()
                    this.style.backgroundColor = drawColour;
                }
            })

            a.classList.add('draw-grid-item');
            // a.style.width = a.style.height = gridItemSide + 'px';
            // a.textContent = gridLen*j + i;
            b.appendChild(a);
        }
    }
}

drawGrid(16);