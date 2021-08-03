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
            //const self = this; nicht nötig scheinbar
            //console.log(self);
            reader.onload = (event) => {                            //onload anderes Format für DOMContentLoaded event wenn ich richtig verstehe
                //console.log('FILE CONTENT', event.target.result);
                json = JSON.parse(event.target.result);             // event target result ist der Inhalt vom JSON File (Ergebnis vom reader?)
                replaceData(mainTable, json, dataStart,dataEnd);
                displayPages();
            };
            reader.readAsText(file); //nochmal einspeicherung in den Reader als Text? obwohl ich das schon mit JSON Parse gemacht habe glaube ich

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
// Funktion wurde nur mit JSON Array mit 2er Tiefe getestet, weitere Tiefen ausstehend
function replaceData(table,data,start,end) {

    data = data.slice(start,end);

    //Die ersten vier Spaltennamen in die Tabelle
    var keys = Object.keys(data[0]);
    var newRow = table.insertRow(-1);
    for( var h = 0; h < 4; h++) {
        var header = document.createElement("TH");
        header.innerHTML = keys[h].toUpperCase();
        newRow.appendChild(header);
    }
    table.appendChild(newRow);

    // Alle Tabellenzeilen nach jedem Blättern löschen
    for (var k = 1; k < table.rows.length; k++ ) {
        table.rows[k].innerHTML = "";
    }
    var iterator = 0; 

    // Zeilen einfügen
    for (var i in data) {                       // ggf. hier mal ein Template festlegen

        var newRow = table.insertRow(-1);
    

        for (var j in data[i]) {

            if(iterator == 4){
                iterator = 0;
                break;
            }
            iterator++;
            var cell = newRow.insertCell(-1);
            cell.innerHTML = data[i][j];
        }
        
    }

}


