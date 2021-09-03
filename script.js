//1) Необходимо написать функцию возвращающую Promise, который зарезолвится через заданное количество миллисекунд.
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// delay(3000).then(() => alert("выполнилось через 3 секунды"));

// 2) Необходимо написать функцию возвращающую Promise, который зареджектится через заданное количество миллисекунд. Вторым аргументов функция принимает объект ошибки

function rejectAfterSleep(ms, err) {
  return new Promise((reject) => {
    setTimeout(reject, ms, err);
    // setTimeout(() => {
    //   reject(err);
    // }, ms);
  });
}

// rejectAfterSleep(2000, "boom!").catch((err) => {
//   console.log(err);
// });

//Вопрос---->  Как лучше запусать функцию в setTimeout
//Вопрос----> Можно опустить resolve в параметрах Промиса?

// 3) Необходимо написать функцию, которая принимает объект Promise и некоторое количество миллисекунд и возвращает новый Promise. Если переданный Promise не успевает зарезолвится до истечения этого времени, то результирующий Promise должен быть зареджекчен с ошибкой new Error('Timeout')

function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      promise
        .then((res) => resolve(res))
        .catch((err) => {
          reject(new Error("Timeout"));
        });
    }, ms);
  });
}
timeout(fetch("url"), 2000).then(console.log, console.log);
