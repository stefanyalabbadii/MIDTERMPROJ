const { Storage } = require('@google-cloud/storage');
const { BigQuery } = require('@google-cloud/bigquery');

const storage = new Storage();
const bq = new BigQuery();

const projectId = 'sp-24-412-sfalabba-midterm'; 
const datasetId = 'pdf_files';
const tableId = 'files';

const benignBucketName = 'midterm-benign-pdfs'; 
const maliciousBucketName = 'midterm-malicious-pdfs'; 

exports.classifyAndMoveFile = async (event, context) => {
    const filename = event.name;
    const sourceBucket = event.bucket;

    try {
        const classification = await getFileClassification(filename);
        console.log(`File ${filename} classified as ${classification}`);

        const targetBucketName = classification === 'Malicious' ? maliciousBucketName : benignBucketName;
        await storage.bucket(sourceBucket).file(filename).move(storage.bucket(targetBucketName));
        console.log(`Moved ${filename} to ${targetBucketName}`);
    } catch (error) {
        console.error(`Error processing file ${filename}:`, error);
    }
};

async function getFileClassification(filename) {
    const query = `
        SELECT Class
        FROM \`${projectId}.${datasetId}.${tableId}\`
        WHERE filename = @filename;
    `;
    const options = {
        query: query,
        params: { filename: filename }
    };
    const [rows] = await bq.query(options);
    if (rows.length > 0) {
        return rows[0].Class;
    } else {
        return 'Unknown'; // No classification found
    }
}
