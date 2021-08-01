document.addEventListener("DOMContentLoaded", () => { loadData(); });
var json = new Array();


// Lädt Daten aus dem JSON-File
function loadData() {
    
    document.getElementById('fileInput').onchange = function(evt) {
        try {
            let files = evt.target.files;
            if (!files.length) {
                alert('Keine Datei ausgewählt!');
                return;
            }
            let file = files[0];
            document.getElementById('pagination-container').style.visibility = "visible";
            document.getElementById('data-table').style.visibility = "visible";
            document.getElementById('page-size-selector').style.visibility = "visible";
            document.getElementById("uploadedFileName").innerHTML = files[0].name;
            let reader = new FileReader();
            const self = this;
            reader.onload = (event) => {
                //console.log('FILE CONTENT', event.target.result);
                json = JSON.parse(event.target.result);
                replaceData(mainTable, json, dataStart,dataEnd);
                displayPages();
            };
            reader.readAsText(file);

        } catch (err) {
            console.error(err);
        }
    }
    



    //Code wenn JSON direkt im Projektordner platziert wird
    /*
    const request = new XMLHttpRequest();
    request.open("get", "data/EmployeeData.json");

    request.onload = () => {
        try {
            //JSON Daten werden in die var 'json' eingespeichert und in die Tabelle eingeschrieben
            json = JSON.parse(request.responseText);
            replaceData(mainTable, json, dataStart, dataEnd);
            displayPages();

        } catch (e) {
            console.warn("Could not load Data.")
        }
    };
    request.send();
    */

  // replaceData(mainTable, json, dataStart,dataEnd);
  // displayPages();
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
            if (j == 'about') {                 // Abbrechen bei Spaltenname Token, ACHTUNG speziell für employeeData.JSON
                break;
            }
            
            var cell = newRow.insertCell(-1);
            cell.innerHTML = data[i][j];
        }
    }

}


