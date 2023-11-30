/**
 * this config would load automatically by nextjs
 * will call this method webpackDevMiddleware
 */
module.exports = {
    webpackDevMiddleware: config=>{
        config.watchOptions.poll=300; //pull all files automatically every 300 millisecond
        return config;
        
    }
}