// ==UserScript==
// @name         Advent of Code Solve Percentages
// @namespace    http://tampermonkey.net/
// @version      2023-12-09
// @description  Calculates how many 
// @author       You
// @match        https://adventofcode.com/*/stats
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    let statbox = document.getElementsByClassName('stats')[0];
    Array.from(statbox.children).forEach(element => {
        let both_el = element.querySelector('.stats-both')
        let first_el = element.querySelector('.stats-firstonly')

        let both = parseInt(both_el.textContent)
        let first = parseInt(first_el.textContent)

        if (both != 0) {
            let percentage = (first / (both + first)) * 100

            let percentageText = ` (${percentage.toFixed(1)}%)`.padStart(9, ' ')

            first_el.textContent += percentageText

            //62560 (24.14%) 
        }
    });
})();