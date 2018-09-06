let download = function (data, name = '数据报表') {
    let csvContent = "data:text/csv;charset=utf-8,\ufeff";
    if (window.navigator.msSaveOrOpenBlob) {
        csvContent = "\ufeff";
    }
    data.forEach(function (item, index) {
        let headerArr = [];
        let dataArr = [];
        for (let key in item) {
            if (index == 0) {
                headerArr.push(key);
            }
            dataArr.push(item[key]);
        }
        let dataString = '';
        if (index == 0) {
            let headerString = headerArr.join(",");
            dataString = headerString + "\n";
        }
        dataString += dataArr.join(",");
        csvContent += index < data.length ? dataString + "\n" : dataString;
    });
    if (window.navigator.msSaveOrOpenBlob) {
        // if browser is IE
        let blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
            type: "text/csv;charset=utf-8;"
        });
        navigator.msSaveBlob(blob, name + time() + '.csv');
    } else {
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", name + time() + '.csv');
        document.body.appendChild(link);
        link.click();
    }
}
let downloadTxt = function (data, name = '') {
    let csvContent = "data:text/plain;charset=utf-8,\ufeff";
    if (window.navigator.msSaveOrOpenBlob) {
        csvContent = "\ufeff";
    }
    csvContent += data;
    if (window.navigator.msSaveOrOpenBlob) {
        // if browser is IE
        let blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
            type: "text/plain;charset=utf-8;"
        });
        navigator.msSaveBlob(blob, name + time() + '.txt');
    } else {
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", name + time() + '.txt');
        document.body.appendChild(link);
        link.click();
    }
}

let time = function () {
    let now = new Date();
    let y = now.getFullYear();
    let mon = now.getMonth() + 1;
    mon < 10 && (mon = '0' + mon)
    let d = now.getDate();
    d < 10 && (d = '0' + d)
    let h = now.getHours();
    h < 10 && (h = '0' + h)
    let m = now.getMinutes();
    m < 10 && (m = '0' + m)
    let s = now.getSeconds();
    s < 10 && (s = '0' + s)
    return '_' + y + mon + d + h + m + s;
}

export default {
    download,
    downloadTxt
}
