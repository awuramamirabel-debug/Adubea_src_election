

const form = document.getElementById("votingForm");

const studentId = document.getElementById("studentId");

const message = document.getElementById("message");

const totalVotesDisplay = document.getElementById("totalVotes");

const resultsList = document.getElementById("resultsList");

const candidates = [

  "Candidate A",

  "Candidate B",

  "Candidate C"

];

const STORAGE_KEY = "adubiaSRCElectionDemo2026";

let electionData;

try {

  electionData = JSON.parse(

    localStorage.getItem(STORAGE_KEY)

  );

} catch (error) {

  electionData = null;

}

if (

  !electionData ||

  !electionData.votes ||

  !electionData.votedIds

) {

  electionData = {

    votes: {

      "Candidate A": 0,

      "Candidate B": 0,

      "Candidate C": 0

    },

    votedIds: []

  };

}

function saveElectionData() {

  try {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(electionData)

    );

    return true;

  } catch (error) {

    message.textContent =

      "Storage is unavailable. Please try another browser.";

    message.style.color = "#dc2626";

    return false;

  }

}

function updateResults() {

  resultsList.innerHTML = "";

  const total = candidates.reduce(

    (sum, candidate) =>

      sum + (Number(electionData.votes[candidate]) || 0),

    0

  );

  totalVotesDisplay.textContent =

    "Total demonstration votes: " + total;

  candidates.forEach(function (candidate) {

    const count =

      Number(electionData.votes[candidate]) || 0;

    const percentage = total > 0

      ? (count / total) * 100

      : 0;

    const row = document.createElement("div");

    row.className = "result-row";

    const title = document.createElement("p");

    title.textContent =

      candidate + ": " + count + " vote(s) (" +

      percentage.toFixed(0) + "%)";

    const bar = document.createElement("div");

    bar.className = "result-bar";

    const fill = document.createElement("div");

    fill.className = "result-fill";

    fill.style.width = percentage + "%";

    bar.appendChild(fill);

    row.appendChild(title);

    row.appendChild(bar);

    resultsList.appendChild(row);

  });

}

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const id = studentId.value.trim().toUpperCase();

  const selected = document.querySelector(

    'input[name="president"]:checked'

  );

  if (!id) {

    message.textContent = "Please enter your Student ID.";

    message.style.color = "#dc2626";

    studentId.focus();

    return;

  }

  if (!selected) {

    message.textContent = "Please select a candidate.";

    message.style.color = "#dc2626";

    return;

  }

  if (!candidates.includes(selected.value)) {

    message.textContent = "Invalid candidate selection.";

    message.style.color = "#dc2626";

    return;

  }

  if (electionData.votedIds.includes(id)) {

    message.textContent =

      "This Student ID has already voted in this demo.";

    message.style.color = "#dc2626";

    return;

  }

  electionData.votes[selected.value] =

    (Number(electionData.votes[selected.value]) || 0) + 1;

  electionData.votedIds.push(id);

  if (!saveElectionData()) {

    electionData.votes[selected.value]--;

    electionData.votedIds.pop();

    return;

  }

  message.textContent =

    "Vote recorded successfully for " + selected.value + "!";

  message.style.color = "#047857";

  form.reset();

  updateResults();

});

updateResults();
