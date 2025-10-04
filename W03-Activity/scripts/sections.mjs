export function setSectionSelection(sections) {
    const sectionSelect = document.querySelector("#sectionNumber");
    sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section.sectionNumber;
        option.textContent = `${section.sectionNumber}`;
        sectionSelect.appendChild(option);
    });
}


export function populateSections(sections) {
    const html = sections.map(
        (section) => `<tr>
            <td>${section.sectionNumber}</td>
            <td>${section.enrolled}</td>
            <td>${section.instructor}</td>
            </tr>`
    );
    document.querySelector("#sections").innerHTML = html.join("");
}

