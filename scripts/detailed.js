    

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
    }
    // on bodyload of detailed 
    function createDetailedList(){
        entry = getEntryRow();
        list = document.getElementById("entry-list")
        console.log(entry);

        for(var i in entry) {
                newField = document.createElement("DT");
                newField.className = "entryField";
                newField.innerHTML = i;
                newDesc = document.createElement("DD");
                newDesc.className = "entryDesc";
                newDesc.innerHTML = entry[i];
                list.appendChild(newField);
                list.appendChild(newDesc);        
        }
    }
