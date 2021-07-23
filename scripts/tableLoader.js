var json = new Array();
function loadData(dataStart, dataEnd) {

    //const tableContent = new Array();
    const request = new XMLHttpRequest();

    request.open("get", "data/EmployeeData.json");

    request.onload = () => {
        try {
            //JSON Daten werden in die const 'json' eingespeichert  
            json = JSON.parse(request.responseText);
            loadPagination(json, dataStart, dataEnd);


        } catch (e) {
            console.warn("Could not load Data.")
        }
    };
    request.send();
}

function appendData(pages) {

    var tableRef = document.getElementById('data-table')

    var rows = document.getElementById('rows');



    for (var i in pages) {                       // ggf. hier mal ein Template festlegen

        var newRow = tableRef.insertRow(-1);

        for (var j in pages[i]) {
            if (j == 'token') {
                break;
            }
            var cell = newRow.insertCell(-1);
            cell.innerHTML = pages[i][j];
        }
    }

}

function loadPagination(json, dataStart, dataEnd) {
    console.log(dataStart);
    console.log(dataEnd);

    var pages = new Array();

    pages = json.slice(dataStart, dataEnd);

    console.log(pages);

    appendData(pages);

}

