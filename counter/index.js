const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const benignBucketName = 'midterm-benign-pdfs'; 
const maliciousBucketName = 'midterm-malicious-pdfs'; 

exports.countFiles = async (req, res) => {
    try {
        const benignBucket = storage.bucket(benignBucketName);
        const maliciousBucket = storage.bucket(maliciousBucketName);
        
        const [benignFiles] = await benignBucket.getFiles();
        const [maliciousFiles] = await maliciousBucket.getFiles();

        res.status(200).send(`File counts - Malicious: ${maliciousFiles.length}, Benign: ${benignFiles.length}`);
    } catch (error) {
        console.error('Error during function execution:', error);
        res.status(500).send('Error counting files');
    }
};
