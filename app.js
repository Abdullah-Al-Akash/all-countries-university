const inputBtn = document.getElementById('input-btn');
const inputField = document.getElementById('input-field');
const countryName = document.getElementById('country-name');
const spinner = document.getElementById('spinner');

// Enter Button For Search:
inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
                inputBtn.click();
        }
})
// Load Spinner Function
const loadSpinner = (display) => {
        spinner.style.display = display;
}

// Search Countries University:
inputBtn.addEventListener('click', function () {
        loadSpinner('block')
        const inputValue = inputField.value;
        document.getElementById('item-container').textContent = '';
        // If User Search Nothing:
        if (inputValue === '') {
                countryName.innerHTML = `
                                <span class="text-danger"> Please Write Country Name </span>           
                        `;
                loadSpinner('none')
                return;
        }
        fetch(`http://universities.hipolabs.com/search?country=${inputValue}`)
                .then(res => res.json())
                .then(data => {
                        displayData(data)
                        // Condition For Error Handling
                        if (data.length >= 1) {
                                countryName.innerHTML = `
                                                Universities of <span
                                                class="text-warning">${inputValue} </span>
                                        `;
                        }
                        else {
                                countryName.innerHTML = `
                                        Result not found <span
                                        class="text-warning">${inputValue} </span>
                                `;
                                loadSpinner('none')
                        }
                })

        inputField.value = '';
})

// Show All University Result After Search:
const loadData = () => {
        fetch(`http://universities.hipolabs.com/search?country=bangladesh`)
                .then(res => res.json())
                .then(data => displayData(data))
}
// Call LoadData Function:
loadData();

// Show Load Data in UI:
const displayData = (universities) => {

        const itemContainer = document.getElementById('item-container');
        universities.forEach((university) => {
                // console.log(university);
                const website = university.web_pages;

                const div = document.createElement('div');
                div.innerHTML = `
                        <div class="col">
                                <div class="h-100 item-card">
                                        <div class="card-body">
                                                <div style="height: 120px;">
                                                        <h4 class="card-title overflow-hidden text-center text-success"><i class="fas fa-university text-danger"></i> ${university.name} 
                                                        </h4>
                                                </div>
                                                <p class="card-text text-center text-dark"><i class="fas fa-globe"></i> ${university.country} (${university.alpha_two_code})</p>
                                                <div class="text-center">
                                                        <a href="${website[0]}" target="_blank"
                                                        class="text-white text-decoration-none"><button type="button" id="visit-btn"
                                                                class="btn btn-primary fw-bolder">Visit
                                                                Site <i class="fas fa-arrow-right"></i></button>
                                                        </a>
                                                </div>
                                        </div>
                                        
                                </div>
                        </div>
                `;
                loadSpinner('none')
                // Append All Item in UI
                itemContainer.appendChild(div);
        }
        )

}

/*
        Thank You
*/