for(let i =0;i<allcells.length;i++)
{
 
    allcells[i].addEventListener("blur",function(){
    let data = allcells[i].innerText;
    let address = addressinput.value;
    // cellobj.value=data;
    let rid = allcells[i].getAttribute("rid");
    let cid = allcells[i].getAttribute("cid");
    // cellobj.value=data;
    // let {rid,cid} = getridcidfromaddress(address); 
    let cellobj = sheetDB[rid][cid];
    if(cellobj.value==data)
    {
        return;
    }
    if(cellobj.formula)
    {
        removeformula(cellobj,address);
    }

    cellobj.value=data;
    updatechildren(cellobj);
    })
}

formulabar.addEventListener("keydown",function(e){
    if(e.key == "Enter" && formulabar.value)
    {
        let currentformula = formulabar.value;
        let address = addressinput.value;
        let {rid,cid} = getridcidfromaddress(address);
        let cellM = sheetDB[rid][cid];
        if(currentformula != cellM.formula)
    {
    removeformula(cellM,address);
    formulabar.value = "";
    }

        let value = evaluateformula(currentformula);
        // let address = addressinput.value;
    
        // let {rid,cid} = getridcidfromaddress(addressinput.value);
        setcell(value,currentformula);
        // setchildrencell(value,currentformula,rid,cid);
        setParentCHarray(currentformula,address);
        updatechildren(cellobj);
    }

})

function evaluateformula(formula) 
{
    let formulatokens = formula.split(" ");
    for(let i=0;i<formulatokens.length;i++)
    {
        let ascii = formulatokens[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90)
        {
            let {rid,cid} = getridcidfromaddress(formulatokens[i]);
             let k = sheetDB[rid][cid].value;       
            formulatokens[i] = k;
        }
    }
    let evaluatedformula = formulatokens.join(" ");
    return eval(evaluatedformula);
}

function setcell(value,formula){
    let uicellele = finduicell();
    uicellele.innerText = value;
    // addressinput.value = address;
    let {rid,cid} = getridcidfromaddress(addressinput.value);
    sheetDB[rid][cid].value = value;
    sheetDB[rid][cid].formula = formula;
}


function finduicell() {
    let address = addressinput.value;
     let ridcidobj = getridcidfromaddress(address);
     let rid = ridcidobj.rid;
     let cid = ridcidobj.cid;
     let uicell = document.querySelector(`.cells[rid = "${rid}"][cid = "${cid}"]`);
     return uicell; 
}

function getridcidfromaddress(address)
{
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    return {"rid":rid, "cid":cid};
}

 function setParentCHarray(formula,chaddress)
{
    let formulatokens = formula.split(" ");
    for(let i=0;i<formulatokens.length;i++)
    {
        let ascii = formulatokens[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90)
        {
            let {rid,cid} = getridcidfromaddress(formulatokens[i]);
            let parentobj = sheetDB[rid][cid];
            parentobj.children.push(chaddress);
            
        }
    }
}
function updatechildren(cellobj){
    let children = cellobj.children;
    for(let i=0;i<children.length;i++)
    {
        let chAddress= children[i];
         let { rid,cid } = getridcidfromaddress(chAddress);
         let childobj = sheetDB[rid][cid];
         let chformula = childobj.formula;
         let newvalue = evaluateformula(chformula);
         setchildrencell(newvalue,chformula,rid,cid);
         updatechildren(childobj); 
    }
}
function setchildrencell(value,formula,rid,cid){
    // let uicellele = finduicell();
    // uicellele.innerText = value;
    // addressinput.value = address;
    // let {rid,cid} = getridcidfromaddress(addressinput.value);
    let uicellele = document.querySelector(`.cells[rid = "${rid}"][cid = "${cid}"]`);
    uicellele.innerText = value;
    sheetDB[rid][cid].value = value;
    sheetDB[rid][cid].formula = formula;   
}

function removeformula(cellobj,myname)
{   
    let formula = cellobj.formula;
    let formulatokens = formula.split(" ");
    for(let i=0;i<formulatokens.length;i++)
    {
        let ascii = formulatokens[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90)
        {
            let {rid,cid} = getridcidfromaddress(formulatokens[i]);
            let parentobj = sheetDB[rid][cid];
            let idp = parentobj.children.indexOf(myname);
            parentobj.children.splice(idp,1);
        }
    }
    cellobj.formula = "";
}