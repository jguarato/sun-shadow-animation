const slider = document.querySelector('#sliderRange');

slider.oninput = function() {
  moveSun(this.value);
  changeShadow(this.value);
  changeSkyColor(this.value);
}

function moveSun(sunAngle) {
  const sun = document.querySelector('#sun');
  sun.style.transform = `rotate(${sunAngle}deg)`;
}

function changeShadow(sunAngle) {
  
  const fixedTransform = 'translatey(-6.2vh) rotatex(75deg) rotatez(180deg)';
   
  const skewAngle = Math.abs(sunAngle) > 30 ? 
      - sunAngle + (Math.sign(sunAngle) * 30) : - sunAngle / 2;
  const skewAngleRad = skewAngle * Math.PI / 180;
  
  const tree = document.querySelector('#tree');
  const treeTop = tree.getBoundingClientRect().top;
  const treeBottom = tree.getBoundingClientRect().bottom;
  const treeMidHeight = (treeTop - treeBottom) / 2;

  let translatePos = treeMidHeight * Math.tan(skewAngleRad);
  translatePos *= 0.93;
  
  const shadow = document.querySelector('#shadow');
  shadow.style.transform = fixedTransform +
    ` translatex(${translatePos}px)` +
    ` skew(${skewAngle}deg, 0deg)`;
  
}

function changeSkyColor(sunAngle) {
  
  const background = document.querySelector('.background');
  const sky = document.querySelector('.sky');
  
  let blueSunrise = 100 * (1 + sunAngle / 180) + 30;
  let blueSunset = 100 * (1 - sunAngle / 180) + 30;

  if (sunAngle > 0) {
    background.style.background = `black`;
    sky.style.background = `linear-gradient(180deg, rgba(63,166,215,${blueSunset / 100}) ${blueSunset}%, rgba(253,132,58,1) 100%)`;
  } else {
    background.style.background = `white`;
    sky.style.background = `linear-gradient(180deg, rgba(63,166,215,${blueSunrise / 100}) ${blueSunrise}%, rgba(255,235,169,1) 100%)`;
  }
  
}