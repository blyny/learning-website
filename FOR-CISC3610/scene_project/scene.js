const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const duck = new Image();
duck.src = 'images/duck-background.jfif';
duck.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(duck, 700, 0, 250, 250);

    ctx.font = '40px Lora';
    ctx.fillStyle = 'black';

    const name = 'Bryan Ly'; 
    ctx.fillText(name, 0, 30); 

    const title = 'Duck Lunch'; 
    ctx.fillText(title, 0, 80); 
}

const bread_crumb = new Image();
bread_crumb.src = 'images/bread-crumb.jfif';
bread_crumb.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bread_crumb, 600, 300, 150, 150); 
}

const crackers = new Image();
crackers.src = 'images/crackers.jfif';
crackers.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(crackers, 800, 300, 200, 150); 
}