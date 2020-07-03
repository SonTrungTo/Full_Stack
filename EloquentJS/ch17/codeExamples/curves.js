cx = document.querySelector("#canvas4").getContext("2d");
// first image
cx.beginPath();

cx.moveTo(10, 90);
cx.quadraticCurveTo(50, 10, 50, 90);
cx.lineTo(50, 10);

cx.closePath();
cx.stroke();
// second image
cx.beginPath();

cx.moveTo(70, 90);
cx.bezierCurveTo(70, 10, 150, 10, 100, 90);
cx.lineTo(150, 10);
cx.lineTo(70, 10);

cx.closePath();
cx.stroke();
// third image
cx.beginPath();

cx.arc(180, 90, 40, 0, 11);
cx.arc(260, 90, 40, 0, 0.5 * Math.PI);

cx.stroke();
