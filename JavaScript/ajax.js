code="IVXW8Xdsa123";
url="http://gamf.nhely.hu/ajax2/";
async function read() {
  document.getElementById("code").innerHTML="code="+code;
  let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  console.log(data);
  let list = data.list;
  console.log(list);
  str="<H1>Rekordok</H1>";
  str+="<p>Adatok száma: "+data.rowCount+"</p>";
  str+="<p>Utolsó 100 rekord:</p>";
  str+="<table><thead><tr><td>id</td><td>Név</td><td>Magasság</td><td>Súly</td><td>code</td></tr></thead>";
  for(let i=0; i<list.length; i++)
    str += "<tr><td>"+list[i].id+"</td><td>"+list[i].name+"</td><td>"+list[i].height+" cm</td><td>"+list[i].weight+" kg</td><td>"+list[i].code+"</td></tr>";
  str +="</table><p>Magasság összege: ";
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += parseInt(list[i].height);
  }
  let avg = list.length > 0 ? parseFloat((sum/list.length).toFixed(2)) : "Nincs adat";
  let szamok = list.map(item => Number(item.height));
  let max = list.length > 0 ? Math.max(...szamok) : "Nincs adat";
  if(list.length > 0) 
    str += sum+" cm</p><p>Magasság átlaga: " + avg + " cm</p><p>Legnagyobb magasság: " + max + "cm</p>";
  else 
    str +="Nincs adat</p><p>Magasság átlaga: " + avg + "</p><p>Legnagyobb magasság: " + max + "</p>";
  document.getElementById("readDiv").innerHTML=str;
}

async function create(){
  nameStr = document.getElementById("name1").value;
  height = document.getElementById("height1").value;
  weight = document.getElementById("weight1").value;
  if(nameStr.length>0 && nameStr.length<=30 && height.length>0 && height.length<=30 && weight.length>0 && weight.length<=30 && code.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=create&name="+nameStr+"&height="+height+"&weight="+weight
    });
    let data = await response.text(); 
    if(data>0)
      str="Sikeres adatrögzítés!";
    else
    str="Nem sikerült rögzíteni az adatot!";
    document.getElementById("createResult").innerHTML=str;
    document.getElementById("name1").value="";
    document.getElementById("height1").value="";
    document.getElementById("weight1").value="";
    read();
  }
  else
    document.getElementById("createResult").innerHTML="Nem megfelelő adat!!";
}

async function getDataForId() {
    let response = await fetch(url, {
        method: 'post',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "code="+code+"&op=read"
    });
    let data = await response.text();
    data = JSON.parse(data);
    let list = data.list;
    
    let found = false;
    for(let i=0; i<list.length; i++) {
        if(list[i].id==document.getElementById("idUpd").value){
            found = true;
            document.getElementById("name2").style="visibility: visible;"
            document.getElementById("height2").style="visibility: visible;"
            document.getElementById("weight2").style="visibility: visible;"   
            document.getElementById("name2").value=list[i].name;
            document.getElementById("height2").value=list[i].height;
            document.getElementById("weight2").value=list[i].weight;
            document.getElementById("updateResult").innerHTML = "";
        }
    }
    
    if (!found) {
        document.getElementById("name2").style="visibility: hidden;"
        document.getElementById("height2").style="visibility: hidden;"
        document.getElementById("weight2").style="visibility: hidden;"   
        document.getElementById("name2").value="";
        document.getElementById("height2").value="";
        document.getElementById("weight2").value="";
        document.getElementById("updateResult").innerHTML = "Nincs ilyen ID";
    }
}

async function update(){
  id = document.getElementById("idUpd").value;
  nameStr = document.getElementById("name2").value;
  height = document.getElementById("height2").value;
  weight = document.getElementById("weight2").value;
  if(id.length>0 && id.length<=30 && nameStr.length>0  && nameStr.length<=30 && height.length>0 && height.length<=30 && weight.length>0 && weight.length<=30 && code.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=update&id="+id+"&name="+nameStr+"&height="+height+"&weight="+weight
    });
    let data = await response.text(); 
    if(data>0)
      str="Sikeres frissítés!";
    else
    str="Sikertelen frissítés!";
    document.getElementById("updateResult").innerHTML=str;
    document.getElementById("name2").style="visibility: hidden;"
    document.getElementById("height2").style="visibility: hidden;"
    document.getElementById("weight2").style="visibility: hidden;"   
    document.getElementById("idUpd").value="";
    document.getElementById("name2").value="";
    document.getElementById("height2").value="";
    document.getElementById("weight2").value="";
    read();
  }
  else
    document.getElementById("updateResult").innerHTML="Nem megfelelő adat!!";
}

async function deleteF(){
  id = document.getElementById("idDel").value;
  if(id.length>0 && id.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=delete&id="+id
    });
    let data = await response.text(); 
    if(data>0)
      str="Sikeres törlés!";
    else
    str="Sikertelen törlés!";
    document.getElementById("deleteResult").innerHTML=str;
    document.getElementById("idDel").value="";
    read();
  }
  else
    document.getElementById("deleteResult").innerHTML="Nem megfelelő adat!!";
}

window.onload = function() {
    read();
};