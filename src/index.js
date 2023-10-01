import app from './app';
import '@babel/polyfill';

import './utils/database';

async function main(){
    await app.listen(app.get('port'));
    console.log('Server on Port', app.get('port'));
}

main();