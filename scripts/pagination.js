

function switchPage(shownPage,toPage) {
  //calculate steps to toPage
  var steps = shownPage - toPage;
  //calculate amount of Pages in total
  var pageAmount = Math.ceil(json.length/pageSize)
  //forward (steps will be negative becaus toPage > shownPage)
  if(steps < 0 && page != pageAmount) {
    dataStart += pageSize*(steps*-1);
    dataEnd += pageSize*(steps*-1);
    page = toPage;
  }
  //go previous page
  if(steps > 0 && page != 1) {
    dataStart -= pageSize*steps;
    dataEnd -= pageSize*steps;
    page = toPage;
  }
  replaceData(mainTable,json,dataStart,dataEnd);
  displayPages();


}
// Achtung, pageNumbers haben 2 Spaces (für Formatierung)
function displayPages() {
  var pageNumbers = document.getElementById('pageNumbers');
  var pageAmount = Math.ceil(json.length/pageSize);
  pageNumbers.innerHTML = "";

  for(var i = 1; i <= pageAmount; i++ ){
    //Higlight Page
    if(page == i) {
      highlight = 'class="highlight" ';
    } else {
      highlight = "";
    }
    var temp = '<a ' + highlight + ' id="' + i + '"' + ' onclick="switchPage(page,'+i+')">' + i +'&nbsp;&nbsp;</a>'; 
    pageNumbers.innerHTML += temp;
  }
}

function reloadWithPageSize(newPageSize){
  pageSize = newPageSize;
  page = 1;
  dataStart = 0;
  dataEnd = dataStart + pageSize;
  replaceData(mainTable,json,dataStart,dataEnd);
  displayPages();
}

