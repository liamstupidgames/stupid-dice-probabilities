function addDice() {
  let dicesContainer = $("#dices");
  if (dicesContainer.children().length < 32) {
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

$("#add").click(addDice);
$("#minus").click(deleteDice);
