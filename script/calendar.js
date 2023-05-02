window.addEventListener("load", () => {
  const loaderpage = document.querySelector(".loaderpage");
  loaderpage.classList.add("loaderpage-hidden");
  loaderpage.addEventListener("transitionend", () => {
    document.body.removeChild(loaderpage);
  });
});
//import
// import { showDetail } from './detail.js';
const backendIPAddress = "127.0.0.1:3000";
let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
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
var eventName, eventStartTime, eventEndTime, eventCategory, eventDetail, eventFriend, eventDate;
var detailon = false;

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
const showFriendList = document.getElementById('friendname');

var today_day;
var today_month;
var today_year;

//test info

// const myCalendar = {"2023-4-19":[{"eventname":"QUIZ PROGLANG",
//                                   "category":{"subject":"PROG LANG","color":"#0097B2"}},

//                                   {"eventname":"Meeing CEE" , 
//                                   "category":{"subject":"COM ENG ESS","color":"#216B39"}}],
//                     "2023-4-6":[{"eventname":"QUIZ CALII",
//                                   "category":{"subject":"CALII","color":'#62462C'}}]}

// const event1 = {"starttime":{"hour":"13","min":"45"} , "endtime":{"hour":"14","min":"00"} , "eventname":"QUIZ PROGLANG" , "category":{"subject":"Prog Lang","color":"#0097B2"} , "creator":"Kim Taerae" , "detail":"taeraetaerae" , "member":["ung","pp","meow"] , "eventid":"12345"};
// const event2 = {"starttime":{"hour":"10","min":"20"} , "endtime":{"hour":"24","min":"60"} , "eventname":"Meeing CEE" , "category":{"subject":"COM ENG ESS","color":"#216B39"} , "creator":"Kim Taerae" , "detail":"cupid is dump" , "member":["ung"] , "eventid":"12346"};
// const myCalendar = {"2023-4-19":[event1,event2,event2,event2,event2,event2]}
var myCalendar;
function setmyCalendar(newcalendar){
  myCalendar = newcalendar;
}
function getmyCalendar(){
  return myCalendar;
}
function getBackendIP(){
  return backendIPAddress;
}
function initializeEventInfo(){
  eventName = '';
  eventStartTime = ['-1','-1'];
  eventEndTime = ['24','60']; 
  eventCategory = '--- Categories Selection ---';
  eventDetail = '';
  eventFriend = [];

  eventTitleInput.style.border = '1px solid #000000';
  categoriesDropbox.style.border = '1px solid #000000';
  hrfirst0.style.border = hrfirst1.style.border = minfirst0.style.border = minfirst1.style.border = '1px solid #000000';
  hrlast0.style.border = hrlast1.style.border = minlast0.style.border = minlast1.style.border = '1px solid #47623D';
  eventinvite.style.border = '1px solid #000000';
}


function openModal(date) {
  initializeEventInfo()
  newEventModal.style.display = 'block';
  backDrop.style.display = 'block';
  newEventModal.querySelector('#categories #categoriesdropdown #dropbtn').innerHTML = '--- Categories Selection ---';
  newEventModal.querySelector('#categories #categoriesdropdown #dropbtn').style.color = '#A8A8A8';
  eventColor.style.backgroundColor = '#FFC700';
  eventTitleInput.value = '';
  hrfirst0.value = hrfirst1.value = minfirst0.value = minfirst1.value = '';
  hrlast0.value = hrlast1.value = minlast0.value = minlast1.value = '';
  eventdetail.value = '';
  eventinvite.value = '';
}
// function showTaskbox(event){
// 	$.getScript("detail.js", function(){
//  		document.write(showTaskbox(event));
// 	});
// }

// function showDetail(date, currentday, currentmonth, currentyear, currentdate){
// 	$.getScript("detail.js", function(){
//  		document.write(showDetail(date, currentday, currentmonth, currentyear, currentdate));
// 	});
// }


// function closeDetailBar(){
//   $.getScript("detail.js", function(){
//     document.write(closeDetailBar());
//   });
// }

// function deleteFilterBar(){
//   $.getScript("filter.js", function(){
//       document.write(deleteFilterBar());
//   });
// }

// function showNoti(){
//   $.getScript("noti.js", function(){
//       document.write(showNoti());
//   });
// }

function load() {
  const dt = new Date();
  // console.log(dt);

  if (nav !== 0) {
    dt.setDate(1);
    dt.setMonth(new Date().getMonth() + nav);
    console.log(dt);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  today_day = day;
  today_month = month+1;
  today_year = year;


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

      // add Event in that Day
      var dayString2 = String(dayString.split('/')[2])+'-';
      if(dayString.split('/')[0]<10) dayString2+='0';
      dayString2+=String(dayString.split('/')[0])+'-';
      if(dayString.split('/')[1]<10) dayString2+='0';
      dayString2+=String(dayString.split('/')[1]);
      if (myCalendar[dayString2]) {
        myCalendar[dayString2].forEach((item, index) => {
          if (index<2){
            var createEventName = item["name"];
            var createEventColor = myCategory[item["category"]];

            const eventDiv = document.createElement('div');
            const eventDivName = document.createElement('div');
            const eventDivColor = document.createElement('div');
            eventDivColor.id = 'newEventDivColor';
            eventDivName.id = 'newEventDivName';
            eventDivName.style.whiteSpace = "nowarp";
            eventDivName.style.overflow = "hidden";
            eventDivName.style.textOverflow = "ellipsis";
            eventDiv.id = 'newEventDiv';
            eventDivColor.style.backgroundColor = createEventColor;
            eventDivName.innerText = createEventName;
            eventDiv.appendChild(eventDivColor);
            eventDiv.appendChild(eventDivName);
            daySquare.appendChild(eventDiv);
          }
        });
      }
      // console.log(dayString2);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      // myCalendar.array.forEach(element => {
      //   
      // });

      daySquare.addEventListener('click', () => {
        // const clickDate = dayString.split('/')[2]+'-'+dayString.split('/')[0]+'-'+dayString.split('/')[1];
        var clickDate = String(dayString.split('/')[2])+'-';
        if(dayString.split('/')[0]<10) clickDate+='0';
        clickDate+=String(dayString.split('/')[0])+'-';
        if(dayString.split('/')[1]<10) clickDate+='0';
        clickDate+=String(dayString.split('/')[1]);
        const containdetail = document.getElementById('det');
        const containnoti = document.getElementById('noticontain')
        if(containdetail.children.length === 1){
          closeDetailBar();
          deleteFilterBar();
        }
        else if(containnoti.children.length === 1){
          closeNotibar();
          deleteFilterBar();
        }
        else{
          deleteFilterBar();
        }
        const mon = [" ", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const d = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];
        showDetail(clickDate, d[(paddingDays+Number(dayString.split('/')[1]))%7], mon[dayString.split('/')[0]], dayString.split('/')[2], dayString.split('/')[1]);
      });

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
          eventDate = dayString.split('/')[2]+'-'+dayString.split('/')[0]+'-'+dayString.split('/')[1];
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
  newEventModal.style.display = 'none';
  backDrop.style.display = 'none';
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
    hrfirst0.style.border = hrfirst1.style.border = minfirst0.style.border = minfirst1.style.border = '2px solid #d94c26';
  } else {
    hrfirst0.style.border = hrfirst1.style.border = minfirst0.style.border = minfirst1.style.border = '1px solid #000000';
  }
  if (((!hrlast0.value || !hrlast1.value || !minlast0.value || !minlast1.value) && !(!hrlast0.value && !hrlast1.value && !minlast0.value && !minlast1.value)) ||
  (hrlast0.value && (isNaN(hrlast0.value) || isNaN(hrlast1.value) || isNaN(minlast0.value) || isNaN(minlast1.value))) || 
  (hrlast0.value && (Number(hrlast0.value+hrlast1.value)<0 || Number(hrlast0.value+hrlast1.value)>23 || Number(minlast0.value+minlast1.value)<0 || Number(minlast0.value+minlast1.value)>59))) {
    canSaveEvent = false;
    hrlast0.style.border = hrlast1.style.border = minlast0.style.border = minlast1.style.border = '2px solid #d94c26';
  } else {
    hrlast0.style.border = hrlast1.style.border = minlast0.style.border = minlast1.style.border = '1px solid #47623D';
  }

  if(canSaveEvent) {
    eventName = eventTitleInput.value;
    let starthour = hrfirst0.value+hrfirst1.value;
    if(hrfirst0.value == '0'){
      starthour = parseInt(hrfirst1.value);
    }
    let startmin = minfirst0.value+minfirst1.value;
    if(minfirst0.value == '0'){
      startmin = parseInt(minfirst1.value);
    }
    eventStartTime = {"hour":starthour, "min" :startmin};
    if(hrlast0.value) {
      let endhour = parseInt(hrlast0.value+hrlast1.value);
      if(hrlast0.value == '0'){
        endhour = parseInt(hrlast1.value);
      }
      let endmin = parseInt(minlast0.value+minlast1.value);
      if(minlast0.value == '0'){
        endmin = parseInt(minlast1.value);
      }
      eventEndTime = {"hour":endhour, "min" :endmin}; 
    }
    else{eventEndTime = {"hour":24, "min" :60}; }
    eventCategory = newEventModal.querySelector('#categories #categoriesdropdown #dropbtn').innerHTML;
    eventDetail = eventdetail.value;
    if(eventinvite.value) eventFriend.push(eventinvite.value);
    const dt = new Date();
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const d = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const paddingDays = weekdays.indexOf(month);
    addNewEvent(day,d[(paddingDays+day)%7],month,year);
    closeModal();
    init();

    // console.log(eventName, eventStartTime, eventEndTime, eventCategory, eventDetail, eventFriend, eventDate);
  }

}

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
}

function initEventDropdown(){
  categoriesEvent = myCourse;
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

eventinvite.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    if (!eventinvite.value || eventFriend.includes(eventinvite.value)){
      eventinvite.style.border = '2px solid #d94c26';
    }else{
      eventinvite.style.border = '1px solid #000000';
      const finv = document.createElement('div');
      const fname = document.createElement('div');
      const fclose = document.createElement('button');
      finv.id = 'onefriendname';
      fname.id = 'onefriendname1';
      fclose.id = 'onefriendname2';

      eventFriend.push(eventinvite.value);

      fname.textContent = eventinvite.value;
      fclose.innerText = 'x'
      finv.appendChild(fname);
      finv.appendChild(fclose);
      showFriendList.appendChild(finv);

      eventinvite.value = '';

      const h = Math.max(Number(document.getElementById("newEventModal").clientHeight), Number(document.getElementById("container").clientHeight));
      // console.log(String(h+60)+'px');
      document.getElementById("modalBackDrop").style.height = String(h + 60)+'px';

      fclose.addEventListener('mouseenter', () => {
        fclose.style.color = '#FFFFFF';
        fclose.style.backgroundColor = '#8DC561';
      })
      fclose.addEventListener('mouseleave', () => {
        fclose.style.color = '#8DC561';
        fclose.style.backgroundColor = '#FFFFFF';
      })
      fclose.addEventListener('click', () => {
        eventFriend.splice(eventFriend.indexOf(fname.textContent), 1);
        // console.log(eventFriend);
        finv.remove();
      })
    }
  }
});

const setHeight = () => {
  const currentHeight = window.innerHeight;
  const currentWidth = window.currentWidth;
  document.body.style.height = `${currentHeight}px`;
  document.body.style.width = `${currentWidth}px`;
}

function seemore(){
  //get rid of det/contain
  const displaypane = document.getElementById('displaypane');
  const containfilter = document.getElementById('contain-filter');
  if('contain-filter'in displaypane.children){
    displaypane.removeChild(containfilter);
  }
  // displaypane.removeChild(containfilter);
  const modal = document.getElementById('modalBackDrop');
  modal.style.display = "block";
  const box = document.getElementById('contain-filter')
  box.style.display = "block";
  // const filterbox = document.getElementById('filterbar');
  // filterbox.style.display = "block";
  //add close button
  const closebutton = document.getElementById('close-button-overlay');
  closebutton.addEventListener('click',closeOverlay);
  closebutton.style.display = "block";
  showList();
}

function closeOverlay(){
  const modal = document.getElementById('modalBackDrop');
  modal.style.display = "none";
}

const seemorebutton = document.getElementById('folded');
seemorebutton.addEventListener("click",seemore);
window.addEventListener("resize",setHeight);

const logout = () => {
  window.location.href = `http://${backendIPAddress}/logout`;
};
const logoutfront = document.getElementById('logout');
logoutfront.addEventListener('click',logout);

const addNewEvent = async (dateadd,currentday,currentmonth,currentyear) => {
  const date = dateadd;
  const name = eventName;
  const creater = student_name;
  const detail = eventDetail;
  const category = eventCategory;
  // const date = eventDate;
  const month = currentmonth+1;
  const year = currentyear;
  const day = currentday;
  const starttime = eventStartTime;
  const endtime = eventEndTime;
  const member = eventFriend;
  const options ={
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      name:name,
      creater:creater,
      detail:detail,
      category:category,
      date:date,
      month:month,
      year:year,
      day:day,
      starttime:starttime,
      endtime:endtime,
      member:member,
    }),
    headers:{
      "Content-Type":"application/json",
    }
  };
  console.log(options);
  await fetch(`http://${backendIPAddress}/`, options);
}
const init = async () => {
  await getInfo();
  load();
  initEventDropdown();
  initButtons();
  showList();
  load();
}
// initEventDropdown();
// initButtons();
// load();
