const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
const randomNumber2 = Math.random();

if(randomNumber > 0.7) {
    alert("GT 7");
}

if((randomNumber > 0.7 && randomNumber2 > 0.7) || (randomNumber < 0.2 || randomNumber2 < 0.2)) {
    alert("Point 4");
}

let arr = [1,2,3,4,5,6,7,8,9,10];
console.log(arr.length);

for (const i of arr){
    console.log(i)
}

for (let i = arr.length-1;i>=0;i--){
    console.log(arr[i]);
}