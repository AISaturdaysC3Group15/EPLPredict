document.querySelector('.predict').addEventListener('click', getPrediction);

function getPrediction(e){
    const age = document.getElementById('age').value;

    const position = document.getElementById('position-cat');
    const positionCategory = position[position.selectedIndex].value;
    
    const newSigning = document.getElementById('new-signing');
    const signingCategory = newSigning[newSigning.selectedIndex].value;

    const pageViews = document.getElementById('page-views').value;
    const fplValue = document.getElementById('fpl-value').value;
    const fplSell = document.getElementById('fpl-sell').value;
    const fplPoints = document.getElementById('fpl-points').value;

    const bigClub = document.getElementById('big-club');
    const bigClubCategory = bigClub[bigClub.selectedIndex].value;

    const url = 'https://epl-player-mv-predictor.herokuapp.com/api/predict';

    let data = {
                  age : age,
                  positionCategory : positionCategory,
                  signingCategory : signingCategory,
                  pageViews : pageViews,
                  fplValue : fplValue,
                  fplSell : fplSell,
                  fplPoints:fplPoints,
                  bigClubCategory :bigClubCategory 
    };

    const otherPram = {
        headers: {
            "content-type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify(data),
        method:"POST",
    
    };

    fetch(url, otherPram)
    .then(function(res){ 
        return res.json()
    }).then(function(data){

        if (data['status code'] === '200'){
            document.getElementById("prediction").innerHTML = "Player's value is " + data.message + ' million pounds';
        }else {
            document.getElementById("prediction").innerHTML = "Invalid Input";
        }
            
        toggleModal();
        console.log(data)

    }).catch(function(err){
        document.getElementById("prediction").innerHTML = 'Connection Error';
        toggleModal();
        console.log(err)
    });

    e.preventDefault();
}

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);