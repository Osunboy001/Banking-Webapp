

// function applyBgOnScreen(query, color, othercolor) {
//   const mq = window.matchMedia(query);

//   function update() {
//     if (mq.matches) {
//         as.forEach(a => {
//               a.style.color = othercolor;
//       });

//       navLink.style.backgroundColor = color;

      
//     } else {
//       document.body.style.backgroundColor = "";
//     }
//   }

//   update();
//   mq.addEventListener("change", update);
// }


// let darkmode = localStorage.getItem('darkmode');

// const themeSwitch = document.querySelector('.themeSwitch');
// const lastSvg = themeSwitch.querySelector("svg:last-of-type");
// const firstSvg = themeSwitch.querySelector("svg:first-of-type");





// const enableDarkmode = () => {
//      applyBgOnScreen("(max-width: 900px)", "white", "black" );
//   lastSvg.style.display = "block";
//   firstSvg.style.display = "none"
//   document.body.classList.add('darkmode');
//   localStorage.setItem('darkmode', 'active');
// };

// const disableDarkmode = () => {
//       // APPLy FUNCTION
// applyBgOnScreen( "(max-width:900px)", "black", "white")
 
//    firstSvg.style.display = "block";
// lastSvg.style.display = "none"
//   document.body.classList.remove('darkmode');
//   localStorage.removeItem('darkmode');
  
// firstSvg.style.display = "inline-block";
// };

// if (darkmode === 'active') {
  
//   enableDarkmode();
// }
// else  {
  
//   disableDarkmode()
// }




// themeSwitch.addEventListener('click', () => {
//   console.log('darkmode click')
//   darkmode = localStorage.getItem('darkmode');
//   darkmode === 'active' ? disableDarkmode() : enableDarkmode();
// });





















let darkmode = localStorage.getItem('darkmode');

function applyTheme() {
  document.body.classList.toggle('darkmode', darkmode === 'active');
}
applyTheme();

const themeSwitch = document.querySelector('.themeSwitch');
if (themeSwitch) {
  const lastSvg = themeSwitch.querySelector("svg:last-of-type");
  const firstSvg = themeSwitch.querySelector("svg:first-of-type");

  function syncIcons() {
    lastSvg.style.display = darkmode === 'active' ? "block" : "none";
    firstSvg.style.display = darkmode === 'active' ? "none" : "block";
  }
  syncIcons();

themeSwitch.addEventListener('click', () => {
  if (darkmode === 'active') {
    darkmode = null;
  } else {
    darkmode = 'active';
  }

  if (darkmode) {
    localStorage.setItem('darkmode', 'active');
  } else {
    localStorage.removeItem('darkmode');
  }



  applyTheme();
  syncIcons();
});
}


