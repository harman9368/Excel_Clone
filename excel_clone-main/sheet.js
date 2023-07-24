// let btnContainer = document.querySelector(".add-sheet_btn_container");
// let sheetlist = document.querySelector(".sheet-list");
// let firstsheet = document.querySelector(".sheet");
// firstsheet.addEventListener("click", makemeactive);

// btnContainer.addEventListener("click",function(){
//     let allsheets = document.querySelectorAll(".sheet");
//     let lastsheet = allsheets[allsheets.length - 1];
//     let lastinde = lastsheet.getAttribute("idc");
//     lastinde = Number(lastinde);
//     let newsheet = document.createElement("div");
//     newsheet.setAttribute("class","sheet");
//     newsheet.setAttribute("idc" , `${lastinde + 1}`);
//     newsheet.innerText= `Sheet ${lastinde + 2}`;
//     // let sheetlist = document.querySelector("sheet-list");
//     sheetlist.appendChild(newsheet);
//     for(let i=0;i<allsheets.length;i++)
//     {
//         allsheets[i].classList.remove("active");
//     }
//     newsheet.classList.add("active");

//     //new sheet create
//     newsheet.addEventListener("click", makemeactive);
// })

// function makemeactive(e){
//     //event listener add
//     let sheet = e.currentTarget;
//     let allsheets = document.querySelectorAll(".sheet");
//     for( let i=0;i<allsheets.length;i++)
//     {
//         allsheets[i].classList.remove("active");
//     }
//     sheet.classList.add("active");
//     let iidd = sheet.getAttribute("idc");
//     if(!sheetarray[iidd])
//     {
//         createsheet();
//     }
//     sheetDB = sheetarray[iidd];
//       innitui();
// }


 





function innitui() {
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
    
}
