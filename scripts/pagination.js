function switchPage(shownPage,toPage) {
  var steps = shownPage - toPage;
  console.log(steps);

var pageAmount = Math.ceil(json.length/pageSize)
  //forward
  if(steps < 0 && page != pageAmount) {
    dataStart += pageSize*(steps*-1);
    dataEnd += pageSize*(steps*-1);
    page = toPage;
  }
  //go previous page
  if(steps > 0 && page != 1) {
    dataStart -= pageSize*steps;
    dataEnd -= pageSize*(steps);
    page = toPage;
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
      pageList += '<a class="highlight" id ='
      pageList += '"'+i+'">'
      + i + '</a>' + ', ';
    } else {
      //comma handling
      if(i != pageAmount) {
        pageList +="<a id =" + '"'+i+'">';
      //  pageList += 'href="#" onclick="switchPage(page,'+i+')">';
        pageList += i;
        pageList += ", ";
        pageList += '</a>';
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

