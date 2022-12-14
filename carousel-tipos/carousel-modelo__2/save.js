const carouselList = document.querySelector('[data-carousel="list"]')
const carouselItems = document.querySelectorAll('[data-carousel="item"]')
const btnPrevious = document.querySelector('[data-carousel="btn-previous"]')
const btnNext = document.querySelector('[data-carousel="btn-next"]')

const state = {
    mouseDownPosition:0,
    movement: 0,
    lastTranslatePosition:0,
    currentSlidePosition:0,
    currentItemIndex:0,
    currentSlideIndex:0
}

const preventDefault = (event) =>{
    event.preventDefault()
}

const translateSlide = (position) =>{
    state.lastTranslatePosition = position
    carouselList.style.transform = `translateX(${position}px)`
}

const getCenterPosition = (slideindex) =>{
    const item = carouselItems[state.currentItemIndex]
    const itemWidth = item.offsetWidth
    const bodyWidth = document.body.clientWidth
    const slideWidth = itemWidth * 5
    const margin = bodyWidth - slideWidth
    return margin - (itemWidth * slideindex)
}

const animateTransition = (active) => {
    if(active){
        carouselList.style.transition = 'transform .3'
    }else{
        carouselList.style.removeProperty('transition')
    }
}

/* O SETVISIBLE FAZ COM QUE O CAROUSEL PULE PARA
A OUTRA PARTE DOS CAROUSEIS */

const setVisibleSlide = (slideIndex) =>{
    const centerPosition = getCenterPosition(slideIndex)
    state.currentItemIndex = slideIndex
/*   translateSlide(centerPosition) */
    animateTransition(true)
}

const backwardSlide = () => {
    if(state.currentSlideIndex > 0){
        setVisibleSlide(state.currentItemIndex - 1)
    }else{
        setVisibleSlide(state.currentItemIndex)
    }
    
}
const forwardSlide = () => {
    const lastItemIndex = carouselItems.length - 1
    const lastSlideIndex = Math.floor(lastItemIndex / 5)
    if(state.currentSlideIndex <  lastSlideIndex){
        setVisibleSlide(state.currentItemIndex + 1)
    }else{
        setVisibleSlide(state.currentItemIndex)
    }
}

const onMouseDown = (event, index) =>{
    const item = event.currentTarget
    state.currentItemIndex = index
    state.mouseDownPosition = event.clientX
    state.currentSlidePosition = event.clientX - state.lastTranslatePosition
    item.addEventListener('mousemove', onMouseMove)
    animateTransition(false)
}

const onMouseMove = (event) =>{
    state.movement = event.clientX - state.mouseDownPosition
    const position = event.clientX - state.currentSlidePosition
    translateSlide(position)
}

const onMouseUp = (event) =>{
    if(state.movement > 150){
        backwardSlide()
    }else if (state.movement < -150){
         forwardSlide()
    }else{
        setVisibleSlide(state.currentItemIndex)
    }


    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)

}

const onMouseLeave = (event) =>{
    const item = event.currentTarget
    item.removeEventListener('mousemove', onMouseMove)

}

const setListeners = () =>{
    btnNext.addEventListener('click', forwardSlide)
    btnPrevious.addEventListener('click', backwardSlide)
    carouselItems.forEach((item, index) =>{
        const link = item.querySelector('.movie-carousel__link')
        link.addEventListener('click', preventDefault)
        item.addEventListener('dragstart', preventDefault)
        item.addEventListener('mousedown', (event) => {
            onMouseDown (event, index)
        })
        item.addEventListener('mouseup', onMouseUp)
        item.addEventListener('mouseleave', onMouseLeave)
    })
}


const init = () => {
    setListeners()
    setVisibleSlide(0)
}

export default{
    init
}