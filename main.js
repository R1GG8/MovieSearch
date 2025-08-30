let container = document.querySelector(".container")
let searchBtn = document.querySelector(".searchBtn")
let input = document.querySelector(".searchInput")
let movieTitle = document.querySelector(".movieTitle")
let moviePoster = document.querySelector(".moviePoster")
let rating = document.querySelector(".rating")
let resultInfo = document.querySelector(".resultInfo")
let runtime = document.querySelector(".runtime")
let year = document.querySelector(".year")


async function getFilm(inputMovieTitle) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=f9e1714f&t=${inputMovieTitle}`)
        if (!response.ok) throw new Error("Ошибка при загрузке")

        const result = await response.json()

        if (result.Response === "False") {
            movieTitle.textContent = "Фильм не найден 😢"
            moviePoster.src = ""
            rating.textContent = "-"
            runtime.textContent = "-"
            year.textContent = "-"
        } else {
            movieTitle.textContent = result.Title
            moviePoster.src = result.Poster
            rating.textContent = result.imdbRating
            runtime.textContent = result.Runtime.replace("min", "")
            year.textContent = result.Year
        }

        resultInfo.classList.add("show")
        container.classList.add("big")  // 📌 расширяем контейнер

    } catch (e) {
        alert(e)
    }
}


// при клике вне контейнера скрываем
document.addEventListener("click", (event) => {
    if (!container.contains(event.target)) {
        resultInfo.classList.remove("show")
        container.classList.remove("big") // 📌 возвращаем маленький размер
    }
})



searchBtn.addEventListener("click", () => {
    if (input.value.trim()) {
        getFilm(input.value.trim())
    }
})


input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        if (input.value.trim()) {
            getFilm(input.value.trim())
        }
    }
})


