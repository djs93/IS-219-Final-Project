export default class DataFuncs{
    static _generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
        let th = document.createElement("th");
        let text = document.createTextNode("Edit");
        th.appendChild(text);
        row.appendChild(th);
    }

    static _generateTableBody(table, data) {
        for (let element of data) {
            let row = table.insertRow();
            console.log(element);
            let key;
            for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
            let cell = row.insertCell();
            let button = document.createElement("button");
            button.addEventListener('click',ev => {
                window.location=`/edit/${element['id']}`;
            });
            button.innerHTML = "Edit";
            cell.appendChild(button);
        }
    }

    static generateTable(table, data, dataRecords){
        this._generateTableHead(table, data);
        this._generateTableBody(table, dataRecords);
    }
}
