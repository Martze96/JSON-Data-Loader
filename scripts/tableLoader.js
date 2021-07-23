
function loadData() {

    //const tableContent = new Array();
    const request = new XMLHttpRequest();
    const pageSize = 15;
    const pageNumber = 1;

    request.open("get", "data/EmployeeData.json");

    request.onload = () => {
        try {
            //JSON Daten werden in die const 'json' eingespeichert  
            const json = JSON.parse(request.responseText);
            loadPagination(json, pageNumber, pageSize)
            appendData(json,0,15);

        } catch (e) {
            console.warn("Could not load Data.")
        }
    };
    request.send();
}


function appendData(json, pagenumber, pagesize) {
    
    var tableRef = document.getElementById('data-table')

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

function loadPagination(json, pageNumber, pageSize) {

    var pages = new Array();
    var start = (pageNumber-1)*pageSize;
    var activePageSize = pageSize;

    pages.push(json.slice(start,activePageSize));
       
       console.log(pages);

       return pages;

}

