var json = new Array();

// Lädt Daten aus dem JSON-File
function loadData() {

    //const tableContent = new Array();
    const request = new XMLHttpRequest();
    request.open("get", "data/EmployeeData.json");

    request.onload = () => {
        try {
            //JSON Daten werden in die var 'json' eingespeichert und in die Tabelle eingeschrieben
            json = JSON.parse(request.responseText);
            replaceData(mainTable, json, dataStart, dataEnd);

        } catch (e) {
            console.warn("Could not load Data.")
        }
    };
    request.send();
}

// aktualisiert Tabelleninhalt mit input json Array von den anzuzeigenden Daten (data), start end für den Bereich der anzuzeigenden Daten ( f. Pagination)
function replaceData(table,data,start,end) {
    
    data = data.slice(start,end);

    // zeilen nach jeder Blättern löschen
    for (var k = 1; k < table.rows.length; k++ ) {
        table.rows[k].innerHTML = "";
    } 

    // Zeilen einfügen
    for (var i in data) {                       // ggf. hier mal ein Template festlegen

        var newRow = table.insertRow(-1);

        for (var j in data[i]) {
            if (j == 'token') {                 // Abbrechen bei Spaltenname Token, ACHTUNG speziell für employeeData.JSON
                break;
            }
            var cell = newRow.insertCell(-1);
            cell.innerHTML = data[i][j];
        }
    }

}


