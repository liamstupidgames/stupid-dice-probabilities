function addDice() {
  let dicesContainer = $("#dices");
  if (dicesContainer.children().length < 33) {
    let dice = Math.ceil(Math.random() * 6);
    dicesContainer.prepend(
      `<img src="./assets/images/dice${dice}.png" class="dice" alt="">`
    );
  }
}

function addAllDices() {
  for (let dice = 0; dice < 33; dice++) {
    addDice();
  }
}

function clearAllDices() {
  for (let dice = 0; dice < 33; dice++) {
    deleteDice();
  }
}

function deleteDice() {
  let dicesContainer = $("#dices");
  if (dicesContainer.children().length > 3) {
    $(".dice").first().remove();
  }
}

function countDices() {
  return parseInt($("#dices").children().length - 2);
}

function throwDices(n) {
  let results = [];
  for (let added = 0; added < n; added++) {
    let diceSideResult = Math.ceil(Math.random() * 6);
    results.push(diceSideResult);
  }
  return results;
}

function transformData(data) {
  return {
    one: data.filter((dice) => dice === 1).length,
    two: data.filter((dice) => dice === 2).length,
    three: data.filter((dice) => dice === 3).length,
    four: data.filter((dice) => dice === 4).length,
    five: data.filter((dice) => dice === 5).length,
    seven: data.filter((dice) => dice === 6).length,
  };
}

function updateBarChart(data) {
  let filteredData = transformData(data);
  const barColors = ["red", "green", "blue", "orange", "brown", "yellow"];
  const labels = ["1", "2", "3", "4", "5", "6"];
  const plotData = [
    filteredData.one,
    filteredData.two,
    filteredData.three,
    filteredData.four,
    filteredData.five,
    filteredData.seven,
  ];

  let barChart = new Chart($("#barChart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: barColors,
          data: plotData,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Total results after execution",
      },
    },
  });
}

function createArrayOfN(n) {
  let array = [];
  for (let i = 1; i <= n; i++) {
    array.push(i);
  }
  return array;
}

function updateProbChart(probData, dice, times) {
  const labels = createArrayOfN(times);

  let probabilityChart = new Chart($("#probChart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          data: probData,
          borderColor: ["#ffffff"],
          fill: true,
          backgroundColor: "#272A43",
          pointBackgroundColor: "#blue",
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: `Probability of getting a ${dice} by Roll`,
      },
    },
  });
}

function getProbability(results, dice) {
  let presentDice = results.filter((wantedDice) => wantedDice === dice).length;
  return presentDice / results.length;
}

function SimulateAllDices(numberDices, times, dice) {
  let time = 0;
  let allResults = [];
  let probabilities = [];
  while (time < times) {
    $.merge(allResults, throwDices(numberDices));

    probabilities.push(getProbability(allResults, dice));

    time++;
  }
  return [allResults, probabilities];
}

function clearGraphs() {
  let barChart = undefined;
  let probabilityChart = undefined;
}

function getUserDice(){
  let userDice = parseInt($("#diceSide").val());

  if (userDice > 0 && userDice < 7) {
    return userDice;
  } else {
    alert("Dices only have 6 sides, from 1 to 6");
  }
}

function simulate() {
  clearGraphs();
  let diceSide = getUserDice();
  let toRoll = parseInt($("#timesToRoll").val());
  let dices = countDices();
  let [result, probabilities] = SimulateAllDices(dices, toRoll, diceSide);
  updateBarChart(result);
  updateProbChart(probabilities, diceSide, toRoll);
}

Chart.defaults.global.defaultFontColor = "#fff";
$("#add").click(addDice);
$("#minus").click(deleteDice);
$("#allDices").click(addAllDices);
$("#clearDices").click(clearAllDices);
$("#run").click(simulate);
