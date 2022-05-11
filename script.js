let drawColour = `hsl(0, 0%, 0%)`;
let isClick = false;
// var brightnessChangeBy = -10;

let isRandomColour = false;
let isChangeBrightness = false;

let randomColourButton = document.getElementById('random-colour-button');

// https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hsl-to-hex
function HSLToHex(h,s,l){s/=100,l/=100;let c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h/60%2-1)),m=l-c/2,r=0,g=0,b=0;return 0<=h&&h<60?(r=c,g=x,b=0):60<=h&&h<120?(r=x,g=c,b=0):120<=h&&h<180?(r=0,g=c,b=x):180<=h&&h<240?(r=0,g=x,b=c):240<=h&&h<300?(r=x,g=0,b=c):300<=h&&h<360&&(r=c,g=0,b=x),r=Math.round(255*(r+m)).toString(16),g=Math.round(255*(g+m)).toString(16),b=Math.round(255*(b+m)).toString(16),1==r.length&&(r="0"+r),1==g.length&&(g="0"+g),1==b.length&&(b="0"+b),"#"+r+g+b}

// https://www.30secondsofcode.org/js/s/rgb-to-hsl
const RGBToHSL=(r,g,b)=>{r/=255,g/=255,b/=255;const l=Math.max(r,g,b),s=l-Math.min(r,g,b),h=s?l===r?(g-b)/s:l===g?2+(b-r)/s:4+(r-g)/s:0;return[60*h<0?60*h+360:60*h,100*(s?l<=.5?s/(2*l-s):s/(2-(2*l-s)):0),100*(2*l-s)/2]};

function setDrawColour(col) {
    isRandomColour = false;
    isChangeBrightness = false;
    drawColour = col;
}

function selectErasor() {
    isRandomColour = false;
    isChangeBrightness = false;
    drawColour = `hsl(0, 0%, 100%)`;
    document.getElementById('colour-picker-input').value = '#ffffff';
}

function setRandomDrawColour() {
    if (isRandomColour) {
        rnd = Math.random() * 360;
        drawColour = `hsl(${rnd}, 100%, 50%)`
        document.getElementById('colour-picker-input').value = HSLToHex(rnd, 100, 50);
    }
}

//https://gist.github.com/p01/1005192?permalink_comment_id=1783655#gistcomment-1783655
const changeCol = (c,n)=>c.map(d=>(d+=n)<0?0:d>255?255:d|0)

function changeBrightnessText(v) {
    let a = document.getElementById('change-brightness-button')
    if (v<0) a.textContent = 'Darken';
    else if (v == 0) a.textContent = 'No change';
    else a.textContent = 'Lighten'; 
}

function changeBrightness(col) {
    if (isChangeBrightness) {
        brightnessChangeBy = document.getElementById("change-brightness-value").value;
        hslCol = RGBToHSL(...col);
        hslCol[2] += parseInt(brightnessChangeBy);
        drawColour = `hsl(${hslCol[0]}, ${hslCol[1]}%, ${hslCol[2]}%)`;
        document.getElementById('colour-picker-input').value = HSLToHex(hslCol[0], hslCol[1], hslCol[2]);
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
                changeBrightness(this.style.backgroundColor.slice(4, -1).split(', '));
                this.style.backgroundColor = drawColour;
            });

            a.addEventListener('mouseup', () => isClick = false);

            a.addEventListener('mouseenter', function () {
                if (isClick) {
                    setRandomDrawColour();
                    changeBrightness(this.style.backgroundColor.slice(4, -1).split(', '));
                    this.style.backgroundColor = drawColour;
                }
            })

            a.classList.add('draw-grid-item');
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