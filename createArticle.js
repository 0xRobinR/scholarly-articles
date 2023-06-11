const fs = require('fs')
const args = require('minimist')(process.argv.slice(2));
const moment = require('moment');

const genArticle = ({ topic, author, date, keywords, idx, label, image }) => `
---
title: ${topic}
author: ${author}
date: ${date}
tags: ${keywords}
index: ${idx}
label: ${label}
image: ${image}
description: 
oneLiner: 
---
`

function throwError(e) {
    console.error(`Error: ${e}`)
}

function countFilesInDirectory(directoryPath) {
    return new Promise((res, rej) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                res(null)
                return;
            }

            const fileCount = files.length;
            res(fileCount)
        });
    })
}

async function init() {
    try {
        const help = args.help
        if ( help ) {
            console.log(`
            --topic: topic of the article
            --author: author of the article
            --date: date of the article
            --keywords: keywords of the article
            --fileName: file name of the article
            --label: label of the article
            --image: image of the article
            `)
            return;
        }
        const topic = args.topic
        if ( !topic ) {
            throwError('topic is undefined')
            return;
        }
        const author = args.author || 'robin'
        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        const keywords = args.keywords || 'research'
        const fileName = args.fileName
        if ( !fileName ) {
            throwError('fileName is undefined')
            return;
        }

        const label = args.label || 'explain'
        const image = args.image
        if ( !image ) {
            throwError('image is undefined')
            return;
        }

        const fetchFiles = await countFilesInDirectory('./articles')
        const idx = fetchFiles + 1

        const path = require('path')
        const filePath = path.join(__dirname, `./articles/${fileName}.md`)
        const data = genArticle({ topic, author, date, keywords, idx, label, image })
        fs.writeFileSync(filePath, data)

        console.log(`Article ${topic} created successfully`)
    } catch (e) {
        throwError(e)
    }
}

init().then(r => {})