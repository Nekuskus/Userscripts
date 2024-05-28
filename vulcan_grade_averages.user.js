// ==UserScript==
// @name         Grade Average Calcualtor for uonetplus-uczen.vulcan.net.pl
// @namespace    http://tampermonkey.net/
// @version      2024-05-28
// @description  Calculates grade averages for each class in the Vulcan online gradebook
// @author       kuskus.dev (Nekuskus)
// @match        https://uonetplus-uczen.vulcan.net.pl/*/*/App
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {

    // Sanity check, no URL for /grades, have to check for the specific /App subpage
    // Note that /App auto-loads into the previous used view on F5 refresh, so use that if this script did not generate the averages on first load
    let test_label = document.getElementById('ext-element-176')
    if (!test_label || test_label.innerText != "Oceny częściowe") return

    const PLUS = 0.33;
    const MINUS = -0.33;

    let table = document.getElementById('ext-element-173')

    Array.from(table.children).forEach(subject => {
        let list = subject.querySelector('.x-innerhtml')

        if (list.children.length == 1 && list.children[0].textContent == "Brak ocen") return

        let sum = 0;
        let count = 0;

        Array.from(list.children).forEach(grade => {
            let num = parseInt(grade.textContent.includes('/') ? grade.textContent.split('/')[1] : grade.textContent)
            if (!num) return

            let description = grade.getAttribute('data-qtip')
            if(!description) return

            let idx = description.search('Waga: ')
            let weight = parseInt(description.substring(idx + 6)) // Cuts off after integer end
            if(weight == 0) return

            if (grade.textContent.includes('+')) {
                num += PLUS;
            } else if (grade.textContent.includes('-')) {
                num += MINUS;
            }

            sum += num * weight;
            count += weight;
            console.log(grade.textContent, num, weight)
        })

        let weighted = (sum / count).toFixed(2)
        let el = document.createElement('span')
        el.style.color = '#999'
        el.style.fontStyle = 'italic'
        el.innerText = `\t(${weighted})`
        list.appendChild(el)
    })


})();