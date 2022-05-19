let arr1 = [2, 4, 6, 8, 10];

console.log(
    arr1.filter((el) => {
        return el > 5;
    })
);
console.log(
    arr1.map((el) => {
        return { num: el };
    })
);
console.log(
    arr1.reduce((a, b) => {
        return a * b;
    }, 1)
);

console.log(findMax(...arr1));

let [min, max] = findMaxMin(...arr1);
console.log(min, max);

function findMax(...arguments) {
    let max = arguments[0];
    for (el of arguments) {
        if (el > max) {
            max = el;
        }
    }
    return max;
}

function findMaxMin(...arguments) {
    let max = arguments[0];
    let min = arguments[0];
    for (el of arguments) {
        if (el > max) {
            max = el;
        } else if (el < min) {
            min = el;
        }
    }
    return [min, max];
}

let list = new Set([1, 2, 4, 5]);
console.log(list);
list.add(1);
list.add(7);
console.log(list);
