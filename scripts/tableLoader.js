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
            makeTableElementsVisible();
            document.getElementById("uploadedFileName").innerHTML = files[0].name;
            let reader = new FileReader();
            //const self = this; nicht nötig scheinbar
            //console.log(self);
            reader.onload = (event) => {                            //onload anderes Format für DOMContentLoaded event wenn ich richtig verstehe
                //console.log('FILE CONTENT', event.target.result);
                json = JSON.parse(event.target.result);             // event target result ist der Inhalt vom JSON File (Ergebnis vom reader?)
                replaceData(mainTable, json, dataStart,dataEnd);
                displayPages();
                //save file in local Storage
                localStorage["file"] = JSON.stringify(json);

                
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

function makeTableElementsVisible() {
    document.getElementById('pagination-container').style.visibility = "visible";
    document.getElementById('data-table').style.visibility = "visible";
    document.getElementById('page-size-selector').style.visibility = "visible";
    document.getElementById('searchLabel').style.visibility = "visible";
    document.getElementById('searchInput').style.visibility = "visible";
}

// aktualisiert Tabelleninhalt mit input json Array von den anzuzeigenden Daten (data), start end für den Bereich der anzuzeigenden Daten ( f. Pagination)
// Funktion wurde nur mit JSON Array mit 2er Tiefe getestet, weitere Tiefen ausstehend
function replaceData(table,data,start,end) {

    data = data.slice(start,end);

    //Die ersten vier Spaltennamen in die Tabelle
    var keys = Object.keys(data[0]);
    var newRow = table.insertRow(-1);

    //Tabelle löschen um mit neuen Elementen ersetzt zu werden
    table.innerHTML = "";
    
    //Tabellenheader erstellen
    var iterator = 0; 
    for( var h = 0; h < 4; h++) {
        var header = document.createElement("TH");
        header.innerHTML = keys[h].toUpperCase();
        header.setAttribute('id', 'column-' +keys[h]);
        header.setAttribute('class', 'tableHeader');
        header.addEventListener("click", function() {
            sortDataByColumn(table,json,this.getAttribute('id'),sortAscDesc);
            sortAscDesc = !sortAscDesc;
        });
        newRow.appendChild(header);
    }
    table.appendChild(newRow);

    var iterator = 0; 

    // Zeilen einfügen
    for (var i in data) {                       // ggf. hier mal ein Template festlegen

        var newRow = table.insertRow(-1);
        newRow.setAttribute("id", data[i].id);
       // newRow.classList.add("entryLink");
    

        for (var j in data[i]) {

            if(iterator == 4){
                iterator = 0;
                break;
            }
            iterator++;
            var cell = newRow.insertCell(-1);
            cell.innerHTML = '<a href="pages/detailedEntry.html#' + data[i].id + '" class="entryLink" id="' + data[i][j] +'">' + data[i][j] + '</a>';
        }
        
    }
}
// Case sensitivy nicht dabei, bei E-Mail (EmployeeData) Sortierung zu sehen! ansonsten Uppercase, Problem nur ist dass ID eine Nummber ist und das nicht gehen würde
function sortDataByColumn(table,data, columnID, ascdesc) {
    var column = columnID.substring(7);

    data.sort(function(a, b) {
        if (ascdesc) {
            return (a[column] > b[column]) ? 1 : ((a[column] < b[column]) ? -1 : 0);
        } else {
            return (b[column] > a[column]) ? 1 : ((b[column] < a[column]) ? -1 : 0);
        }
    });

    replaceData(table,data,dataStart,dataEnd);
    reloadWithPageSize(pageSize);
    //adding sorting direction indicator to tableheader
    var columnText = document.getElementById(columnID);
    if(ascdesc){
        columnText.innerHTML = columnText.innerHTML + ' &#8593;';
    } else {
        columnText.innerHTML = columnText.innerHTML + ' &#8595;';
    }

}

function search() {
    // Variablen
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("data-table");
    tr = table.getElementsByTagName("tr");

    replaceData(table,json,0,json.length);
  
    // Search loop
    for (i = 0; i <= json.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


