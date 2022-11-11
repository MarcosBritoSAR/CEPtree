import fs from 'vite-plugin-fs/browser';

export async function getDataObject(size = -1) {
    var csv = await fs.readFile('public/ceps.csv')
    var array = csv.toString().split("\n");
    let result = [];
    let headers = array[0].trim().split("\t")
    let maxItens = (size < 0) ? array.length - 1 : Math.min(size + 1, array.length - 1)
    for (let i = 1; i < maxItens; i++) {
        let obj = {}

        // Create an empty object to later add
        // values of the current row to it
        // Declare string str as current array
        // value to change the delimiter and
        // store the generated string in a new
        // string s
        let str = array[i].trim().split("\t")
            // console.log(str)
        var item = 0
        for (let j in headers) {
            obj[headers[j]] = (str[item] !== undefined) ? str[item].trim() : ""
            item += 1
        }
        result.push(obj)
    }

    return result
}