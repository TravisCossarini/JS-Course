const button = document.querySelector('button');
const output = document.querySelector('p');

const setTimer = (duration) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, duration);
    });
    return promise;
};

const getPosition = () => {
    const promise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
    return promise;
};

async function trackUserHandler() {
    try {
        const posData = await getPosition();
        const timerData = await setTimer(2000);
        console.log(timerData, posData);
    } catch (error) {
        console.log(error);
    }

    // .then((posData) => {
    //     positionData = posData;
    //     return setTimer(2000);
    // })
    // .catch((err) => {
    //     console.log(err);
    //     return 'on we go';
    // })
    // .then((data) => {
    //     console.log(data, positionData);
    // });

    // navigator.geolocation.getCurrentPosition(
    //     (posData) => {
    //         setTimer(2000).then((data) => {
    //             console.log(data, posData);
    //         });
    //     },
    //     (error) => {
    //         console.log(error);
    //     }
    // );
}

button.addEventListener('click', trackUserHandler);

let result = 0;

for (let i = 0; i < 100000000; i++) {
    result += i;
}

console.log(result);
