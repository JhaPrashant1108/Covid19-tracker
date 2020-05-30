const hamburger = document.querySelector(".hamburger");
const line = document.querySelectorAll(".line");
const navlinks = document.querySelector("header ul");
const links = document.querySelectorAll("header ul li");

// console.log(hamburger);
// console.log(line);
// console.log(navlinks);
// console.log(links);

hamburger.addEventListener("click", () => {
    navlinks.classList.toggle("displayHeader");
    links.forEach((link) => {
        link.classList.toggle("displayUl");
    });
    line[0].classList.toggle("line0");
    line[2].classList.toggle("line2");
});
const cross = document.querySelector(".cross");
const optionContainer = document.querySelector(".optionContainer");
const optionList = document.querySelectorAll('.option')
const input = document.querySelector('input')
const label = document.querySelectorAll('label')
// console.log(optionList)
cross.addEventListener("click", () => {
    // console.log("hello");
    cross.classList.toggle("rotate");
    optionContainer.classList.toggle("active");
    
});
optionList.forEach((option)=>{
    option.addEventListener('click',()=>{
        // console.log(option.querySelector('label').innerHTML)
        optionContainer.classList.toggle("active");
        cross.classList.toggle("rotate");
        input.value = option.querySelector('label').innerHTML

    })
})
label.forEach((L)=>{
    L.addEventListener('click',()=>{
        optionContainer.classList.toggle("active");
        cross.classList.toggle("rotate");
    })
})

// const form = document.querySelector('form')
// const input = document.querySelector('input')

// form.addEventListener('submit',(event)=>{
//     event.preventDefault()
//     const address = input.value
//     console.log(address)
// })
