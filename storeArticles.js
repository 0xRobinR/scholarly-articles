const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

// Define the directory containing the Markdown files
const directoryPath = './articles/';

// Function to check if a file is a Markdown file
function isMarkdownFile(filename) {
    return path.extname(filename) === '.md';
}

function readMarkdownFile(filepath) {
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    const { data, _ } = matter(fileContent);

    return {
        file: path.basename(filepath),
        ...data,
        buttonLabel: data['label']
    };
}

// Read the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter Markdown files
    const markdownFiles = files.filter(isMarkdownFile);

    // Process Markdown files
    let result = markdownFiles.map((filename) => {
        const filepath = path.join(directoryPath, filename);
        return readMarkdownFile(filepath);
    });

    const sortAccordingToIndexInDescending = result.sort((a, b) => {
        return b.index - a.index;
    })

    const outputData = {
        articles: sortAccordingToIndexInDescending,
        lastUpdated: new Date().toISOString()
    }
    // Convert the result to JSON
    const jsonResult = JSON.stringify(outputData, null, 2);

    // Write the JSON result to a file
    const outputFile = 'metadata.json';
    fs.writeFileSync(outputFile, jsonResult);

    console.log('Markdown files checked and JSON result stored in result.json.');
});
