let mobileWidth = 950;

/**
 * This function checks if window width is less than mobileWidth (declared global).
 * @returns {boolean} - Returns true if the width is samller than the mobileWidht or else false.
 */
function isMobile() {
    return window.innerWidth < mobileWidth;
}