const grid = document.querySelectorAll(".container div");
const container = document.querySelector(".container");
const pointer = document.querySelector("span");
const arr1 = [];
const arr2 = [];
count = 0;
const icons = [
  "cat.png",
  "dog.png",
  "fox.png",
  "mushroom.png",
  "pie.png",
  "sunflower.png",
  "yarn-ball.png",
  "umbrella.png",
];

for (let i = 0; i < 100; i++) {
  let roll = Math.floor(Math.random() * 8);
  let exist = arr1.includes(icons[roll]);
  if (!exist) arr1.push(icons[roll]);
}
function countitem(arr, item) {
  arr.forEach((itm) => {
    if (itm == item) count++;
  });
  console.log(count);
}
for (let i = 0; i < 100; i++) {
  let roll = Math.floor(Math.random() * 8);
  let exist = arr2.includes(icons[roll]);
  if (!exist) arr2.push(icons[roll]);
}
const arr = [...arr1, ...arr2];
let newArr;
const getShuffledArr = (arr) => {
  newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  console.log(newArr);
  return newArr;
};
getShuffledArr(arr);

for (let i = 0; i < grid.length; i++) {
  window.addEventListener("load", function (e) {
    grid[i].style.background = `url(${newArr[i]})`;
    grid[i].style.backgroundSize = "contain";
  });
  function preload(e) {
    grid[i].style.background = "url(question-mark.png)";
    grid[i].style.backgroundSize = "contain";
  }
  setTimeout(preload, 3000);
}

let time = 120;
const timer = document.querySelector(".timer");
function start() {
  function gameTime() {
    if (time > 0) {
      time--;
    }

    if (time === 0) {
      time = 0;
      pointer.textContent = "GAME OVER";
    }
    timer.textContent = `"${time}"`;
  }
  setInterval(gameTime, 1000);
}
setTimeout(start, 3000);

let results = [];
let result = ["", ""];
let points = 0;
let clicked = [];
let flipped = false;

for (let i = 0; i < grid.length; i++) {
  container.addEventListener("click", function (e) {
    document.querySelector("audio").play();

    function flipCard1() {
      grid[i].style.background = `url(${newArr[i]})`;
      grid[i].style.backgroundSize = "contain";
      result[0] = newArr[i];
      result[1] = "";
      console.log(result);
      results.push(grid[i]);
    }
    function flipCard2() {
      grid[i].style.background = `url(${newArr[i]})`;
      grid[i].style.backgroundSize = "contain";
      result[1] = newArr[i];
      console.log(result);
      results.push(grid[i]);
    }
    function preload1() {
      results[results.length - 2].style.background = "url(question-mark.png)";
      results[results.length - 2].style.backgroundSize = "contain";
    }
    function preload2() {
      grid[i].style.background = "url(question-mark.png)";
      grid[i].style.backgroundSize = "contain";
      result[0] = "";
      result[1] = "";
      console.log(result);
    }

    if (e.target === grid[i] && results.length % 2 === 0) {
      flipCard1();
      container.addEventListener("dblclick", function (e) {
        if (e.target === grid[i]) {
          preload2();
        }
      });
    } else if (e.target === grid[i] && results.length % 2 === 1) {
      flipCard2();
      if (result[0] === result[1]) {
        points += 2;
        pointer.textContent = points;
        console.log("point");
        if (points === 16) {
          pointer.textContent = "WINNER";
        }
      } else {
        setTimeout(preload2, 1000);
        setTimeout(preload1, 1000);
        console.log(results);
      }
    }
  });
}
