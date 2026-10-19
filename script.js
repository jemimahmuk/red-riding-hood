// ===== 1. The story data =====
// Same three images (girl, wolf, cottage) in two different orders,
// each with its own captions.
var stories = {
  a: {
    title: "The Warning",
    steps: [
      {
        image: "images/girl.svg",
        alt: "Little Red Riding Hood skipping down a sunny path with a basket while a fluffy gray animal peeks out of a bush",
        label: "Beginning",
        caption: "Little Red Riding Hood skips down the forest path with a basket of treats for Grandma. Mama's rule: stay on the path and never trust strangers. (Wait... is something fluffy watching from the bush?)"
      },
      {
        image: "images/wolf.svg",
        alt: "A cute gray wolf with big golden eyes sitting in a dark forest under the moon",
        label: "Middle",
        caption: "A wolf with big, friendly eyes steps out of the shadows. He seems so nice! Red happily tells him all about Grandma's cottage."
      },
      {
        image: "images/cottage.svg",
        alt: "A cozy cottage with glowing windows and a front door standing open",
        label: "End",
        caption: "Red reaches the cottage and sees the door standing wide open. Something is not right. Lesson: be careful who you trust."
      }
    ]
  },
  b: {
    title: "The Wolf's Side",
    steps: [
      {
        image: "images/wolf.svg",
        alt: "A cute gray wolf with big golden eyes sitting in a dark forest under the moon",
        label: "Beginning",
        caption: "A lonely wolf sits in the dark forest. Everyone runs away from him, but all he really wants is a friend."
      },
      {
        image: "images/cottage.svg",
        alt: "A cozy cottage with glowing windows and a front door standing open",
        label: "Middle",
        caption: "He follows the smell of soup to a cozy cottage. Grandma opens the door, smiles, and says, \"Come in, you must be cold!\""
      },
      {
        image: "images/girl.svg",
        alt: "Little Red Riding Hood skipping down a sunny path with a basket while a fluffy gray animal peeks out of a bush",
        label: "End",
        caption: "Red skips home with an empty basket and a full heart. And that fluffy friend in the bushes? He is just making sure she gets home safely."
      }
    ]
  }
};

// ===== 2. Variables that remember where we are =====
var currentStory = "a";   // "a" or "b"
var currentStep = 0;      // 0 = beginning, 1 = middle, 2 = end

// ===== 3. Grab elements from the page (DOM) =====
var image = document.getElementById("story-image");
var title = document.getElementById("story-title");
var label = document.getElementById("step-label");
var caption = document.getElementById("caption");
var dots = document.querySelectorAll(".dot");
var btnA = document.getElementById("btn-a");
var btnB = document.getElementById("btn-b");
var backButton = document.getElementById("back");
var nextButton = document.getElementById("next");

// ===== 4. Function that updates the whole page =====
function showStep() {
  var step = stories[currentStory].steps[currentStep];

  // Fade the image out, swap it, then fade back in
  image.classList.add("fade");
  setTimeout(function () {
    image.src = step.image;
    image.alt = step.alt;
    image.classList.remove("fade");
  }, 200);

  title.textContent = stories[currentStory].title;
  label.textContent = step.label;
  caption.textContent = step.caption;

  // Highlight the correct dot
  for (var i = 0; i < dots.length; i++) {
    if (i === currentStep) {
      dots[i].classList.add("active");
    } else {
      dots[i].classList.remove("active");
    }
  }

  // Turn buttons on or off at the start and end
  backButton.disabled = (currentStep === 0);
  nextButton.disabled = (currentStep === 2);

  // Change the page mood and the highlighted story button
  document.body.className = "story-" + currentStory;
  if (currentStory === "a") {
    btnA.classList.add("active");
    btnB.classList.remove("active");
  } else {
    btnB.classList.add("active");
    btnA.classList.remove("active");
  }
}

// ===== 5. Functions for moving through the story =====
function goNext() {
  if (currentStep < 2) {
    currentStep = currentStep + 1;
  } else {
    currentStep = 0;   // clicking the last image starts over
  }
  showStep();
}

function goBack() {
  if (currentStep > 0) {
    currentStep = currentStep - 1;
    showStep();
  }
}

function chooseStory(name) {
  currentStory = name;
  currentStep = 0;     // always start at the beginning
  showStep();
}

// ===== 6. Event listeners =====
nextButton.addEventListener("click", goNext);
backButton.addEventListener("click", goBack);
image.addEventListener("click", goNext);

btnA.addEventListener("click", function () { chooseStory("a"); });
btnB.addEventListener("click", function () { chooseStory("b"); });

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") { if (currentStep < 2) { goNext(); } }
  if (event.key === "ArrowLeft") { goBack(); }
});

// ===== 7. Show the first step when the page loads =====
showStep();
