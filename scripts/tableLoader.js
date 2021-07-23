
function loadData() {

    //const tableContent = new Array();
    const request = new XMLHttpRequest();

    request.open("get", "data/EmployeeData.json");

    request.onload = () => {
        try {
            //JSON Daten werden in die const 'json' eingespeichert  
            const json = JSON.parse(request.responseText);
            appendData(json);

        } catch (e) {
            console.warn("Could not load Data.")
        }
    };
    request.send();
}


function appendData(json) {

    var tableRef = document.getElementById('data-table')

    

    for (var i in json[i]) {                       // ggf. hier mal ein Template festlegen
        console.log(i);
        var newRow = tableRef.insertRow(-1);

        for (var j in json[i][j]) {
            if (j == 'token') {
                break;
            }
            var cell = newRow.insertCell(-1);
            cell.innerHTML = json[i][j];
        }
    }

    loadPagination(json);

    // JQUERY ANSATZ:
    /*     //Schleife durch Datensätze
        $.each(json, function (i, d) {    // $('[Selector]').each() für DOM elemente, ansonsten so wie hier: $.each(LISTE, function(index, value) {...} );
            //Anfang des Datensatzes mit HTML tag Tablerow --> row ist unser Datensatz (zeile)
            row = '<tr>';
            // $.each(d --> value von obiger Schleife, function(index,value --> datenzelle) {...} );
            $.each(d, function (j, e) {
                // If-Abfrage, weil wir nur bis Spalte 'Token' die Daten befüllen möchten
                if (j == 'token') {
                    return false;
                }
                //Füge somit jedes e (datenzelle) zwischen einem html datenzellen-Tag in die variable row ein 
                row += '<td>' + e + '</td>';
    
            });
            // Nun da row jetzt quasi eine komplette html tabelle bestehend aus trs und deren tds als String ist, schließen wir mit ende des tr's ab
            row += '</tr>';
            // jetzt wird hier der string aus row mit dem Tablebody der Tabelle mit der class data-Table angefügt
            $('#data-table tbody').append(row); 
        }) */
}

function loadPagination(json) {

    // JQUERY ANSATZ
    /*     $('.pageContent').pagination({
        dataSource: json,
        totalNumber: 5,
        callback: function (data, pagination) {
            // template method of yourself --- geht auch ohne diese Methode, dann ist auch das Warning (could not load data) weg.
            var html = template(data);
            //schienbar muss hier der data container rein
            $('.pageContent').html(html);
        }
    }) */

}

