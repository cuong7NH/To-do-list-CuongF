



// Clock js

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];


function formatTime(time) {
   return  time < 10 ? '0'+ time : time;
}

function getTime() {
    const time = new Date();
    
    const day = days[time.getDay()];
    const date = formatTime(time.getDate()) ;
    const month = formatTime(time.getMonth() + 1) ;
    const year = time.getFullYear();
    const hour = formatTime(time.getHours());
    const minute = formatTime(time.getMinutes());
    const second = formatTime(time.getSeconds());

    dateText = document.querySelector('.date');

    clock = document.querySelector('.clock');

    dateText.innerHTML = 
        `
        <span>${day} - <span>
        <span>${date} - </span>
        <span>${month} - </span>
        <span>${year}</span>
        `;

    clock.innerHTML = 
        `
        <span>${hour}</span>
        <span>:</span>
        <span>${minute}<span>
        <span>:</span>
        <span style = "color: #ff9f1a; min-Width: 30px; display: inline-block; ">${second}</span>    
        `    
}

const runTime = setInterval(getTime, 1000);

// Task to do js


const workInput = document.getElementById('input');
const workAddBtn = document.getElementById('submit');
const worksListContainer = document.querySelector('.list-works');

let dataLocal = localStorage.getItem('worksList');
let worksList;
if(dataLocal) {
    worksList = JSON.parse(dataLocal);
} else  {
    worksList = [];
}



// localStorage.setItem('worksList', JSON.stringify(worksList));
renderWorks(worksList);





// Add works
workAddBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(workInput.value.trim()) {
        worksList.push(workInput.value)
        renderWorks(worksList);

    }
    localStorage.setItem('worksList', JSON.stringify(worksList));

    // renderWorks(worksList);

    workInput.value = '';
});

// render works
function renderWorks(worksList) {
    worksListContainer.innerHTML = '';
    worksList.forEach(work => {
        const li = document.createElement('li');
        li.innerHTML = 
            `
            <span class="checked-btn">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-all" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        <path d="M6.25 8.043l-.896-.897a.5.5 0 1 0-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 0 0 .708 0l7-7a.5.5 0 0 0-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
                      </svg>
                </span>
                ${work}
                <a href="#" class="delete-btn">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                    </svg>
                </a>
            `;
        worksListContainer.appendChild(li);    
    });
}

// delete Works

// clear all
const clearAll = document.querySelector('#clear-all');

clearAll.addEventListener('click', (e) => {
    e.preventDefault();
    const workItems = document.querySelectorAll('.list-works li');
    workItems.forEach(work => {
        work.classList.add('delete');
        setTimeout(() => {
            work.style.display = 'none';
        },300)
    });
    worksList = [];
    localStorage.removeItem('worksList')
    
});

// clear Completed Works
const clearCompletedWorks = document.querySelector('#clear-works-done');

clearCompletedWorks.addEventListener('click', (e) => {
    e.preventDefault();
    const allWorks =  document.querySelectorAll('.list-works li');
    
    for(let i = 0; i <  allWorks.length; i++) {
        

        if(allWorks[i].getAttribute('class') === 'completed') {
            allWorks[i].classList.add('delete');
            setTimeout(()=> {
                allWorks[i].style.display = 'none';
            }, 300);

            // up date storage
            worksList.splice(i, 1);

            localStorage.setItem('worksList', JSON.stringify(worksList));
        }  

    }
});

// clear one work 


worksListContainer.addEventListener('mouseover', (e) => {
    const allTrashBtn =  document.querySelectorAll('.list-works li a.delete-btn');
    
    for(let i = 0; i < allTrashBtn.length; i++)  {
        allTrashBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            allTrashBtn[i].parentElement.classList.add('delete');
            setTimeout(() => {
                allTrashBtn[i].parentElement.style.display = 'none';
            }, 300);
            // update storage
            worksList.splice(i, 1);

            localStorage.setItem('worksList', JSON.stringify(worksList));
        });
    }
    
});







// completed works

worksListContainer.addEventListener('click', (e) => {
    if(e.target.tagName == "LI") {
        e.target.classList.toggle('completed');

    }
});


// 