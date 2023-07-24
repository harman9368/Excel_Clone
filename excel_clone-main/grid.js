let leftcol = document.querySelector(".left_col");
let toprow = document.querySelector(".top_row");
let rows = 100;
let cols = 26;
//********************************************left col k liye***************************//
for(let i =0 ; i<rows;i++)
{
     let colbox = document.createElement("div");
     colbox.innerText = i+1;
     colbox.setAttribute("class","box");
     leftcol.appendChild(colbox);
}
//**********************************************A B C D ... k liye**************************//
for (let i  = 0 ; i  < cols ;i++) {
    let cell = document.createElement("div");
    cell.innerText = String.fromCharCode(65+i);
    cell.setAttribute("class","cells");
    toprow.appendChild(cell);
}
//*******************************************grid*************************************** */
let grid = document.querySelector(".grid");
for(let i =0;i<rows;i++)
{
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for(let j =0;j<cols;j++)
    {
        let cell = document.createElement("div");
        // cell.innerText = `${String.fromCharCode(65+j)} ${i+1}`;
        cell.setAttribute("class","cells");
        row.appendChild(cell);
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cell.setAttribute("contenteditable","true");
    }
    grid.appendChild(row);
    // row.innerText = `String.fromCharCode(65+i)`
}
//************************************************************************variables************************************ */
let addressinput = document.querySelector(".address-input");
let boldbtn = document.querySelector(".bold");
let underlinebtn = document.querySelector(".underline");
let italicbtn = document.querySelector(".italic");
let alignbtns = document.querySelectorAll(".align-container>* ")
let fontsizeele = document.querySelector(".font-size");
let fontstyleele = document.querySelector(".font-family");
let formulabar = document.querySelector(".formula-input");
let btnContainer = document.querySelector(".add-sheet_btn_container");
let sheetlist = document.querySelector(".sheet-list");
let firstsheet = document.querySelector(".sheet");
// firstsheet.addEventListener("click", makemeactive);
// firstsheet.click();
let sheetDB;
let sheetarray = [];
firstsheet.addEventListener("click", makemeactive);
firstsheet.click();

//*************************  click hone k baad ******************************// 

btnContainer.addEventListener("click",function(){
    let allsheets = document.querySelectorAll(".sheet");
    let lastsheet = allsheets[allsheets.length - 1];
    let lastinde = lastsheet.getAttribute("idc");
    lastinde = Number(lastinde);
    let newsheet = document.createElement("div");
    newsheet.setAttribute("class","sheet");
    newsheet.setAttribute("idc" , `${lastinde + 1}`);
    newsheet.innerText= `Sheet ${lastinde + 2}`;
    // let sheetlist = document.querySelector("sheet-list");
    sheetlist.appendChild(newsheet);
    for(let i=0;i<allsheets.length;i++)
    {
        allsheets[i].classList.remove("active");
    }
    newsheet.classList.add("active");
    createsheet();
    sheetDB = sheetarray[lastinde + 1];
    setui();
    //new sheet create
    newsheet.addEventListener("click", makemeactive);
})

//***************************************make me active function **************************** */

function makemeactive(e)
{
    //event listener add
    let sheet = e.currentTarget;
    let allsheets = document.querySelectorAll(".sheet");
    for( let i=0;i<allsheets.length;i++)
    {
        allsheets[i].classList.remove("active");
    }
    sheet.classList.add("active");
    let iidd = sheet.getAttribute("idc");
    if(!sheetarray[iidd])
    {
        createsheet();
        // sheetDB = sheetarray[iidd];
    }
    sheetDB = sheetarray[iidd];
      setui();
}

//******************************create sheet function *********************************/

function createsheet(params) {
    let newDB = [];
for(let i =0;i<rows;i++)
{
    let row =[];
    for(let j =0;j<cols;j++)
    {
        let cell = {
            bold:"normal",
            italic:"normal",
            underline:"none",
            hAlign:"left",
            fontFamily:"fantasy",
            fontSize:"14px",
            color:"black",
            bcolor:"none",
            value:" ",
            formula:" ",
            children: []
        };
        let elem = document.querySelector(`.grid .cells[rid = '${i}'][cid = '${j}']`);
      elem.innerText="";
        row.push(cell);
    }
    newDB.push(row);
    }
    sheetarray.push(newDB);
}
//**************************************************************** 2 way binding****************************** */
//**************************************************cell k hisaab se toolbar pe actions show honge********************** */
let allcells = document.querySelectorAll(".grid .cells");
for(let i = 0;i<allcells.length;i++)
 {
     allcells[i].addEventListener("click",function(){
         let rid = allcells[i].getAttribute("rid");
         let cid = allcells[i].getAttribute("cid");
         rid = Number(rid);
        cid = Number(cid);
         let address = `${String.fromCharCode(65 + cid)}${rid + 1}`;
         addressinput.value = address;
        let cellobj=sheetDB[rid][cid];
        if(cellobj.bold == "normal")
        {
            boldbtn.classList.remove("active-btn");
        }
        else{
            boldbtn.classList.add("active-btn"); 
        }
        if(cellobj.underline=="none")
        {
            underlinebtn.classList.remove("active-btn");

        }
        else{
            underlinebtn.classList.add("active-btn");
        }
        if(cellobj.italic=="normal")
        {
            italicbtn.classList.remove("active-btn");

        }
        else{
            italicbtn.classList.add("active-btn");
        }
        if(cellobj.formula)
        {
            formulabar.value = cellobj.formula;
        }
        else{
            formulabar.value = "";
        }


     })
 }

//**********************************bold button************************************** */

 boldbtn.addEventListener("click",function(){
   
    let uicell = finduicell();  
    let cid = uicell.getAttribute("cid");
    let rid = uicell.getAttribute("rid");
    let cellobj = sheetDB[rid][cid];
    if(cellobj.bold == "normal")
    {   
        uicell.style.fontWeight="bold";
        boldbtn.classList.add("active-btn");
        cellobj.bold="bold";
    }
    else{
        boldbtn.classList.remove("active-btn");
        uicell.style.fontWeight="normal";
        cellobj.bold="normal";

    }
    

 })

 //**********************************************underline button******************************** */

 underlinebtn.addEventListener("click",function(){
   
    let uicell = finduicell();  
    let cid = uicell.getAttribute("cid");
    let rid = uicell.getAttribute("rid");
    let cellobj = sheetDB[rid][cid];
    if(cellobj.underline == "none")
    {   
        uicell.style.textDecoration = "underline";
        underlinebtn.classList.add("active-btn");
        cellobj.underline="underline";
    }
    else{
        underlinebtn.classList.remove("active-btn");
        uicell.style.textDecoration = "none";
        cellobj.underline="none";

    }
    // uicell.style.textDecoration = "underline";


 })

//***************************************italic button********************** */

 italicbtn.addEventListener("click",function(){
   
    let uicell = finduicell();
      
    let cid = uicell.getAttribute("cid");
    let rid = uicell.getAttribute("rid");
    let cellobj = sheetDB[rid][cid];
    if(cellobj.italic == "normal")
    {   
        uicell.style.fontStyle = "italic";
        italicbtn.classList.add("active-btn");
        cellobj.italic="italic";
    }
    else{
        italicbtn.classList.remove("active-btn");
        uicell.style.fontStyle = "normal";
        cellobj.italic="normal";
    }
    // uicell.style.fontStyle = "italic";


 })
//*******************************************alignment**********************************//
for(let i=0;i<alignbtns.length;i++)
{
    alignbtns[i].addEventListener("click",function () {
        let alignment = alignbtns[i].getAttribute("class");
        let uicell = finduicell();  
        let hardik = alignment.substring(39);
        // console.log(alignment.substring(2,3);
        uicell.style.textAlign = hardik;
    })
}
//**********************************************fontsize***********************************//
 fontsizeele.addEventListener("change",function(){
     let val = fontsizeele.value;
     let uicell = finduicell();  
     uicell.style.fontSize = val + "px";

 })
 //**************************************************fontfamily********************************//
 fontstyleele.addEventListener("change",function(){
    let val1 = fontstyleele.value;
    let uicell = finduicell();  
    uicell.style.fontFamily = val1;

})

//*****************ui pe set function************************** */

function setui(){
    // let grid = document.querySelector(".grid");
for(let i =0;i<rows;i++)
{  
    for(let j =0;j<cols;j++)
    {
    let elem = document.querySelector(`.grid .cells[rid = '${i}'][cid = '${j}']`);
    let value = sheetDB[i][j].value
      elem.innerText= value;
    }
 }
    
}


// // let body = document.querySelector("body");
// let bgcolor_selector = document.querySelector(".bg-color");
//  let textcolor_selector = document.querySelector(".textcolor");
// bgcolor_selector.addEventListener("click", function (e) {
//   let colorPicker = document.createElement("input");
//   colorPicker.type = "color";
//   body.append(colorPicker);
//   colorPicker.click();
//   colorPicker.addEventListener("input", function (e) {
//     let color_chosen = e.currentTarget.value;
//     if (last_highlighted_cell != undefined) {
//       last_highlighted_cell.style.backgroundColor = color_chosen;
//       data_obj[last_highlighted_cell.getAttribute("data-address")].bgcolor =
//         color_chosen;
//     }
//   })})

//   textcolor_selector.addEventListener("click", function (e) {
//     let colorPicker = document.createElement("input");
//     colorPicker.type = "color";
//     body.append(colorPicker);
//     colorPicker.click();
//     colorPicker.addEventListener("input", function (e) {
//       let color_chosen = e.currentTarget.value;
//       if (last_highlighted_cell != undefined) {
//         last_highlighted_cell.style.color = color_chosen;
//         data_obj[last_highlighted_cell.getAttribute("data-address")].color =
//           color_chosen;
//       }
//     });
//   });
let tectcolor = document.querySelector(".material-icons-outlined.material-icons.color");
let kulpreet = document.querySelector(".color");
let bhardik = document.querySelector(".material-icons-outlined.material-icons.bg-color");
let hardikop = document.querySelector(".bg-color");
bhardik.addEventListener("click",function () {
    hardikop.click();
})

tectcolor.addEventListener("click",function(){
    kulpreet.click();
})

kulpreet.addEventListener("change", function() {
    let val = kulpreet.value;
    let uicell = finduicell();
    let ourcell = sheetDB[uicell.getAttribute("rid") - 1][uicell.getAttribute("cid").charCodeAt(0) - 65];
    uicell.style.color = val;
    ourcell.color = val;
})

hardikop.addEventListener("change", function() {
    let val = hardikop.value;
    let uicell = finduicell();
    let ourcell = sheetDB[uicell.getAttribute("rid") - 1][uicell.getAttribute("cid").charCodeAt(0) - 65];
    uicell.style.backgroundColor = val;
    ourcell.bcolor = val;
})