function factorialWithFor(num) {
    let fac = 1;
    for (let i=num; i > 0; i--) {
        fac = fac*i;
    }
    return fac;
}

function factorialWithReduce(arr) {
    let x = (a, b) => {
        return a*b;
    }
    return arr.reduce(x);
}


let arr = [1,2,3,4,5,6];

console.log(factorialWithFor(6));
console.log(factorialWithReduce(arr));
