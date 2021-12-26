const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        ctx.font = "30px Arial";

        const drawPaddle = (x, y) => ctx.fillRect(x, y, 20, 100);
        const drawText = (text, x, y) => ctx.fillText(text, x, y);
        const drawCircle = (x, y, r) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
        const clearCanvas = () => context.clearRect(0, 0, canvas.width, canvas.height);

        drawPaddle(770, 100);
        drawPaddle(10, 300);
       
        drawText("5", 300, 50);
        drawText("9", 500, 50);
        
        drawCircle(400, 250, 15);