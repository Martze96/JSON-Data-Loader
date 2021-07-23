
function loadData(dataStart,dataEnd) {

    //const tableContent = new Array();
    const request = new XMLHttpRequest();

    request.open("get", "data/EmployeeData.json");

    request.onload = () => {
        try {
            //JSON Daten werden in die const 'json' eingespeichert  
            const json = JSON.parse(request.responseText);
            loadPagination(json, dataStart, dataEnd);
            

        } catch (e) {
            console.warn("Could not load Data.")
        }
    };
    request.send();
}


function appendData(json) {
    
    var tableRef = document.getElementById('data-table')

    var rows = document.getElementById('rows');

    while ( tableRef.hasChildNodes()){
        tableRef.removeChild(tableRef.firstChild);
    }

    for (var i in json) {                       // ggf. hier mal ein Template festlegen

        var newRow = tableRef.insertRow(-1);

        for (var j in json[i]) {
            if (j == 'token') {
                break;
            }
            var cell = newRow.insertCell(-1);
            cell.innerHTML = json[i][j];
        }
    }

   // loadPagination(json);

}

function loadPagination(json, dataStart, dataEnd) {
    console.log(dataStart);
    console.log(dataEnd);

    
    var pages = new Array();
    var start = dataStart;
    var activePageSize = dataEnd;
    pages = json.slice(start,activePageSize);

       console.log(pages);

       appendData(pages);

}

