export function scrollTo(element) {
    const targetElement = document.getElementById(element)
    targetElement.scrollIntoView({ left: 0, block: 'start', behavior: 'smooth' })
}