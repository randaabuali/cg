
//generate with uppercase
function makecode(numofchars,isuppercase) {
  var text = "",
 num='',
  alpha = "abcdefghijklmnopqrstuvwxyz",
  number="0123456789",
  newnum = numofchars-1,
  randomlength=Math.floor(Math.random()*(newnum)+1), //random number of alphabets in the code
  type = ((document.getElementById('alphanum').checked) ? document.getElementById('alphanum').value : document.getElementById('numeric').value);

  if(type == 'alphanum'){
  if (isuppercase) {
     alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  }
  else {
   alpha ="abcdefghijklmnopqrstuvwxyz";
  }
}
else if(type== 'numeric') {
alpha = '123456789';
}
  //choose random letters e.g AVDS
    for (var i = 0; i < randomlength; i++)
      text += alpha.charAt(Math.floor(Math.random() * alpha.length));



  //return text;
  //choose random numbers e.g 123
    for (var j = 0; j < Math.abs(numofchars-randomlength); j++)
      num += number.charAt(Math.floor(Math.random() * number.length));

  // return num;
  //add letters and nums e.g AVDS123
  uniqueID = num + text;
  //shuffle the code  e.g A2VD31
  String.prototype.shuffle = function () {
    var a = this.split(""),
    n = a.length;

    for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  }
  //return the unique code
  return uniqueID.shuffle();
} //end of makecode


//on click call this fun.
function codeGenerator() {
  var t0 = new Date(); //get start time
  var tbdy = document.getElementById("codes");
  var prefix= document.getElementById("prefix").value;
  tbdy.innerHTML="";//empty the doc.
  var arr=[]; //initialize codes array
  //remove export link if any
  if(document.getElementById("exportBtn")){
    document.getElementById("exportBtn").parentNode.removeChild(document.getElementById("exportBtn"));
  }
  //check fields value
  var numofcodes= document.getElementById("numofcodes").value;
  if(!numofcodes || numofcodes <1 || numofcodes> 100000) {
    numofcodes=1000;
    console.log(numofcodes);
  }
  var numofchars= document.getElementById("numofchars").value;
  if(!numofchars || numofchars <4 || numofchars> 10) {
    numofchars=7;
    console.log(numofchars);
  }
  var isuppercase = document.getElementById("isuppercase").checked;
  var length=numofcodes;
  for(var i=0; i<length;i++){
    //  for(var j = numofcodes; j>=0; j--){ //this is reverse loop

      if(arr.includes(makecode(numofchars,isuppercase))) {
        console.log("duplicate "+makecode(numofchars,isuppercase));
        length++;
      }
      else {
        arr.push(prefix + makecode(numofchars,isuppercase));
      }

    //} //end of innerloop
  } // end of loop
  //print codes
  var arrlength=arr.length;
  var stringarr = arr.toString();
  tbdy.style.display="block";
  tbdy.innerHTML = stringarr.split(',').join("<hr>");

  //for csv
  let csvContent = "data:text/csv;charset=utf-8,";
  //var order=1;
  for(var i=0; i<arrlength;i++)
  {
    let row = arr[i];
    //tbdy.innerHTML+= order+' - '+row;
    csvContent += row + "\r\n";
    //order++;
  }


  var t1 = new Date(); //get end time
  //insert after element function
  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  //create export link
  var loading = document.getElementById("loading");
  var link = document.createElement("a");
  link.innerHTML = "EXPORT TO CSV";
  link.setAttribute("id", "exportBtn");
  var btn = document.getElementById("generateBtn");
  insertAfter(loading, link); //insert link after the btn
  var exportDate = Math.round(new Date().getTime() / 1000); //to give the csv file a unique name
  var encodedUri = encodeURI(csvContent);
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", 'unique_codes_export_'+exportDate+'.csv');
  link.setAttribute('target', '_blank');
  var finalTime = (t1.getTime()  - t0.getTime() )/1000; //calculate speed
  loading.style.display="block";
  loading.innerHTML=`Successfully generated ${arrlength} unique codes of ${numofchars} chars in ${finalTime} seconds`;
  loading.scrollIntoView({
  behavior: 'smooth'
});
}//end of code generator fun.
