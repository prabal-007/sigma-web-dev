let adjectives = {
    0: "Crazy",
    1: "Amazing",
    2: "Fire"
}

let shop_name = {
    0: "Engine",
    1: "Foods",
    2: "Garments"
}

let another = {
    0: "Bros",
    1: "Limited",
    2: "Hub",
}

function getNum() {
    let nam = Math.floor((Math.random()*10) % 3);
    return nam;
}

let new_name = `New name is ${adjectives[getNum()]} ${shop_name[getNum()]} ${another[getNum()]}`;

console.log(new_name);