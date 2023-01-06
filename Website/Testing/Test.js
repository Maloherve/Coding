

const scrollContainer = document.getElementsByClassName("scroller")[0]


scrollContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaY
});