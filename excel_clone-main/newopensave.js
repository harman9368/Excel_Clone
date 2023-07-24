let save = document.querySelector(".save")
// let open1 = document.querySelector(".open");
let op = document.querySelector(".material-icons-outlined.material-icons.open");
save.addEventListener("click",function(){
   //string mein convert
    const data = JSON.stringify(sheetDB);
    //convert the data
    const blob = new Blob([data], {type: 'application/json'});
    //url generate
    const url = window.URL.createObjectURL(blob);
    //anchor element-> creates a hyperlink
    let a = document.createElement("a");
    a.download = "sheet_download.json";
    //hyperling has url
    a.href = url;
    a.click();
})

// op.addEventListener("click",function () {
//     let open1 = document.querySelector(".open");
//     open1.click();
//     open1.addEventListener("change",function (){ 
//         //opens the list of files
//         let filesArray = open.files;
//         //fileobj created
//         let fileobj = filesArray[0];
//         //reading the file
//         let fr = new FileReader(fileobj);
//         //convert to text
//         fr.readAsText(fileobj);
//         //file is loaded or not 
//         fr.onload = function () {
//             console.log(fr.result);
//         }
//     })
// }
//     )
    
    


// open.addEventListener("change",function (){ 
//     //opens the list of files
//     let filesArray = open.files;
//     //fileobj created
//     let fileobj = filesArray[0];
//     //reading the file
//     let fr = new FileReader(fileobj);
//     //convert to text
//     fr.readAsText(fileobj);
//     //file is loaded or not 
//     fr.onload = function () {
//         console.log(fr.result);
//     }

    
// })

// function hd()
// {
//       //opens the list of files
//       let filesArray = open.files;
//       //fileobj created
//       let fileobj = filesArray[0];
//       //reading the file
//       let fr = new FileReader(fileobj);
//       //convert to text
//       fr.readAsText(fileobj);
//       //file is loaded or not 
//       fr.onload = function () {
//           console.log(fr.result);
// }}

op.addEventListener("click", function() {
    let choose = document.createElement("input");
    choose.setAttribute("type", "file");
    choose.click();
    choose.addEventListener("change", function() {
        let filesarray = choose.files;
        let filesarrayobj = filesarray[0];
        let fr = new FileReader(filesarrayobj);
        fr.readAsText(filesarrayobj);
        fr.onload = function() {
            let result = JSON.parse(fr.result);
            // let dbidx = sheetarray.indexOf(sheetarray);
            for (let i = 0; i < result.length; i++) {
                sheetDB[i] = result[i];
            }
            setui();
        }
    })
})