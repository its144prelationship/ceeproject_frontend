var student_name;
var student_id;
var profilepic
var myCalendar;
var myCourse;
var currentmonth;
var currentyear;
var currentdate;

const getInfo = async () => { //fetch from backend 
    const options = {
        method: "GET",
        Credential: "include",
    };
    await fetch('http://${backendIPAddress}/items',options).then((response) => response.json())
    .then((data) =>{
        const info = data;
        student_name = info.username;
        student_id = info.id;
        profilepic = info.pic;
        myCalendar = info.calendar;
        myCalendar = info.course
    })
    .catch((error) => console.error(error));
}

function showList() { //show each chechlist
    const filterlist = document.getElementById("selection");
    filterlist.innerHTML = "";
    myCourse.map((category) => {
        filterlist.innerHTML += `
        <div class="eachrow">
            <button class="checkbox"></button>
            <p class="subject">${category.name}</p>
            <span class="dot"></span>
        </div>
        <style>
            .dot{
                height: 12.5px;
                width: 12.5px;
                background-color: ${category.color};
                box-shadow: 0 1px 5px #c8c9a5;
                border-radius: 50%;
                display: inline-block;
                margin: 1.5%;
            }
        </style>
        `;
    });
}

/*function addFilter(category){ //apply the filter in calendar
    for(var i in myCalendar){
        if(i.year > currentyear) and (i.month > currentmonth){
            break
        }
        if (i.year > currentyear) and (i.date > currentdate){
            break
        }
        if(i.year == currentyear) and (i.month==currentmonth) and (i.data==currentdate){
            addToCalendar()
        }
        
    }

};*/


function addAll(subject){ //show all event in calendar
    //test
    console.log("de")
    const check = document.getElementById(subject)
    if (check.textContent == ""){
        const check = document.getElementById(subject)
        check.textContent = "✓"
        const thislist = document.getElementById('filterbar')
        thislist.innerHTML +=  "hello"
    }
    else{
        check.textContent = ""
    }
    /*for(i in myCourse){
        addFilter(i)
    }*/
}
//addList()
document.getElementById("COM ENG ESS").addEventListener("click",addAll("COM ENG ESS"))
document.getElementById("GEN PHY II").addEventListener("click",addAll("GEN PHY II"))
document.getElementById("GEN CHEM").addEventListener("click",addAll("GEN CHEM"))
//document.querySelector('.checkbox').addEventListener('click',addFilter(document.getElementById('.subject')))
//document.querySelector('.allcheckbox').addEventListener('click',addAll)