const task3Element = document.getElementById('task-3');

function showAlert() {
    alert('Warning!');
}

function showCustomAlert(message) {
    alert(message);
}

function concatString(str1, str2, str3) {
    return str1 + str2 + str3;
}

showAlert();
showCustomAlert('Custom alert');

task3Element.addEventListener('click', showAlert);

showCustomAlert(concatString('test1 ', 'test2 ', 'test3'))
