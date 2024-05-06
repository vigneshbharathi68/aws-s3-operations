const AWS = require('aws-sdk');
const fs = require('fs');
// configure dot env 
require('dotenv').config();

// Configure AWS with your access and secret key.
// Get the url from arguments 
// check whether the arguments are passed or not
function downloadS3Object(fileUrl, awsAccessKey, awsSecretAccessKey, awsRegion, Bucket) {
    if (!fileUrl) {
        // color the console output to red
        console.error('\x1b[31m%s\x1b[0m', '--------------------------------------');
        console.error('\x1b[31m%s\x1b[0m', 'URL is required');
        console.error('\x1b[31m%s\x1b[0m', '--------------------------------------');
        return;
    }
    const url = new URL(fileUrl);
    console.log({url})
    const Key = url.pathname.substring(1); // Remove the leading slash
    const fileName = Key.split('/').pop();
    // Check whether the URL is valid or not
    if (!url || !url.hostname || !url.pathname) {
        console.error('\x1b[31m%s\x1b[0m', '--------------------------------------');
        console.error('\x1b[31m%s\x1b[0m', 'Invalid URL');
        console.error('\x1b[31m%s\x1b[0m', '--------------------------------------');
        return;
    }
    console.log('\x1b[33m%s', '--------------------------------------------')
    console.log('\x1b[33m%s\x1b[0m', 'URL:', url.href);
    console.log('\x1b[33m%s\x1b[0m', 'Downloading file from S3:', Key);
    console.log('\x1b[33m%s\x1b[0m', 'Local file downloaded path:', `${__dirname}/${fileName}`);
    console.log('\x1b[33m%s', '--------------------------------------------')

    AWS.config.update({
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey,
        region: awsRegion, // region of your bucket
        correctClockSkew: true
    });

    const s3 = new AWS.S3();

    const params = { Bucket, Key };
    // Get the file name dynamically based on the Key from the URL
    const file = fs.createWriteStream(fileName);
    s3.getObject(params).createReadStream().pipe(file);

    file.on('finish', () => {
        console.log('\x1b[32m%s\x1b[0m', 'File downloaded successfully');
    });
}

module.exports = { downloadS3Object };