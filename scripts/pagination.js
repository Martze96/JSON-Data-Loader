
function pageBack() {
    if (page != 1) {
        dataStart -= pageSize;
        dataEnd -= pageSize;
        page--;
        console.log(page)
        replaceData(mainTable,json,dataStart,dataEnd);
        displayPages();
      }
      
}
// eine Seite weiterblättern, variablen anpassen (Achtung 15er Schritte, je nach Anzahl Anzeige anpassen!)
function pageNext() {
    if (page != Math.ceil(json.length/pageSize)) {
      console.log(json.length- pageSize);
        dataStart += pageSize;
        dataEnd += pageSize;
        page++;
        console.log(page)
        replaceData(mainTable,json,dataStart,dataEnd);
        displayPages();

      }
      
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

      if(i != pageAmount) {
        pageList += i;
        pageList += ", ";
      } else {
        pageList += i;
      }

    }


    pageNumbers.innerHTML += pageList;

  }

}

