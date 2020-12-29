var nameInput=document.getElementById("name");
var urlInput=document.getElementById("url");
var addBtn=document.getElementById("addBtn");
var inputData=document.getElementsByClassName("form-control");
var newWebsite;
if(localStorage.getItem("webList")==null)
{
    newWebsite=[];    
}
else {
    newWebsite=JSON.parse(localStorage.getItem("webList"));
    displayData();
}
addBtn.onclick=function()
{
    addWebsite();
    
}
function addWebsite()
{
    var website=
        {
            name:nameInput.value,
            url:urlInput.value,
        }
    newWebsite.push(website);
    localStorage.setItem("webList",JSON.stringify(newWebsite));
    displayData();
    clearData();

}
function displayData()
{
    var divs="";
    for(var i=0;i<newWebsite.length;i++)
    {  divs+=
        `<div class="d-flex justify-content-around">
        <h3>${newWebsite[i].name}</h3>
        <button class="btn btn-secondary" onclick="editWeb(${i})">edit</button>
        <button class="btn btn-danger" onclick="deleteWeb(${i})">delete</button>
        <a class="btn btn-primary" add target="_blank"  href="http://${newWebsite[i].url}">visit</a>

        

        </div>`
    }
    document.getElementById("divBody").innerHTML=divs;
}
function clearData()
{
  for(var i=0;i<inputData.length;i++)
  {
      inputData[i].value="";
  }
}
function deleteWeb(index)
{
    newWebsite.splice(index,1);
    displayData();
    localStorage.setItem("webList",JSON.stringify(newWebsite));
}
function editWeb(index)
{
    nameInput.value=newWebsite[index].name;
    urlInput.value=newWebsite[index].url;
    document.getElementById("addBtn").innerHTML="Update";

    
    addBtn.onclick=function()
    {
        newWebsite[index].name=nameInput.value;
        newWebsite[index].url=urlInput.value;
        localStorage.setItem("webList",JSON.stringify(newWebsite));
        displayData();
        clearData();
        document.getElementById("addBtn").innerHTML="Submit";
        addBtn.onclick = addWebsite;
       

    }

}
function search(searchTxt){
    var divs="";
    for(var i=0;i<newWebsite.length;i++)

    { 
        if(newWebsite[i].name.toLowerCase().includes(searchTxt.toLowerCase()))
        {
        
        divs+=
        `<div class="d-flex justify-content-around">
        <h3>${newWebsite[i].name}</h3>
        <button class="btn btn-secondary" onclick="editWeb(${i})">edit</button>
        <button class="btn btn-danger" onclick="deleteWeb(${i})">delete</button>
        <a class="btn btn-primary" add target="_blank"  href="http://${newWebsite[i].url}">visit</a>

        

        </div>`
        }
    }
    document.getElementById("divBody").innerHTML=divs;

}
 nameInput.onkeyup=function(){
     var nameRegex=/^[a-zA-Z]{3,20}$/;
     if (nameRegex.test(nameInput.value)==false)
     {
         addBtn.disabled="true";

     }
     else {
         addBtn.removeAttribute("disabled");
     }
 }
 urlInput.onkeyup=function(){
    var urlRegex=/^((http|https):\/\/)?(www\.)?[\w-@:%._\+~#=(^www)]{2,256}\.[a-z]{2,6}([\w-@:%._\+~#=?&//=]*)$/;
    if (urlRegex.test(urlInput.value)==false)
    {
        addBtn.disabled="true";

    }
    else {
        addBtn.removeAttribute("disabled");
    }
}

