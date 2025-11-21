const http = require('http');
const { exec } = require('child_process');

// Simple webhook server to trigger sync
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/sync-trigger') {
        console.log('Sync triggered by webhook');
        
        exec('node sync-products.js', (error, stdout, stderr) => {
            if (error) {
                console.error('Sync failed:', error);
                res.writeHead(500);
                res.end('Sync failed');
            } else {
                console.log('Sync completed:', stdout);
                res.writeHead(200);
                res.end('Sync completed');
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(3001, () => {
    console.log('Webhook sync server running on port 3001');
    console.log('Trigger with: POST http://localhost:3001/sync-trigger');
});