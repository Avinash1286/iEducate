burger=document.querySelector('.burger');
navList=document.querySelector('.nav-list');
navRight=document.querySelector('.rightNav');
navrbar=document.querySelector('.navbar');

burger.addEventListener('click', ()=>{
     navrbar.classList.toggle('h-nav')
     navRight.classList.toggle('v-class')
     navList.classList.toggle('v-class')
})