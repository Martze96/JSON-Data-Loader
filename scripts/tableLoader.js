var json = new Array();

// Lädt Daten aus dem JSON-File
function loadData(dataStart, dataEnd) {

    //const tableContent = new Array();
    const request = new XMLHttpRequest();
    request.open("get", "data/EmployeeData.json");

    request.onload = () => {
        try {
            //JSON Daten werden in die var 'json' eingespeichert  
            json = JSON.parse(request.responseText);
            loadPagination(json, dataStart, dataEnd);


        } catch (e) {
            console.warn("Could not load Data.")
        }
    };
    request.send();
}
// aktualisiert Tabelleninhalt mit input json Array von den anzuzeigenden Daten (page)
function appendData(page) {

    var tableRef = document.getElementById('data-table')

    // zeilen nach jeder Blättern löschen
    for (var k = 1; k < tableRef.rows.length; k++ ) {
        tableRef.rows[k].innerHTML = "";
    } 

    // Zeilen einfügen
    for (var i in page) {                       // ggf. hier mal ein Template festlegen

        var newRow = tableRef.insertRow(-1);

        for (var j in page[i]) {
            if (j == 'token') {
                break;
            }
            var cell = newRow.insertCell(-1);
            cell.innerHTML = page[i][j];
        }
    }

}


