class paint {
  constructor() {
    this.canvas = document.getElementById("board");
    // this.saveCanvas = document.getElementById("save-canvas");
    console.log(this.saveCanvas);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.drawBackgroundd();
    this.color = "black";
    this.tool = "pen";
    this.lineWidth = 5;
    this.setColor = document.getElementById("setColor");
    this.currentPos = {
      X: 0,
      Y: 0,
    };
    this.startPos = {
      X: 0,
      Y: 0,
    };
    this.drawing - false;
    this.oldImage = null;
    this.image = new Image();
    this.image.src = this.canvas.toDataURL("image", 1.0);

    this.allEvent();
  }
  getMousePos(evt) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      X: evt.clientX - rect.left,
      Y: evt.clientY - rect.top,
    };
  }
  mousedown(event) {
    this.oldImage = new Image();
    this.oldImage.src = this.canvas.toDataURL("image", 1.0);

    let mousePos = this.getMousePos(event);
    this.startPos = this.getMousePos(event);
    this.drawing = true;
  }
  mousemove(event) {
    let mousePos = this.getMousePos(event);
    if (this.drawing) {
      switch (this.tool) {
        case "pen":
          this.drawLine(this.currentPos, mousePos);
          break;
        case "line":
          this.clear();
          this.drawLine(this.startPos, mousePos);
          break;
        case "rect":
          this.clear();
          this.drawRect(this.startPos, mousePos);
          break;
        case "circle":
          this.clear();
          this.drawCircle(this.startPos, mousePos);
          break;
      }
    }
    this.currentPos = mousePos;
  }
  mouseup(event) {
    this.drawing = false;
    this.image.src = this.canvas.toDataURL("image", 1.0);
  }

  allEvent() {
    this.canvas.addEventListener("mousedown", (event) => this.mousedown(event));
    this.canvas.addEventListener("mousemove", (event) => this.mousemove(event));
    this.canvas.addEventListener("mouseup", (event) => this.mouseup(event));
  }
  clear() {
    this.ctx.drawImage(
      this.oldImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawBackgroundd() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawRect(startPos, endPos) {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.rect(
      startPos.X,
      startPos.Y,
      endPos.X - startPos.X,
      endPos.Y - startPos.Y
    );
    this.ctx.stroke();
  }
  drawCircle(startPos, endPos) {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(
      startPos.X,
      startPos.Y,
      Math.abs(endPos.X + endPos.Y - (startPos.X + startPos.Y)),
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
  }

  drawLine(startPos, endPos) {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(startPos.X, startPos.Y);
    this.ctx.lineTo(endPos.X, endPos.Y);
    this.ctx.stroke();
  }
}

let palitra = new paint();
let setColor = this.setColor;
console.log("color", setColor);

function changeColor(color) {
  palitra.color = color;
  this.setColor.style.backgroundColor = color;
}
function eraser() {
  palitra.color = "white";
  palitra.tool = "pen";
  palitra.lineWidth = 15;
}
function changeLineWidth(lineWidth) {
  palitra.lineWidth = lineWidth;
}
function setTool(tool) {
  palitra.tool = tool;
  if (palitra.color === "white") {
    palitra.color = "black";
  }
}

function reset() {
  window.location.reload();
}

const saveCanvas = document.getElementById("save-canvas");
canvas = document.getElementById("board");
function downloadCanvas(link, canvas, filename) {
  link.href = canvas.toDataURL();
  link.download = filename;
}
saveCanvas.addEventListener(
  "click",
  function () {
    downloadCanvas(this, canvas, "paint.png");
  },
  false
);
