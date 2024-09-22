//displaying different sections

const links = document.querySelectorAll(".navigation__link");
const pages = document.querySelectorAll(".page");
const aside = document.querySelector("aside");

//Carousel
let currentIndex = 0;
const carouselItems = document.querySelectorAll(".aside__carousel-item");
const prevButton = document.querySelector(".aside__carousel-button.prev");
const nextButton = document.querySelector(".aside__carousel-button.next");
const locationDisplay = document.getElementById("location");
const mainLocation = document.getElementById("main-location");
const mainDate = document.getElementById("main-date");

//handles the display of each content

const showPage = (pageId) => {
  pages.forEach((page) => {
    if (page.id === pageId) {
      page.style.display = page.classList.contains("weather")
        ? "grid"
        : "block";
      aside.style.display = page.classList.contains("weather")
        ? "block"
        : "none";
    } else {
      page.style.display = "none";
    }
  });
  //handles "url"
  history.pushState({ pageId }, "", `${window.location.pathname}#${pageId}`);
};

//handles the selection of our different nav links getting the data-page attribute and pushing it to our display function
links.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const pageId = item.getAttribute("data-page");
    showPage(pageId);
  });
});

//allows for dynamic navigation makes it so we dont neet to refresh page
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.pageId) {
    showPage(event.state.pageId);
  }
});

//initalizes our page to start off as weather
const initialize = () => {
  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    showPage(hash);
  } else {
    showPage("weather");
  }
};

//Footer

//handles displaying footer elements
document.addEventListener("DOMContentLoaded", () => {
  const footerBoxes = document.querySelectorAll(".footer__box");

  footerBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      if (window.innerWidth < 624) {
        const links = box.querySelector(".footer__link");
        links.classList.toggle("display");
      }
    });
  });
});

//removes class if a resize occurs
window.addEventListener("resize", () => {
  if (window.innerWidth >= 624) {
    const links = document.querySelectorAll(".footer__link");
    links.forEach((link) => {
      link.classList.remove("display");
    });
  }
});

// carousel

const locations = [
  { name: "Brooklyn, New York, US", 
    date: "Saturday,January 4th" },
  {
    name: "Sydney, Australia",
    date: "Saturday, January 5th",
  },
  {
    name: "Rio de Janeiro, Brazil",
    date: "Friday, January 5th",
  },
];

//handles updating our carousel depending on the current index it toggles the class
const updateCarousel = () => {
  carouselItems.forEach((item, index) => {
    const isActive = index === currentIndex;
    item.classList.toggle("active", isActive);
    // set aria-selected to true if the item is active
    item.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  //manipulates the textContent of various elements depdending on current index
  locationDisplay.textContent = locations[currentIndex].name;
  mainLocation.textContent = locations[currentIndex].name;
  mainDate.textContent = `(${locations[currentIndex].date})`;
};

//handles our buttons and depending on which one is used it adds or subs on current index
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1) % locations.length;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % locations.length;
  updateCarousel();
});

//languages

const languages = [
  {
    language: "en",
    text: `Get accurate, real-time weather updates with our easy-to-use app! Plan your day with personalized forecasts and instant alerts so you' re never caught off guard. Download now and stayahead of the weather!`,
  },
  {
    language: "es",
    text: `Obtenga actualizaciones meteorológicas precisas y en tiempo real con nuestro fácil de usar aplicación! Planifica tu día con previsiones personalizadas y instantáneas. alertas para que nunca te tomen desprevenido. Descárgalo ahora y quédate ¡adelante del clima!`,
  },
  {
    language: "jp",
    text: `使いやすいツールで正確なリアルタイムの天気情報を入手アプリ！パーソナライズされた天気予報とインスタント機能で 1 日の計画を立てましょうアラートが表示されるので、不意を突かれることはありません。今すぐダウンロードしてそのままお使いください天気よりも先に！`,
  },
];

const langaugeItem = document.getElementById("language");
const languageButton = document.querySelector(".download__language");
let languageIndex = 0;

//handles the change in textContent according to languageIndex we also initalize as 0 when dom is loaded
const switchLanguage = () => {
  langaugeItem.textContent = languages[languageIndex].text;
  langaugeItem.lang = languages[languageIndex].language;
};

//handles button click
languageButton.addEventListener("click", () => {
  languageIndex = (languageIndex + 1) % languages.length;

  switchLanguage();
});

updateCarousel();
switchLanguage();
initialize();
