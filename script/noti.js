// var myNoti;
var student_name;
var student_id;
var user_ID;
var myCourse;
var currentday = "TUE";
var currentmonth = "APR";
var currentyear = 2023;
var currentdate = 19;
var myNotiList;
var today;
var myCategory = {"COM ENG ESS":"#5C1999", "GEN PHY II":"#0097B2" , "CALCULAS":"#4256B2","CALCUsLAS":"#4256B2","CALwCULAS":"#4256B2","CALCULAS":"#4256B2","CALCweULAS":"#4256B2","CALCULAwddeS":"#4256B2",
"CAdedeLCULAS":"#4256B2","CALCUwewLAS":"#4256B2","CALCULdeAS":"#4256B2","qwCALCULAS":"#4256B2","CALCqwULAS":"#4256B2","C11ALCULAS":"#4256B2"}; // {CEM:blue,CEE:green}
const noticontain = document.getElementById('noticontain');
// 1 invite = {eventname,eventid,date,starttime,stoptime,category}
const invite1 = {"creator":"ung","eventname":"Meetine CEE","eventId":"12345","date":"TUE 19 APR 2023","starttime":{"hour":"20","min":"00"},"endtime":{"hour":"21","min":"00"},"category":"COM ENG ESS"};
const myNoti = [invite1,invite1,invite1,invite1];

const getNoti = async () => {
    const options = {
        method: "GET",
        credentials: "inclue",
    };
    await fetch('http://${backendIPAddress}/invites',options).then((response) => response.json())
    .then((data) => {
        myNoti = data;
    })
    .catch((error) => console.error(error));
}

function showNoti() {
    //initialize notibar
    const notibar = document.createElement('div');
    notibar.id = "notibar";
    noticontain.appendChild(notibar);
    const closebutton = document.createElement('button');
    closebutton.id = "close-button";
    closebutton.innerText = "X";
    closebutton.addEventListener("click",closeNotibar);
    notibar.appendChild(closebutton);
    //init headline box title + ​logo
    const headline = document.createElement('div');
    headline.id = "headline-noti";
    notibar.appendChild(headline);
    //title-box
    const titlebox = document.createElement('div');
    titlebox.id = "titlebox";
    const title = document.createElement('p');
    title.id = "title-noti";
    title.innerText = "Notification";
    titlebox.appendChild(title)
    //add logo
    const notipress = document.createElement('button');
    notipress.id = ""
    const noti_logo = document.createElement('img');
    noti_logo.id = "noti-logo";
    noti_logo.src = "../image/noti-icon.png";
    headline.append(titlebox,noti_logo);
    //init invite-container
    const invite_container = document.createElement('div');
    invite_container.id = "invite-container";
    notibar.appendChild(invite_container);
    myNotiList = invite_container;
    //add each invite 
    for(var i =0 ; i<myNoti.length ;i++){
        addNoti(myNoti[i]);
    }
}

function addNoti(invite){
    //create invite box
    const invitebox = document.createElement('div');
    invitebox.id = "invitebox";
    myNotiList.appendChild(invitebox);
    //add message
    const message = document.createElement('p');
    message.id = "message";
    message.innerText = invite.creator + " has invited you to join";
    //add eventname
    const eventname_invite = document.createElement('div');
    eventname_invite.id = "eventname-invite";
    const dot = document.createElement('span');
    dot.id = "dot-invite";
    dot.style.backgroundColor = myCategory[invite.category];
    const eventname = document.createElement('p');
    eventname.id = "name-invite";
    eventname.innerText = invite.eventname;
    eventname_invite.append(dot,eventname);
    //add date-box
    const datebox = document.createElement('div');
    datebox.id = "date-box";
    const datetitle = document.createElement('p');
    datetitle.id = "date-title";
    datetitle.innerText = "Date :";
    const dateinvite = document.createElement('p');
    dateinvite.id = "date-invite";
    dateinvite.innerText = invite.date;
    datebox.append(datetitle,dateinvite);
    //add time-box
    const timebox = document.createElement('div');
    timebox.id = "time-box";
    const timetitle = document.createElement('p');
    timetitle.id = "time-title";
    timetitle.innerText = "Time :";
    const timeinvite = document.createElement('p');
    timeinvite.id = "time-invite";
    if(invite.endtime.hour !== "24"){
        timeinvite.innerText = (invite.starttime.hour).concat(".",invite.starttime.min," - ",invite.endtime.hour,".",invite.endtime.min);
    }
    else{
        timeinvite.innerText = time.innerText = (invite.starttime.hour).concat(".",invite.starttime.min);
    }
    timebox.append(timetitle,timeinvite);
    //add responsebox
    const responsebox = document.createElement('div');
    responsebox.id = "response-invite";
    const accept_button = document.createElement('button');
    accept_button.id = "accept-button";
    accept_button.innerText = "Accept";
    //accept_button.addEventListener("click",acceptHandler(invite));
    const reject_button = document.createElement('button');
    reject_button.id = "reject-button";
    reject_button.innerText = "Reject";
    //reject_button.addEventListener("click",rejectHandler(invite));
    responsebox.append(accept_button,reject_button);
    //add all
    invitebox.append(message,eventname_invite,datebox,timebox,responsebox);
}

function closeNotibar(){
    const notibar = document.getElementById("notibar");
    notibar.remove();
}

const acceptREQ = async (invite) => {
    const event_id = invite.eventId;
    const options ={
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            user_ID,
            event_id,
        }),
    };
    await fetch(`http://${backendIPAddress}/event`,options);
}

const deleteNoti = async(eventId) => {
    const options ={
        method: "DELETE",
        credentials: "include",
    };
    await fetch(`http://${backendIPAddress}/invites/${eventId}`,options);
}

function acceptHandler(invite){
    //acceptREQ(invite);
    //deleteNoti(invite.eventId);
    closeNotibar();
    showNoti();
}

function rejectHandler(invite){
    //deleteNoti(invite.eventId);
    closeNotibar();
    showNoti();
}

