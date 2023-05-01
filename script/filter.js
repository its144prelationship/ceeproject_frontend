
// var student_name;
var student_id;
var user_ID
// var myCalendar;
var myCourse = ["COM ENG ESS","GEN PHY II","CALCULAS"];
var myCategory = {"COM ENG ESS":"#5C1999", "GEN PHY II":"#0097B2" , "CALCULAS":"#4256B2","CALCUsLAS":"#4256B2","CALwCULAS":"#4256B2","CALCULAS":"#4256B2","CALCweULAS":"#4256B2","CALCULAwddeS":"#4256B2",
"CAdedeLCULAS":"#4256B2","CALCUwewLAS":"#4256B2","CALCULdeAS":"#4256B2","qwCALCULAS":"#4256B2","CALCqwULAS":"#4256B2","C11ALCULAS":"#4256B2"}; // {CEM:blue,CEE:green}
var filCalendar;
var currentmonth;
var currentyear;
var currentdate;
var currentday;
var mySelectList;
// const containfilter = document.getElementById('contain-filter');
const Color = ["#5C1999","#0097B2","#4256B2","#216B39","#67AB3D","#FFFD61","#FFAE34","#C45454","#DDD8D8","#62462C","#9B8809","#FFA6F9","#F48F6A","#A8E0FF","#FFFFFF"]

const getInfo = async () => { //fetch from backend 
    const backendIPAddress =  "127.0.0.1:3000";
    const options = {
        method: "GET",
        credentials: "include",
    };
    await fetch(`http://${backendIPAddress}/`,options).then((response) => response.json())
    .then((data) =>{
        console.log(data);
        // const info = data;
        // user_ID = info.userId;
        // student_name = info.username;
        // student_id = info.id;
        // myCalendar = info.calendar;
        // myCourse = info.course;
        // mapColor();
    })
    .catch((error) => console.error(error));
}

function mapColor(){
    var i =  0;
    for(each in myCourse){
        myCategory[each] = Color[i];
        i++;
    }
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
            filCalendar = {}
            const box = document.querySelectorAll('#eachrow #checkbox');
            box.forEach(box => {
                box.innerText = "";
            })
        }
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
        }
        else{
            checkbox.innerText = "";
            removeFilter(category);
            const box = document.getElementById('allcheckbox');
            box.innerText = "";

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
    const temp = {};
    for (date in filCalendar){ //2023-08-14
        var thisdate = date.split("-");
        var year = thisdate[0];
        var month = thisdate[1];
        var day = thisdate[2];
        if((parseInt(year)==currentyear) && (parseInt(month)==currentmonth)){
            var tmp = [];
            for(task in date){
                if(task.category == category){
                    tmp.push(task);
                }
            }
            if(tmp.length != 0){
                temp[date] = tmp;
            }
        }
    }
    filCalendar = temp;
}

function applyAll(){
   const temp = {};
   for (date in myCalendar){ //2023-08-14
       var thisdate = date.split("-");
       var year = thisdate[0];
       var month = thisdate[1];
       var day = thisdate[2];
       if((parseInt(year)==currentyear) && (parseInt(month)==currentmonth)){
            temp[date] = myCalendar[date];
       }
   }
   filCalendar = temp;
}


function removeFilter(category){
    var temp = {};
    for(date in filCalendar){
        var tmp = [];
        for(task in date){
            if(task.category != category){
                tmp.push(task);
            }
        }
        temp[date] = tmp;
    }
    filCalendar = temp;
}
getInfo();
showList();