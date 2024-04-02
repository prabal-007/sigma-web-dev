const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i<6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// let boxes = document.getElementsByClassName('box');
let boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    let color = getRandomColor();
    let bg = getRandomColor();
    box.style.color = color;
    box.style.background = bg;
    box.innerHTML = color;
});