console.log("by christ-offert");
var ilalao = "";

function starts(param) {
  document.querySelector("#start-game").classList.replace("flex", "hidden");
  document.querySelector("#game").classList.remove("hidden");

  ilalao = new Ankamantatra();
  ilalao.render(param);
}

function ends(param = true) {
  document.querySelector("#start-game").classList.replace("hidden", "flex");
  document.querySelector("#game").classList.add("hidden");
  const messages = document.querySelectorAll(".messages");
  const startBtn = document.querySelectorAll(".start-btn");
  param
    ? messages[0].classList.remove("hidden")
    : messages[1].classList.remove("hidden");
  !param
    ? messages[0].classList.add("hidden")
    : messages[1].classList.add("hidden");
  
  startBtn[0].classList.add("hidden")
  startBtn[1].classList.remove("hidden");
}

class Ankamantatra {
  constructor() {
    this.fanontaniana = document.querySelector("#fanontaniana");
    this.score = 0;
    this.valinys = document.querySelectorAll(".valiny");
    this.arrayVita = [];
  }

  randomOrder(param) {
    return Math.floor(Math.random() * param) + 1;
  }

  displayOne(param) {
    let order = [];
    const data = param;
    const title = data.title;

    this.fanontaniana.innerHTML = title;

    for (let index = 0; index < this.valinys.length; index++) {
      const element = this.valinys[index];

      let orderOne = this.randomOrder(4);
      while (order.includes(`${orderOne}`)) {
        orderOne = this.randomOrder(4);
      }

      const parent = element.parentElement;
      parent.classList.remove("order-1", "order-2", "order-3", "order-4");
      parent.classList.add(`order-${orderOne}`);

      order.push(`${orderOne}`);

      element.innerHTML = data.question[index].text;
      element.setAttribute("data-valiny", data.question[index].answer);
    }
  }

  showQuestion(param) {
    const questionLenght = param.length;
    let current = this.randomOrder(questionLenght);

    while (this.arrayVita.includes(`${current - 1}`)) {
      current = this.randomOrder(questionLenght);
    }
    // console.log(this.arrayVita.includes(current));

    this.displayOne(param[current - 1]);

    this.arrayVita.push(`${current - 1}`);
    // console.log(this.arrayVita);
  }

  submitResponse(param) {
    let res = 0;

    document.querySelector("#game").addEventListener("click", (e) => {
      let tar = e.target;
      if (tar.tagName === "BUTTON") {
        res = tar.getAttribute("data-valiny");
        if (res != 0 && this.arrayVita.length < param.length) {
          this.showQuestion(param);
          this.scores();
        } else if (res == 0) {
          // console.log("faux");
          document.querySelectorAll(".start-btn")[1].classList.remove("hidden");
          ends(true);
        } else if (this.arrayVita.length == param.length) {
          this.scores();
          ends(false);
        }
      }
    });
  }

  scores() {
    this.score++;
    document.querySelector("#score").innerHTML = this.score;
  }

  restartFunc(param) {
    this.arrayVita = [];
    this.score = 0;

    document.querySelector("#score").innerHTML = this.score;

    this.showQuestion(param);
  }

  restart(param) {
    const restartBtn = document.querySelector("#restart-btn");
    restartBtn.addEventListener("click", () => {
      this.restartFunc(param);
    });
    const restartBtn1 = document.querySelectorAll(".start-btn")[1];
    restartBtn1.addEventListener("click", () => {
      document.querySelector("#start-game").classList.replace("flex", "hidden");
      document.querySelector("#game").classList.remove("hidden");
      this.restartFunc(param);
    });
  }

  render(param) {
    this.showQuestion(param);
    this.submitResponse(param);
    this.restart(param);
  }
}
