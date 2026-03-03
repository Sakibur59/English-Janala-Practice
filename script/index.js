const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadWord = (id) =>{
  const url = `https://openapi.programming-hero.com/api/level/${id}`
  fetch(url)
  .then(res => res.json())
  .then((data)=>displayWord(data.data))
  
}

const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML=""

   words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word}</h2>
          <p class="font-semibold">Meaning / Pronunciation</p>
          <div class="text-2xl font-medium font-bangla">${word.meaning} / ${word.pronunciation}</div>
          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `;

    wordContainer.append(wordDiv);
   })
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

loadData()