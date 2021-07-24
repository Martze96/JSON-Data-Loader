function pageBack() {
    if (dataStart != 0) {
        dataStart -= 15;
        dataEnd -= 15;
        page--;
        console.log(page)
      }
      loadPagination(json, dataStart, dataEnd);
}

function pageNext() {
    if (dataStart != 45) {
        dataStart += 15;
        dataEnd += 15;
        page++;
        console.log(page)
      }
      loadPagination(json, dataStart, dataEnd);
}

// spaltet JSON Daten und gibt sie weiter um sie einzufügen
function loadPagination(json, dataStart, dataEnd) {
    console.log(dataStart);
    console.log(dataEnd);

    var page = new Array();

    page = json.slice(dataStart, dataEnd);

    console.log(page);

    appendData(page);

}