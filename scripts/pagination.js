function switchPage(direction) {
var pageAmount = Math.ceil(json.length/pageSize)
  //go next Page
  if(direction == "next" && page != pageAmount) {
    dataStart += pageSize;
    dataEnd += pageSize;
    page++;
  }
  //go previous page
  if(direction == "prev" && page != 1) {
    dataStart -= pageSize;
    dataEnd -= pageSize;
    page--;
  }
  console.log(page);
  replaceData(mainTable,json,dataStart,dataEnd);
  displayPages();


}
// ineffizient
function displayPages() {
  var pageNumbers = document.getElementById('pageNumbers');

  var pageAmount = Math.ceil(json.length/pageSize);
  pageNumbers.innerHTML = "";
  
  for(var i = 1; i <= pageAmount; i++ ){
    var pageList = "";
    //Higlight Page
    if(page == i) {
      pageList += '<a class="highlight">'
      + i + '</a>' + ', ';
    } else {
      //comma handling
      if(i != pageAmount) {
        pageList += i;
        pageList += ", ";
      } else {
        pageList += i;
      }

    }
    pageNumbers.innerHTML += pageList;
  }
  // get comma away if highlight on last page number
  if(page == pageAmount){
    pageNumbers.innerHTML = pageNumbers.innerHTML.substr(0,pageNumbers.innerHTML.length-2);
  }

 

}

