const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const displayLesson = (lesson) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";

  for (let element of lesson) {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `
        <button  class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson- ${element.level_no}</button
        `;

    lessonContainer.appendChild(lessonDiv);
  }
};

loadData()