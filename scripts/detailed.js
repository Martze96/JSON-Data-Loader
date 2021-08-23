    

    function getStoredFile() {
        return JSON.parse(localStorage["file"]);

           
    }

    function getUrlFragment() {
        return window.location.hash.substring(1);
    }

    function getEntryRow() {
        data = getStoredFile();
        idCode = getUrlFragment();
        for(var s in data) {
            if(data[s].id == idCode){
                return data[s];
            }
        }
    }
    // on bodyload of detailed
    function changeWindowTitle() {
        window.document.title = 'Data Entry #' + getUrlFragment();
       entryHeader = document.getElementById('entry-title').children[0];
       entryHeader.innerHTML = "Detailansicht ID: " + getUrlFragment();
    }
    // on bodyload of detailed 
    function createDetailedList(){
        entry = getEntryRow();
        list = document.getElementById("entry-list")

        for(var i in entry) {
                newRow = document.createElement("LI");
                newRow.className = "entryRow";
                newField = document.createElement("LI");
                newField.className = "entryField";
                newField.innerHTML = i.charAt(0).toUpperCase() + i.slice(1); 
                newDesc = document.createElement("LI");
                newDesc.className = "entryDesc";
                newDesc.innerHTML = entry[i];
                newRow.appendChild(newField);
                newRow.appendChild(newDesc);
                list.appendChild(newRow);        
        }
    }

    function getNextID() {
        idCode = getUrlFragment();
        data = getStoredFile();
        list = document.getElementById("entry-list");
        list.innerHTML= "";
        for( var s in data) {
            if(data[s].id == idCode && s != data.length-1) {    
                s++;
                window.location.hash = data[s++].id;
                createDetailedList();
                changeWindowTitle();
                sessioncounter--;
                return;
                           
            }
        }
        
    }

    function getPrevID() {
        idCode = getUrlFragment();
        data = getStoredFile();
        list = document.getElementById("entry-list");
        list.innerHTML= "";
        for( var s in data) {
            if(data[s].id == idCode && s != 0) {
                s--;
                window.location.hash = data[s--].id;
                createDetailedList();
                changeWindowTitle();
                sessioncounter--;
                return;
               
            }
        }
        
    }
