const controls = document.querySelectorAll('.control');
const baseCarousel = document.querySelectorAll('.base-img') 
let currentItem = 0;
const items = document.querySelectorAll('.item');
const maxItems = items.length;
const gallery = document.querySelector('.gallery')


const state = {
    mouseDownPosition:0,
    movement: 0,
    lastTranslatePosition: 0,
    currentSlidePosition: 0
}

const preventDefault = (event) =>{
    event.preventDefault()
} 


const translateSlide = (position) =>{
     state.lastTranslatePosition = position
    gallery.style.transform = `translateX(${position}px)`
}


const onMouseDown = (event) =>{
    const item = event.currentTarget
    state.currentSlidePosition = event.clientX - state.lastTranslatePosition
    state.mouseDownPosition = event.clientX
    item.addEventListener('mousemove', onMouseMove)
    console.log('mouse down')
}

const onMouseMove = (event) =>{
    state.movement = event.clientX - state.mouseDownPosition
    const position = event.clientX - state.currentSlidePosition
    translateSlide(position)
    console.log('mouse move')
}

const onMouseUp = (event) =>{
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)
    console.log('mouse up')
}

const onMouseLeave = (event) =>{
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)
    console.log('mouse leave')
}


function setListeners(){
    
    baseCarousel.forEach((item, index) => {
        const items = item.querySelector('.item')
        item.addEventListener('dragstart', preventDefault)
        item.addEventListener('mousedown', onMouseDown)
        item.addEventListener('mouseup', onMouseUp)
        item.addEventListener('mouseleave', onMouseLeave)
    })

 
    controls.forEach(control => {
        control.addEventListener('click', () =>{
            const isLeft = control.classList.contains('arrow-left');
                if(isLeft){
                    currentItem -= 1;
                }else{
                    currentItem += 1; 
                }

                if(currentItem >= maxItems){
                    currentItem = 0;
                }

                if(currentItem < 0 ){
                    currentItem = maxItems - 1;
                }

                items.forEach(item => item.classList.remove('current-item'));
                

                items[currentItem].scrollIntoView({
                    inline: 'center',
                    behavior: 'smooth',
                });
        })
    
    });

}

 


const init = () =>{
    setListeners()
}

export default{
    init
}
























/*  

const controls = document.querySelectorAll('.control');
const baseCarousel = document.querySelectorAll('.base-img') 
let currentItem = 0;
const items = document.querySelectorAll('.item');
const maxItems = items.length;
const gallery = document.querySelector('.gallery')


const state = {
    mouseDownPosition:0,
    movement: 0,
     
}

const preventDefault = (event) =>{
    event.preventDefault()
} 


const translateSlide = (position) =>{
     
    gallery.style.transform = `translateX(${position}px)`
}


const onMouseDown = (event) =>{
    const item = event.currentTarget
    state.mouseDownPosition = event.clientX
    item.addEventListener('mousemove', onMouseMove)
    console.log('mouse down')
}

const onMouseMove = (event) =>{
    state.movement = event.clientX - state.mouseDownPosition
    translateSlide(state.movement)
    console.log('mouse move')
}

const onMouseUp = (event) =>{
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)
    console.log('mouse up')
}

const onMouseLeave = (event) =>{
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)
    console.log('mouse leave')
}


function setListeners(){
    
    baseCarousel.forEach((item, index) => {
        const items = item.querySelector('.item')
        item.addEventListener('dragstart', preventDefault)
        item.addEventListener('mousedown', onMouseDown)
        item.addEventListener('mouseup', onMouseUp)
        item.addEventListener('mouseleave', onMouseLeave)
    })

 
    controls.forEach(control => {
        control.addEventListener('click', () =>{
            const isLeft = control.classList.contains('arrow-left');
                if(isLeft){
                    currentItem -= 1;
                }else{
                    currentItem += 1; 
                }

                if(currentItem >= maxItems){
                    currentItem = 0;
                }

                if(currentItem < 0 ){
                    currentItem = maxItems - 1;
                }

                items.forEach(item => item.classList.remove('current-item'));
                

                items[currentItem].scrollIntoView({
                    inline: 'center',
                    behavior: 'smooth',
                });
        })
    
    });

}

 


const init = () =>{
    setListeners()
}

export default{
    init
}



*/

















/* 

const controls = document.querySelectorAll('.control');
let currentItem = 0;
const items = document.querySelectorAll('.item');
const maxItems = items.length;

controls.forEach(control => {
    control.addEventListener('click', () =>{
        const isLeft = control.classList.contains('arrow-left');
            if(isLeft){
                currentItem -= 1;
            }else{
                currentItem += 1; 
            }

            if(currentItem >= maxItems){
                currentItem = 0;
            }

            if(currentItem < 0 ){
                currentItem = maxItems - 1;
            }

            items.forEach(item => item.classList.remove('current-item'));

            items[currentItem].scrollIntoView({
                inline: 'center',
                behavior: 'smooth',
            });
    })
}); */