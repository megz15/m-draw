let drawColour = 'black';
let isClick = false;
let isRandomColour = false;

let randomColourButton = document.getElementById('random-colour-button');

// https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hsl-to-hex
function HSLToHex(h,s,l){s/=100,l/=100;let c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h/60%2-1)),m=l-c/2,r=0,g=0,b=0;return 0<=h&&h<60?(r=c,g=x,b=0):60<=h&&h<120?(r=x,g=c,b=0):120<=h&&h<180?(r=0,g=c,b=x):180<=h&&h<240?(r=0,g=x,b=c):240<=h&&h<300?(r=x,g=0,b=c):300<=h&&h<360&&(r=c,g=0,b=x),r=Math.round(255*(r+m)).toString(16),g=Math.round(255*(g+m)).toString(16),b=Math.round(255*(b+m)).toString(16),1==r.length&&(r="0"+r),1==g.length&&(g="0"+g),1==b.length&&(b="0"+b),"#"+r+g+b}

function setDrawColour(col) {
    stopRandomColouring();
    drawColour = col;
}

function selectErasor() {
    stopRandomColouring();
    drawColour = 'white';
    document.getElementById('colour-picker-input').value = '#ffffff';
}

function setRandomDrawColour() {
    if (isRandomColour) {
        rnd = Math.random() * 360;
        drawColour = `hsl(${rnd}, 100%, 50%)`
        // drawColour = '#' + Math.floor(Math.random() * 16777215).toString(16); //(Math.random().toString(16) + "000000").substring(2,8)
        document.getElementById('colour-picker-input').value = HSLToHex(rnd, 100, 50);
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
        b.style.height = grid.offsetWidth / gridLen + 'px';
        grid.appendChild(b);

        for (let j = 0; j < gridLen; j++) {
            let a = document.createElement('div');

            a.addEventListener('mousedown', function () {
                isClick = true;
                setRandomDrawColour();
                this.style.backgroundColor = drawColour;
            });

            a.addEventListener('mouseup', () => isClick = false);

            a.addEventListener('mouseenter', function () {
                if (isClick) {
                    setRandomDrawColour();
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

function drawNewGrid(promptTxt) {
    let a = prompt(promptTxt, 16);
    if (a > 100) drawNewGrid('Please enter a number less than 100:');
    else drawGrid(a);
}

drawGrid(16);