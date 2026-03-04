const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const manageLoading = (status) => {
  if (status == true) {
    document.getElementById("loading-container").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("loading-container").classList.add("hidden");
  }
};

const loadWord = (id) => {
  manageLoading(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWord(data.data));
};

const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center  col-span-full rounded-xl py-10 space-y-6">
        <img class="mx-auto" src="./assets/alert-error.png" />
        <p class="text-xl font-medium text-gray-400">Ai lesson a kono vocabulary add kora hoi ni</p>
        <h2 class="text-4xl font-bold">Move to next lesson</h2>
      </div>
    `;
    // manageLoading(false);
  }
  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word ? word.word : "word paua jai ni"}</h2>
          <p class="font-semibold">Meaning / Pronunciation</p>
          <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "meaning paua jai ni"} / ${word.pronunciation ? word.pronunciation : "pronunciation paua jai ni"}</div>
          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `;

    wordContainer.append(wordDiv);
  });
  manageLoading(false);
};

const displayLesson = (lesson) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";

  for (let element of lesson) {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `
        <button onclick="loadWord(${element.level_no})"  class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson- ${element.level_no}</button
        `;

    lessonContainer.appendChild(lessonDiv);
  }
};

loadData();

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWord = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );

      displayWord(filterWord);
    });
});
