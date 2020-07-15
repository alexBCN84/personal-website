export function toggleLanguage(styles, element) {
    const { fixedPosition, relativePosition } = styles;
    return function toggleLanguageButtonPosition(entries) {
        // check if section is on view and is intersecting
        if (!entries[0].isIntersecting && !entries[0].isVisible) {
            return element.style.position = relativePosition;
        } else {
            return element.style.position = fixedPosition;
        }
    }
}