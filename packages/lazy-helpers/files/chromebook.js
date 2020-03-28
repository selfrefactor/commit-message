const {copySync,moveSync} = require('fs-extra')
const {resolve} = require('path')

function chromebook(){
    copySync(
    resolve(__dirname, '../chrome_dist'),
    resolve(__dirname, '../chromebook_dist'),
    )
    moveSync(
    resolve(__dirname, '../chromebook_dist/manifestChromebook.json'),
    resolve(__dirname, '../chromebook_dist/manifest.json'),
        {overwrite: true}
    )
}

chromebook()
