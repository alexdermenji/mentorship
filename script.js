//1) Необходимо написать функцию возвращающую Promise, который зарезолвится через заданное количество миллисекунд.
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// 2) Необходимо написать функцию возвращающую Promise, который зареджектится через заданное количество миллисекунд. Вторым аргументов функция принимает объект ошибки

function rejectAfterSleep(ms, err) {
  return new Promise((reject) => {
    setTimeout(reject, ms, err);
  });
}

// rejectAfterSleep(2000, "boom!").catch((err) => {
//   console.log(err);
// });

// 3) Необходимо написать функцию, которая принимает объект Promise и некоторое количество миллисекунд и возвращает новый Promise. Если переданный Promise не успевает зарезолвится до истечения этого времени, то результирующий Promise должен быть зареджекчен с ошибкой new Error('Timeout')

function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      promise
        .then((res) => resolve(res))
        .catch(() => {
          reject(new Error("Timeout"));
        });
    }, ms);
  });
}
// timeout(fetch("url"), 2000).then(console.log, console.log);

//4) Необходимо написать функцию, которая идентична Promise.all.

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];
let requests = urls.map((url) => fetch(url));

all(requests).then((result) => console.log(result));

function all(arrayOfPromises) {
  if (arrayOfPromises.length === 0) return arrayOfPromises;

  return new Promise((resolve, reject) => {
    const results = [];
    let counter = 0;

    arrayOfPromises.forEach((promise, index) => {
      promise.then(
        (result) => {
          results[index] = result;
          counter++;
          if (arrayOfPromises.length === counter) resolve(results);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

//5) Необходимо написать функцию, которая идентична Promise.allSettled.

function allSettled(arrayOfPromises) {
  return new Promise((resolve) => {
    const results = [];
    let counter = 0;
    arrayOfPromises.forEach((promise, index) => {
      promise.then(
        (result) => {
          results[index] = { status: "fulfilled", value: result };
          counter++;

          if (counter === arrayOfPromises.length) {
            resolve(results);
          }
        },
        (error) => {
          results[index] = { status: "rejected", reason: error };
          counter++;

          if (counter === arrayOfPromises.length) {
            resolve(results);
          }
        }
      );
    });
  });
}

allSettled(requests).then(
  (result) => console.log(result),
  (err) => console.log(err)
);

//6) Необходимо написать функцию, которая идентична Promise.race.

function race(arrayOfPromises) {
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach((promise) =>
      promise.then((result) => resolve(result)).catch(error)(() =>
        reject(error)
      )
    );
  });
}

//7) Необходимо написать функцию, которая бы добавлял обработчик события на заданный элемент и возвращала Promise. Promise должен зарезолвится при срабатывании события. В качестве значения Promise должен возвращать объект события.

function once(element, domEvent) {
  return new Promise((resolve) => {
    element.addEventListener(domEvent, (e) => {
      resolve(e);
    });
  });
}

const btn = document.getElementById("btn");
once(btn, "click").then((res) => console.log(res));
console.log(btn);

//8) Необходимо написать функцию, которая бы принимала функцию ожидающую callback и возвращала новую функцию. Новая функция вместо callback должна возвращать Promise. Предполагается, что исходная функция принимает callback последним параметром, т. е. если функция принимает другие аргументы, то они идут ДО callback. Сам callback первым параметром принимает объект ошибки или null, а вторым возвращаемое значение (если нет ошибки).

function myPromisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function customCallback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
      args.push(customCallback);
      fn.call(this, args);
    });
  };
}
