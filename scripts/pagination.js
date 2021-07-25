function pageBack() {
    if (dataStart != 0) {
        dataStart -= 15;
        dataEnd -= 15;
        page--;
        console.log(page)
        replaceData(mainTable,json,dataStart,dataEnd);
        displayPages();
      }
      
}
// eine Seite weiterblättern, variablen anpassen (Achtung 15er Schritte, je nach Anzahl Anzeige anpassen!)
function pageNext() {
    if (dataStart != 45) {
        dataStart += 15;
        dataEnd += 15;
        page++;
        console.log(page)
        replaceData(mainTable,json,dataStart,dataEnd);
        displayPages();

      }
      
}
// ineffizient
function displayPages() {
  var pageNumbers = document.getElementById('pageNumbers');
  pageAmount = Math.ceil(json.length/pageSize);
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

