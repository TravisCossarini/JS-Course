const sayHello = (name = 'stranger', phrase = 'Hi ') => {
    console.log(phrase + name);
};

function checkInput(cb, ...inputs) {
    if (inputs.length <= 0) {
        cb();
    }
    for (el of inputs) {
        console.log(el);
    }
}

checkInput(sayHello, 'test1', 'test1', 'test1', 'test1', 'test1');
checkInput(sayHello);
