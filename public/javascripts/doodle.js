(() => {
    // create a flag
    let isActive = false;

    // array to collect coordinates
    let plots = [];

    const draw = (e) => {
        if(!isActive) return;

        // cross-browser canvas coordinates
        const x = e.offsetX || e.layerX - canvas.offsetLeft;
        const y = e.offsetY || e.layerY - canvas.offsetTop;

        plots.push({x, y});
        drawOnCanvas(plots);
    };

    const drawOnCanvas = (plots) => {
        ctx.beginPath();
        ctx.moveTo(plots[0].x, plots[0].y);
    
        for(let i=1; i<plots.length; i++) {
            ctx.lineTo(plots[i].x, plots[i].y);
        }
        ctx.stroke();
    };

    const startDraw = (e) => {
        isActive = true;
    };
    
    const endDraw = (e) => {
        isActive = false;
    
        // empty the array
        plots = [];
    };

    const clearCanvas = (canvas, ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const url = encodeURI(document.getElementById('url').value);
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    const saveButton = document.getElementById('save-btn');
    const clearButton = document.getElementById('clear-btn');
    const drawButton = document.getElementById('draw-btn');
    const eraseButton = document.getElementById('erase-btn');
    const colorPicker = document.getElementById('color-picker');
    const strokePicker = document.getElementById('stroke-picker');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = '3';

    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('mousemove', draw, false);
    canvas.addEventListener('mouseup', endDraw, false);

    saveButton.addEventListener('click', () => {
        fetch(url, {
            method: 'POST',
            body: canvas.toDataURL()
        }).then((res) => {
            if (res.ok) {
                errorMessage.innerHTML = '';
                successMessage.innerHTML = 'Success!';
                clearCanvas(canvas, ctx);
            } else {
                errorMessage.innerHTML = 'Oh no! Unknown failure.';
                successMessage.innerHTML = '';
            }
        });
    });
    clearButton.addEventListener('click', () => {
        clearCanvas(canvas, ctx);
    });

    colorPicker.addEventListener('change', (e) => {
        ctx.strokeStyle = e.target.value;
    }, false);
    strokePicker.addEventListener('input', (e) => {
        ctx.lineWidth = e.target.value;
    }, false);

    drawButton.addEventListener('click', () => {
        ctx.globalCompositeOperation = 'source-over';
        drawButton.classList.add('active');
        eraseButton.classList.remove('active');
    });
    eraseButton.addEventListener('click', () => {
        ctx.globalCompositeOperation = 'destination-out';
        drawButton.classList.remove('active');
        eraseButton.classList.add('active');
    });
})();