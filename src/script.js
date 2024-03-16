function addDice() {
  let dicesContainer = $("#dices");
  if (dicesContainer.children().length < 33) {
    let dice = Math.ceil(Math.random() * 6);
    dicesContainer.prepend(
      `<img src="./assets/images/dice${dice}.png" class="dice" alt="">`
    );
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

function updateChart(data) {
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

  const myChart = new Chart($("#myChart"), {
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
  });
}

function updateRoll(roll) {}

function SimulateAllDices(numberDices, times) {
  let time = 0;
  let eachRunResults = [];
  while (time < times) {
    $.merge(eachRunResults, throwDices(numberDices));
    // eachRunResults.push(...throwDices(numberDices));
    time++;
  }
  return eachRunResults;
}

function simulate() {
  let diceSide = $("#diceSide").val();
  let toRoll = $("#timesToRoll").val();
  let dices = countDices();
  let result = SimulateAllDices(dices, toRoll);
  updateChart(result);
}

$("#add").click(addDice);
$("#minus").click(deleteDice);
$("#run").click(simulate);
