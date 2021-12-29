const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        //Constans
        const CANVAS_HEIGHT = canvas.height;
        const CANVAS_WIDTH = canvas.width;

        const BOARD_Y = 50;
        const BOARD_P1_X = 300;
        const BOARD_P2_X = 500;

        const PADDLE_WIDTH = 20;
        const PADDLE_HEIGHT = 100;
        const PADDLE_P1_X = 10;
        const PADDLE_P2_X = 770;
        const PADDLE_START_Y = (CANVAS_HEIGHT - PADDLE_HEIGHT) /2;
        const PADDLE_STEP = 3;

        const BALL_R = 15;
        const BALL_START_X = CANVAS_WIDTH /2;
        const BALL_START_Y = CANVAS_HEIGHT /2;
        const BALL_START_DX = 4.5;
        const BALL_START_DY = 1.5;

        const STATE_CHANGE_INTERVAL = 20;

        const UP_ACTION = "up";
        const DOWN_ACTION = "down";
        const STOP_ACTION = "stop";

        const P1_UP_BUTTON = 'KeyQ';
        const P1_DOWN_BUTTON = 'KeyA';
        const P2_UP_BUTTON = 'KeyP';
        const P2_DOWN_BUTTON = 'KeyL';
        const PAUSE_BUTTON = 'KeyB';
        
        //Utils
        const coerceIn = (value, min, max) => {
            if (value <= min) {
                return min;
            } else if (value >= max) {
                return max;
            } else {
                return value;
            }
        }


        //Drawing functions
        ctx.font = "30px Arial";

        const drawPaddle = (x, y) => ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
        const drawPoints = (text, x) => ctx.fillText(text, x, BOARD_Y);
        const drawCircle = (x, y, r) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
        const drawBall = (x, y) => drawCircle(x, y, BALL_R);
        const clearCanvas = () => context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        //Input
        let p1Action = STOP_ACTION;
        let p2Action = STOP_ACTION;
        let paused = false;

        window.addEventListener('keydown', event => {
            const code = event.code;
            if (code === P1_UP_BUTTON) {
                p1Action = UP_ACTION;
            } else if (code === P1_DOWN_BUTTON) {
                p1Action = DOWN_ACTION;
            } else if (code === P2_UP_BUTTON) {
                p2Action = UP_ACTION;
            } else if (code === P2_DOWN_BUTTON) {
                p2Action = DOWN_ACTION;
            } else if (code === PAUSE_BUTTON) {
                paused = !paused;
            }
        });

        window.addEventListener('keyup', event => {
            let code = event.code;
            if ((code === P1_UP_BUTTON && p1Action === UP_ACTION) || (code === P1_DOWN_BUTTON && p1Action === DOWN_ACTION)) {
                p1Action = STOP_ACTION;
            } else if ((code === P2_UP_BUTTON && p2Action === UP_ACTION) || (code === P2_DOWN_BUTTON && p2Action === DOWN_ACTION)){
                p2Action = STOP_ACTION;
            }
        });
        
        //State
        let ballX = BALL_START_X;
        let ballY = BALL_START_Y;
        let ballDX = BALL_START_DX;
        let ballDY = BALL_START_DY;
        let p1PaddleY = PADDLE_START_Y;
        let p2PaddleY = PADDLE_START_Y;
        let p1Points = 0;
        let p2Points = 0;

        const coercePaddle = (paddleY) => {
            const minPaddleY = 0;
            const maxPaddleY = CANVAS_HEIGHT - PADDLE_HEIGHT;
            return coerceIn(paddleY, minPaddleY, maxPaddleY);
        }

        const drawState = () => {
            clearCanvas();
            drawPoints(p1Points.toString(), BOARD_P1_X);
            drawPoints(p2Points.toString(), BOARD_P2_X);
            drawBall(ballX, ballY);
            drawPaddle(PADDLE_P1_X, p1PaddleY);
            drawPaddle(PADDLE_P2_X, p2PaddleY);
        }

        const movePaddles = () => {
            if (p1Action === UP_ACTION && p2PaddleY >= 0) {
                p1PaddleY = coercePaddle(p1PaddleY - PADDLE_STEP);
            } else if (p1Action === DOWN_ACTION && p1PaddleY + PADDLE_HEIGHT <= CANVAS_HEIGHT) {
                p1PaddleY = coercePaddle(p1PaddleY + PADDLE_STEP);
            }
            if (p2Action === UP_ACTION && p2PaddleY >= 0) {
                p2PaddleY = coercePaddle(p2PaddleY - PADDLE_STEP);
            } else if (p2Action === DOWN_ACTION && p2PaddleY + PADDLE_HEIGHT <= CANVAS_HEIGHT) {
                p2PaddleY = coercePaddle(p2PaddleY + PADDLE_STEP);
            }
        }

        const updateState = () => {
            movePaddles();
        }

        const updateAndDrawState = () => {
            if (paused) return;
            updateState();
            drawState();
        }

        setInterval(updateAndDrawState, STATE_CHANGE_INTERVAL);
