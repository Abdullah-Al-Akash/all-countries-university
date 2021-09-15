const inputBtn = document.getElementById('input-btn');
const inputField = document.getElementById('input-field');

const loadData = () => {
        fetch('http://universities.hipolabs.com/search?country=bangladesh')
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
                console.log(website);
                const div = document.createElement('div');
                div.innerHTML = `
                        <div class="col">
                                <div class="h-100 border-3 border-dark item-card">
                                        <div class="card-body">
                                                <div style="height: 80px;">
                                                        <h4 class="card-title overflow-hidden text-center text-success">${university.name} 
                                                        </h4>
                                                </div>
                                                <p class="card-text text-center text-danger">Country: ${university.country}(${university.alpha_two_code})</p>
                                                <div class="text-center">
                                                        <a href="${website[0]}" target="_blank"
                                                        class="text-white text-decoration-none"><button type="button"
                                                                class="btn btn-primary fw-bolder">Visit
                                                                Site</button>
                                                        </a>
                                                </div>
                                        </div>
                                        
                                </div>
                        </div>
                `;
                itemContainer.appendChild(div);
        })
}