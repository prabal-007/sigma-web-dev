function randomNum() {
    let x =  1 + 3*Math.random();
    return x*1000;
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function delayDot(i) {
    if (i < 5 ){
        await delay(1000);
    } else {
        await delay(300);
    }
}

async function main() {
    let one = document.createElement('p');
    one.className = 'one';
    document.body.append(one);
    let two = document.createElement('p');
    document.body.append(two);
    let three = document.createElement('p');
    document.body.append(three);
    let four = document.createElement('p');
    document.body.append(four);
    let five = document.createElement('p');
    document.body.append(five);
    await delay(1000);
    let a = 'Initializing Hacking.';
    for (let i = 0; i<6; i++) {
        one.innerHTML = a;
        a = a + '.';
        await delayDot(i);
    }
    one.innerHTML = a + '✓DONE'; // Checkmark Emoji
    await delay(randomNum(3));
    let b = 'Reading your files';
    for (let i = 0; i<9; i++) {
        two.innerHTML = b;
        b = b + '.';
        await delayDot(i);
    }
    two.innerHTML = b + '✓DONE';
    
    await delay(randomNum(3));
    let c = 'Passowrd files detected...';
    for (let i = 0; i<9; i++) {
        three.innerHTML = c;
        c = c + '.';
        await delayDot(i)
    }
    three.innerHTML = c + '✓DONE';
    
    await delay(randomNum(3));
    let d = 'Sending all password and personal files to server...';
    for (let i = 0; i<7; i++) {
        four.innerHTML = d;
        d = d + '.';
        await delayDot(i)
    }
    four.innerHTML = d + '✓DONE';
    alert("HACKING COMPLETE");

    await delay(randomNum(3));
    let e = 'Cleaning up...';
    for (let i = 0; i<5; i++) {
        five.innerHTML = e;
        e = e + '.';
        await delayDot(i)
    }
    five.innerHTML = e + '✓DONE';
    
}

// console.log(randomNum());
main();