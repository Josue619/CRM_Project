import './database';
import server from './app';
import cron from 'node-cron';

import cj from './controllers/cronController'

function main() {
    server.start(); 
}

async function getEvents() {
    cj.manageEvents();
}

main();

cron.schedule(" 0 */5 * * * * ", () => {
    
    getEvents();
    
})