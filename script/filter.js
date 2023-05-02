
// var student_name;
var student_id;
var user_ID
var myCourse = [];
var myCategory = {};
var currentmonth;
var currentyear;
var currentdate;
var currentday;
var mySelectList;
var myFullcalendar;
var filCalendar;
// const containfilter = document.getElementById('contain-filter');
const Color = ["#5C1999","#0097B2","#4256B2","#216B39","#67AB3D","#FFFD61","#FFAE34","#C45454","#DDD8D8","#62462C","#9B8809","#FFA6F9","#F48F6A","#A8E0FF","#FFFFFF"]

const getInfo = async () => { //fetch from backend 
    const backendIPAddress =  "127.0.0.1:3000";
    const options = {
        method: "GET",
        credentials: "include",
    };
    await fetch(`http://${backendIPAddress}/`,options)
    .then((response) => response.json())
    .then((data) =>{
        console.log(data);
        const info = data;
        user_ID = info.userId;
        student_name = info.name;
        student_id = info.studentId;
        setmyCalendar(info.myCalendar);
        myFullcalendar = info.myCalendar;
        myCourse = info.myCourse;
        if(!("myEvent" in myCourse)){
            myCourse.push("myEvent");
        }
        myNoti = info.noti;
        mapColor();
        const displayid = document.getElementById('userid');
        displayid.innerText = student_id;
        const displayname = document.getElementById('usernamed');
        displayname.innerText = student_name;
    })
    .catch((error) => console.error(error));
}

function mapColor(){
    console.log(myCourse);
    var i =  0;
    for(let each of myCourse){
        myCategory[each] = Color[i];
        i++;
    }
    // myCourse.forEach(element => {
    //     myCategory[elemrn]
    // });
}

function showList() { //show each chechlist
    const containfilter = document.getElementById('contain-filter');
    if(containfilter.children.length > 1){return;}
    else if (containfilter.children.length == 1){
        containfilter.style.display = "block";
        return;
    }
    //init filterbar
    const filterbar = document.createElement('div');
    filterbar.id = "filterbar";
    filterbar.style.display = "block";
    containfilter.appendChild(filterbar);
    //create headline
    const headline = document.createElement('section');
    headline.id = "headline-filter";
    filterbar.appendChild(headline);
    //add title
    const title = document.createElement('p');
    title.id = "title-filter";
    title.innerText = "Filter your calendar !"
    headline.appendChild(title);
    //init all 
    const eachrow = document.createElement('div');
    eachrow.id = "eachrow";
    filterbar.appendChild(eachrow);
    //add checkall
    const checkall = document.createElement('button');
    checkall.id = "allcheckbox";
    checkall.innerText = "✓";
    checkall.addEventListener("click",() => {
        if(checkall.innerText !== "✓"){
            // console.log("ffff");
            checkall.innerText = "✓";
            applyAll();
            const box = document.querySelectorAll('#eachrow #checkbox');
            box.forEach(box => {
                box.innerText = "✓";
            })
        }
        else{
            checkall.innerText = "";
            myCalendar = {};
            removeAllFilter();
            const box = document.querySelectorAll('#eachrow #checkbox');
            box.forEach(box => {
                box.innerText = "";
            })
        }
        load();
    });
    const subject = document.createElement('p');
    subject.id = "subject";
    subject.innerText = "ALL";
    eachrow.append(checkall,subject);
    //selection list
    const select_list = document.createElement('section');
    select_list.id = "selection-list"
    filterbar.appendChild(select_list);
    mySelectList = select_list;
    //init each row
    for(sub in myCategory){
        addList(sub);
    }
    applyAll();
}


function addList(category){
    const eachrow = document.createElement('div');
    eachrow.id = "eachrow";
    mySelectList.appendChild(eachrow);
    //add checkbox
    const checkbox = document.createElement('button');
    checkbox.id = "checkbox";
    checkbox.innerText = "✓";
    //add handler
    checkbox.addEventListener("click",() => {
        if(checkbox.innerText !== "✓"){ //if selected
            checkbox.innerText = "✓";
            applyFilter(category);
            load();
        }
        else{
            checkbox.innerText = "";
            removeFilter(category);
            const box = document.getElementById('allcheckbox');
            box.innerText = "";
            load();
        }
    });
    eachrow.appendChild(checkbox);
    //add text
    const subject = document.createElement('p');
    subject.id = "subject";
    subject.innerText = category;
    //add dot color
    const dot_filter = document.createElement('span');
    dot_filter.id = "dot-filter"
    dot_filter.style.backgroundColor = myCategory[category];
    eachrow.append(dot_filter,subject);
}


function deleteFilterBar() {
    var containfilter = document.getElementById('contain-filter');
    const filterbar = document.getElementById("filterbar");
    containfilter.style.display = "none";
    // containfilter.remove(filterbar);

    // const box = document.querySelectorAll('#contain-filter #filterbar');
    //     box.forEach(box => {
    //         containfilter.remove(box);
    // })
}

function applyFilter(category){
    const temp = myCalendar;
    for (date in myFullcalendar){ //2023-08-14
        var thisdate = date.split("-");
        var year = thisdate[0];
        var month = thisdate[1];
        var day = thisdate[2];
        if((parseInt(year)==today_year) && (parseInt(month)==today_month)){
            var tmp = myCalendar[date];
            for(let task of myFullcalendar[date]){
                if(task.category == category){
                    tmp.push(task);
                }
            }
            if(tmp.length != 0){
                temp[date] = tmp;
            }
        }
    }
    myCalendar = temp;
}

function applyAll(){
   const temp = {};
   for (date in myFullcalendar){ //2023-08-14
       var thisdate = date.split("-");
       var year = thisdate[0];
       var month = thisdate[1];
       var day = thisdate[2];
       if((parseInt(year)==today_year) && (parseInt(month)==today_month)){
            temp[date] = myFullcalendar[date];
       }
   }
   myCalendar = temp;
}


function removeFilter(category){
    var temp = {};
    for(date in myCalendar){
        console.log(myCalendar[date]);
        var tmp = [];
        for(let task of myCalendar[date]){
            console.log(task);
            if(task.category != category){
                tmp.push(task);
            }
        }
        temp[date] = tmp;
    }
    myCalendar = temp;
}

function removeAllFilter(){
    var temp = {};
    myCalendar = temp;
}

function getFillcalendar() {
    return filCalendar;
}
// await getInfo();
// showList();
// load();
