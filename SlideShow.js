// Debounce
function debounce(func, delay) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  };
}

const SlideShow = (function() {
  const slider = document.getElementsByClassName('slideShow__container')[0];
  const slide = document.getElementsByClassName('slideShow__slide');
  const nextButton = document.getElementsByClassName('slideShow__next')[0];
  const prevButton = document.getElementsByClassName('slideShow__prev')[0];
  const SplitText = null; // Assign the correct value for SplitText
  let slideAmount = 0;
  let sliderWidth = 0;
  let title = null; // Assign the correct value for title
  let clickCounter = 0;
  let slideCounter = 0;
  let isAnimating = false; // Track animation state

  const init = function() {
    slideAmount = slide.length;

    eventHandlers();
    resize(); // Perform initial resize
    navButtons();
    animateSlideIn(slideCounter);
  };

  const eventHandlers = function() {
    nextButton.addEventListener('click', slideNext, false);
    prevButton.addEventListener('click', slidePrev, false);
    window.addEventListener('resize', resize, false);
  };

  const navButtons = function() {
    if (clickCounter === 0) {
      prevButton.classList.add('is-inactive');
    } else {
      prevButton.classList.remove('is-inactive');
    }
  };

  const slideNext = function() {
    if (isAnimating) return; // Exit if animation is in progress
    clickCounter++;
    slideCounter = clickCounter - 1;
    if (clickCounter >= slideAmount) {
      clickCounter = 0;
      slideCounter = slideAmount - 1;
    }
    isAnimating = true; // Set animation state to true
    const tl = new TimelineLite({
      onComplete: function() {
        isAnimating = false; // Set animation state to false after animation completes
      }
    });
    tl
      .add(animateSlideOut(slideCounter))
      .to(slider, 0.9, { x: -clickCounter * sliderWidth, ease: Power2.easeOut })
      .add(animateSlideIn(clickCounter));
    navButtons();
  };

  const slidePrev = function() {
    if (isAnimating) return; // Exit if animation is in progress
    if (clickCounter > 0) {
      clickCounter--;
      isAnimating = true; // Set animation state to true
      const tl = new TimelineLite({
        onComplete: function() {
          isAnimating = false; // Set animation state to false after animation completes
        }
      });
      tl
        .add(animateSlideOut(clickCounter + 1))
        .to(slider, 0.9, { x: '+=' + sliderWidth, ease: Power2.easeOut }, '-=0.2')
        .add(animateSlideIn(clickCounter));
    }
    navButtons();
  };

  const animateSlideIn = function(index) {
    const currentSlide = slide[index];
    const image = currentSlide.children[0];

    const splitTitle = new SplitText(title);
    const revertTitle = function() {
      splitTitle.revert();
    };

    TweenLite.set(title, { perspective: 400 });

    const tl = new TimelineLite({ onComplete: revertTitle });
    tl
      .to(image, 0.4, { scale: 1, ease: Power2.easeOut }, '-=0.6');
    return tl;
  };

  const animateSlideOut = function(index) {
    const currentSlide = slide[index];
    const image = currentSlide.children[0];

    const tl = new TimelineLite();
    tl
      .to(image, 0.4, { scale: 1, ease: Power2.easeIn }, '-=0.3');
    return tl;
  };

  const resize = debounce(function() {
    sliderWidth = parseInt(getComputedStyle(slider).width);
    const sliderOffset = sliderWidth * clickCounter;
    slider.style.transform = `matrix(1, 0, 0, 1, -${sliderOffset}, 0)`;
  }, 50);

  return {
    init: init
  };
})();

SlideShow.init();