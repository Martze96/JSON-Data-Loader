function pageBack() {
    if (dataStart != 0) {
        dataStart -= 15;
        dataEnd -= 15;
        page--;
        console.log(page)
        replaceData(mainTable,json,dataStart,dataEnd);
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
      }
      
}
