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

function throwDices(numberDices, times) {
  let time = 0;
  let eachRunResults = [];
  while (time < times) {
  
    let simulation = throwDices(numberDices);
    eachRunResults.push(...simulation);
    time++;
  
  }

  return eachRunResults;
}

function simulate() {
  let diceSide = $("#diceSide").val();
  let toRoll = $("#timesToRoll").val();
  let dices = countDices();
  let result = throwDices(dices, toRoll);
  alert(result);
}

$("#add").click(addDice);
$("#minus").click(deleteDice);
$("#run").click(simulate);
