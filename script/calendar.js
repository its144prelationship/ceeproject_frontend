let nav = 0;
let clicked = null;
// let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
// const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const categoriesContent = document.getElementById('categoriescontent');
const categoriesDropbox = document.getElementById('dropbtn');
const eventColor = document.getElementById('eventColor');
const allCategories = document.getElementById('categoriesdropdown');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var categoriesEvent = ['Com Eng Ess', 'Gen Phys II', 'Cal II', 'Prog Meth I', 'Event']
var colorEvent = ['#5C1999','#0097B2','#4256B2','#216B39','#67AB3D',
                  '#FFFD61','#FFAE34','#C45454','#DDD8D8','#62462C',
                  '#9B8809','#FFA6F9','#F48F6A','#A8E0FF','#FFFFFF']

//event info
var eventName, eventStartTime, eventEndTime, eventCategory, eventDetail, eventFriend;

//time
const hrfirst0 = document.getElementById('hrfirst0');
const hrfirst1 = document.getElementById('hrfirst1');
const minfirst0 = document.getElementById('minfirst0');
const minfirst1 = document.getElementById('minfirst1');
const hrlast0 = document.getElementById('hrlast0');
const hrlast1 = document.getElementById('hrlast1');
const minlast0 = document.getElementById('minlast0');
const minlast1 = document.getElementById('minlast1');
const eventdetail = document.getElementById('eventdetail');
const eventinvite = document.getElementById('eventinvite');

function initializeEventInfo(){
  eventName = '';
  eventStartTime = ['-1','-1','-1','-1'];
  eventEndTime = ['-1','-1','-1','-1']; 
  eventCategory = '--- Categories Selection ---';
  eventDetail = '';
  eventFriend = [];

  eventTitleInput.style.border = '1px solid #000000';
  categoriesDropbox.style.border = '1px solid #000000';
  hrfirst0.style.border = '1px solid #000000';
  hrfirst1.style.border = '1px solid #000000';
  minfirst0.style.border = '1px solid #000000';
  minfirst1.style.border = '1px solid #000000';
  hrlast0.style.border = '1px solid #47623D';
  hrlast1.style.border = '1px solid #47623D';
  minlast0.style.border = '1px solid #47623D';
  minlast1.style.border = '1px solid #47623D';
}


function openModal(date) {
  initializeEventInfo()
  newEventModal.style.display = 'block';
  backDrop.style.display = 'block';
  newEventModal.querySelector('#categories #categoriesdropdown #dropbtn').innerHTML = '--- Categories Selection ---';
  newEventModal.querySelector('#categories #categoriesdropdown #dropbtn').style.color = '#A8A8A8';
  eventColor.style.backgroundColor = '#FFC700';
  hrfirst0.value = hrfirst1.value = minfirst0.value = minfirst1.value = '';
  hrlast0.value = hrlast1.value = minlast0.value = minlast1.value = '';
  eventdetail.value = '';
  eventinvite.value = ''
}

function load() {
  const dt = new Date();
  console.log(dt);

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    const calval = document.createElement('div');
    const dayNum = document.createElement('div');
    dayNum.id = 'dayNum';
    calval.id = 'calVal';

    if (i > paddingDays) {
      const addEventButton = document.createElement('button');
      addEventButton.textContent = "+";
      addEventButton.id = 'addEvent';
      dayNum.innerText = i - paddingDays;
      calval.appendChild(addEventButton);
      calval.appendChild(dayNum);
      daySquare.appendChild(calval);
      // const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      // if (eventForDay) {
      //   const eventDiv = document.createElement('div');
      //   eventDiv.classList.add('event');
      //   eventDiv.innerText = eventForDay.title;
      //   daySquare.appendChild(eventDiv);
      // }

      // daySquare.addEventListener('click', () => openModal(dayString));

      daySquare.addEventListener('mouseenter', () => {
        const addEventButton = daySquare.querySelector('#calVal #addEvent');
        addEventButton.style.color = 'rgba(49, 49, 49, 0.76)';
        addEventButton.style.backgroundColor = 'rgba(119, 119, 119, 0.17)';
        addEventButton.addEventListener('click', () => openModal(dayString));
        addEventButton.addEventListener('click', () => {
          var x = document.getElementById("dateevent");
          const mon = [" ", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const d = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
          var currentDate = dayString.split('/')[1];
          if (currentDate==="1" || currentDate==="21" || currentDate==="31") currentDate = currentDate+"st";
          else if (currentDate==="2" || currentDate==="22") currentDate = currentDate+"nd";
          else if (currentDate==="3" || currentDate==="23") currentDate = currentDate+"rd";
          else currentDate = currentDate+"th";
          currentDate = currentDate+" "+mon[dayString.split('/')[0]]+" "+dayString.split('/')[2];
          x.innerHTML = d[(paddingDays+Number(dayString.split('/')[1]))%7]+" "+currentDate;
          return 
        });
      });

      daySquare.addEventListener('mouseleave', () => {
        const addEventButton = daySquare.querySelector('#calVal #addEvent');
        addEventButton.style.color = '#FEFFFC';
        addEventButton.style.backgroundColor = '#FEFFFC';
      });
    
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    

  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  // deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  let canSaveEvent = true;
  if (!eventTitleInput.value) {
    canSaveEvent = false;
    eventTitleInput.style.border = '2px solid #d94c26';
  } else eventTitleInput.style.border = '1px solid #000000';
  if (newEventModal.querySelector('#categories #categoriesdropdown #dropbtn').innerHTML === '--- Categories Selection ---'){
    canSaveEvent = false;
    categoriesDropbox.style.border = '2px solid #d94c26';
  } else categoriesDropbox.style.border = '1px solid #000000';
  if ((!hrfirst0.value || !hrfirst1.value || !minfirst0.value || !minfirst1.value) ||
  (isNaN(hrfirst0.value) || isNaN(hrfirst1.value) || isNaN(minfirst0.value) || isNaN(minfirst1.value)) ||
  (Number(hrfirst0.value+hrfirst1.value)<0 || Number(hrfirst0.value+hrfirst1.value)>23 || Number(minfirst0.value+minfirst1.value)<0 || Number(minfirst0.value+minfirst1.value)>59)) {
    canSaveEvent = false;
    hrfirst0.style.border = '2px solid #d94c26';
    hrfirst1.style.border = '2px solid #d94c26';
    minfirst0.style.border = '2px solid #d94c26';
    minfirst1.style.border = '2px solid #d94c26';
  } else {
    hrfirst0.style.border = '1px solid #000000';
    hrfirst1.style.border = '1px solid #000000';
    minfirst0.style.border = '1px solid #000000';
    minfirst1.style.border = '1px solid #000000';
  }
  if (((!hrlast0.value || !hrlast1.value || !minlast0.value || !minlast1.value) && !(!hrlast0.value && !hrlast1.value && !minlast0.value && !minlast1.value)) ||
  (hrlast0.value && (isNaN(hrlast0.value) || isNaN(hrlast1.value) || isNaN(minlast0.value) || isNaN(minlast1.value))) || 
  (hrlast0.value && (Number(hrlast0.value+hrlast1.value)<0 || Number(hrlast0.value+hrlast1.value)>23 || Number(minlast0.value+minlast1.value)<0 || Number(minlast0.value+minlast1.value)>59))) {
    canSaveEvent = false;
    hrlast0.style.border = '2px solid #d94c26';
    hrlast1.style.border = '2px solid #d94c26';
    minlast0.style.border = '2px solid #d94c26';
    minlast1.style.border = '2px solid #d94c26';
  } else {
    hrlast0.style.border = '1px solid #47623D';
    hrlast1.style.border = '1px solid #47623D';
    minlast0.style.border = '1px solid #47623D';
    minlast1.style.border = '1px solid #47623D';
  }




  //   eventTitleInput.classList.remove('error');

  //   events.push({
  //     date: clicked,
  //     title: eventTitleInput.value,
  //   });

  //   // localStorage.setItem('events', JSON.stringify(events));
  //   closeModal();
  // } else {
  //   eventTitleInput.classList.add('error');
  // }
}

// function deleteEvent() {
//   events = events.filter(e => e.date !== clicked);
//   localStorage.setItem('events', JSON.stringify(events));
//   closeModal();
// }

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  // document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  // document.getElementById('closeButton').addEventListener('click', closeModal);
}

function initEventDropdown(){
  for (let i = 0; i<categoriesEvent.length; i++){
    const a = document.createElement('a');
    a.innerText = categoriesEvent[i];
    categoriesContent.appendChild(a);
    a.addEventListener('mouseenter', () => {
      eventColor.style.backgroundColor = colorEvent[i];
      categoriesContent.style.display = 'block';
      categoriesDropbox.style.backgroundColor = '#8FB58C';
      categoriesDropbox.style.color = '#FFFFFF';
    });
    a.addEventListener('click', () => {
      categoriesDropbox.innerText = a.innerText;
      categoriesDropbox.style.color = '#000000';
      categoriesDropbox.style.backgroundColor = 'rgba(255, 255, 255, 0.68)';
      categoriesContent.style.display = 'none';
    });
    a.addEventListener('mouseleave', () => {
      categoriesDropbox.style.backgroundColor = 'rgba(255, 255, 255, 0.68)';
      categoriesDropbox.style.color = '#000000';
      if (newEventModal.querySelector('#categories #categoriesdropdown #dropbtn').innerHTML === '--- Categories Selection ---'){
        eventColor.style.backgroundColor = '#FFC700';
        categoriesDropbox.style.color = '#A8A8A8';
      }
    });
  }

  categoriesContent.style.display = 'none';

  categoriesDropbox.addEventListener('mouseenter', () => {
    categoriesContent.style.display = 'block';
    categoriesDropbox.style.backgroundColor = '#8FB58C';
    categoriesDropbox.style.color = '#FFFFFF';
  });
  categoriesDropbox.addEventListener('mouseleave', () => {
    categoriesContent.style.display = 'none';
    categoriesDropbox.style.backgroundColor = 'rgba(255, 255, 255, 0.68)';
    categoriesDropbox.style.color = '#000000';
    if (newEventModal.querySelector('#categories #categoriesdropdown #dropbtn').innerHTML === '--- Categories Selection ---'){
      eventColor.style.backgroundColor = '#FFC700';
      categoriesDropbox.style.color = '#A8A8A8';
    }
  });

  allCategories.addEventListener('mouseleave', () => {
    categoriesContent.style.display = 'none';
    if (newEventModal.querySelector('#categories #categoriesdropdown #dropbtn').innerHTML === '--- Categories Selection ---'){
      categoriesDropbox.style.backgroundColor = 'rgba(255, 255, 255, 0.68)';
      categoriesDropbox.style.color = '#A8A8A8';
      eventColor.style.backgroundColor = '#FFC700';
    }

  });
}

initEventDropdown();
initButtons();
load();


