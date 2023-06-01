var audio = new Audio('static/connect.wav');
let picture = new Image();
picture.src = 'static/sinulog.jpg';
picture.onload = () => {
  const puzzle_canvas = new headbreaker.Canvas('puzzle_canvas', {
    width: 800, height: 640,
    pieceSize: 100, proximity: 20,
    strokeWidth: 10, strokeColor: '#F0F0F0',
    image: picture, fixed: true,
    outline: new headbreaker.outline.Rounded(),
    preventOffstageDrag: true,  borderFill: 8
  });

  puzzle_canvas.adjustImagesToPuzzleHeight();
  puzzle_canvas.autogenerate({
    //horizontalPiecesCount: 7,
    verticalPiecesCount: 4,
    insertsGenerator: headbreaker.generators.flipflop
  });

  puzzle_canvas.shuffle(0.6);
  puzzle_canvas.attachSolvedValidator();
  puzzle_canvas.draw();

  
  puzzle_canvas.onConnect((_piece, figure, _target, targetFigure) => {
    // play sound
    audio.play();

    // paint borders on click
    // of conecting and conected figures
    figure.shape.stroke('yellow');
    targetFigure.shape.stroke('yellow');
    puzzle_canvas.redraw();

    setTimeout(() => {
      // restore border colors
      // later
      figure.shape.stroke('#F0F0F0');
      targetFigure.shape.stroke('#F0F0F0');
      puzzle_canvas.redraw();
    }, 200);
  });

  puzzle_canvas.onDisconnect((it) => {
    audio.play();
  });

  puzzle_canvas.registerKeyboardGestures();
  //registerButtons('keyboard', puzzle_canvas);

  document.getElementById("solve-button").onclick = ()=>complete();
  document.getElementById("retry-button").onclick = ()=>puzzle_canvas.shuffle(0.6);
  puzzle_canvas.onValid((validator) => complete())

  let complete = () => {
    puzzle_canvas.solve();
    puzzle_canvas.redraw();
    console.log("finish");
  }
}  