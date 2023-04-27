var student_name;
var student_id;
var profilepic
var user_ID;
// var myCalendar;
var myCourse;
var currentday = "TUE";
var currentmonth = "APR";
var currentyear = 2023;
var currentdate = 19;
var eventindate = [];
var myselection;
var today;
const det = document.getElementById('det');

const event1 = {"starttime":{"hour":"13","min":"45"} , "endtime":{"hour":"14","min":"00"} , "eventname":"QUIZ PROGLANG" , "category":{"subject":"Prog Lang","color":"#0097B2"} , "creator":"Kim Taerae" , "detail":"taeraetaerae" , "member":["ung","pp","meow"] , "eventid":"12345"};
const event2 = {"starttime":{"hour":"10","min":"20"} , "endtime":{"hour":"24","min":"60"} , "eventname":"Meeing CEE" , "category":{"subject":"COM ENG ESS","color":"#216B39"} , "creator":"Kim Taerae" , "detail":"cupid is dump" , "member":["ung"] , "eventid":"12346"};
const myCalendar = {"2023-19-4":[event1,event2,event2,event2,event2,event2]}

function showDetail(date){
    today = date;
    //create detail bar and initialize headline
    const detailbar = document.createElement('div');
    detailbar.id = "detailbar";
    det.appendChild(detailbar);
    const container = document.createElement('div');
    container.id = "contain-button";
    detailbar.appendChild(container);
    const closebutton = document.createElement('button');
    closebutton.id = "close-button";
    closebutton.innerText = "X";
    closebutton.addEventListener("click",closeDetailBar);
    container.appendChild(closebutton);
    const year = document.createElement('div');
    year.id = "yearbox";
    detailbar.appendChild(year);
    const yeartext = document.createElement('p');
    yeartext.id = "year";
    yeartext.innerHTML = currentyear;
    year.appendChild(yeartext)
    const headline = document.createElement('section');
    headline.id = "headline";
    detailbar.appendChild(headline);
    const headtext = document.createElement('p');
    headtext.id = "date"
    headtext.innerText = currentday+" "+currentdate+" "+currentmonth;
    headline.appendChild(headtext);
    //create mySelectionBox 
    const selection = document.createElement('section');
    selection.id = "selection";
    detailbar.appendChild(selection);
    myselection = selection;
    //map all the event in that day into detailbar
    myCalendar[date].map(showTaskbox);

};
// event = {starttime:{hour:__,min:__},endtime:{hour:__,min:__},
// eventname:__,category:{subject:__,color:__},creator:__,
// detail:___,member:[name1,name2]}
function showTaskbox(event){ 
    //create taskbox
    const taskbox = document.createElement('div');
    taskbox.id = "taskbox";
    selection.appendChild(taskbox);
    //title box
    const title = document.createElement('section');
    title.id = "title";
    taskbox.appendChild(title);
    //element in title box dot + headline + 
    //dot
    const dot = document.createElement('span');
    dot.id = "dot";
    dot.style.backgroundColor = event.category.color;
    title.appendChild(dot);
    //headline name + time 
    const texttitle = document.createElement('div');
    texttitle.id = "texttitle";
    title.appendChild(texttitle);
    //name 
    const name = document.createElement('p');
    name.id = "name";
    name.innerText = event.eventname;
    texttitle.appendChild(name);
    //time
    const time = document.createElement('p');
    if(event.endtime.hour != "24"){
        time.innerText = (event.starttime.hour).concat(".",event.starttime.min," - ",event.endtime.hour,".",event.endtime.min);
    }
    else{
        time.innerText = (event.starttime.hour).concat(".",event.starttime.min);
    }
    time.id = "time";
    texttitle.appendChild(time);
    //detail box 
    const detail = document.createElement('section');
    detail.id = "detail";
    taskbox.appendChild(detail);
    //element in detail box note+member
    const notetitle = document.createElement('p');
    const note = document.createElement('p');
    const parttitle = document.createElement('p');
    const member = document.createElement('p');
    const others= document.createElement('p');
    const detailnote = document.createElement('div');
    notetitle.id = "notetitle";
    note.id = "note";
    notetitle.innerText = "Note : ";
    note.innerText = event.detail;
    detailnote.append(notetitle,note);
    const memberline = document.createElement('div');
    parttitle.id = "parttitle";
    member.id = "member";
    parttitle.innerText = "Participant : ";
    if (event.member.length >= 2){
        member.innerText = event.member[0] + " , " + event.member[1];
    }
    else if (event.member.length == 1){
        member.innerText = event.member[0];
    }
    else{
        member.innerText = "";
    }
    memberline.append(parttitle,member);

    others.id = "others";

    if (event.member.length - 2 > 0){
        others.innerText = "and "+ (event.member.length - 2) + " others";
    }
    else{
        others.innerText = "";
    }
    detail.append(detailnote,memberline,others);
    //delete event
    const deletebutton = document.createElement('button');
    deletebutton.id = "delete-event";
    deletebutton.innerText = "DELETE";
    deletebutton.addEventListener("click",deleteEventHandler);
    taskbox.appendChild(deletebutton)
}

function closeDetailBar(){
    const detailbar = document.getElementById("detailbar");
    detailbar.remove();
}

function deleteEventHandler(eventId){
    //DELETE FROM LIST OF EVENT
    deleteEvent(eventId);
    //fetch new data to the calendar
    //getInfo();
    //refresh calendar 
    //code??
    //refresh detail bar
    closeDetailBar();
    showDetail(today);
}

const deleteEvent = async (eventId) => { 
    const userId  = user_ID;
    const options = {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({
            userId,
        }),
    };
    await fetch(`http://${backendIPAddress}/${eventId}`,options);
};
console.log("test");
showDetail("2023-19-4");

