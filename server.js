startServers()
    .then(() => '[INFO] Servidores online.')
    .catch(err => '[ERROR] Servidores offline');

function startServers() {
    const http    = require('http');
    const https   = require('https');

    return new Promise((resolve, reject) => {
        try {
            console.log('[INFO] Buscando os certificados na máquina.');
            getOptions(100)
                .then(options => {
                    console.log('[INFO] Certificados encontrados.');

                    console.log('[INFO] Criando o servidor primário HTTPS.');
                    var httpsServer = https.createServer(options, function(request, response) {
                        response.sendFile(__dirname + '/dist/ui-base/index.html');
                    });
                    httpsServer.listen(443);
                    console.log('[INFO] Servidor primário escutando na porta 443.');

                    console.log('[INFO] Criando o servidor secundário HTTP.');
                    var httpServer = http.createServer(function (request, response) {
                        response.redirect(`https://${request.headers.host}${request.url}`);
                    });
                    httpServer.listen(80);
                    console.log('[INFO] Servidor secundário escutando na porta 80.');

                    resolve(true);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

function getOptions(tryNumbers) {
    const files   = require('fs');

    return new Promise((resolve, reject) => {
        try {
            var options = {
                key: files.readFile('/etc/letsencrypt/live/3gbrasil.com.br/privkey.pem', 'utf8').trim(),
                cert: files.readFile('/etc/letsencrypt/live/3gbrasil.com.br/fullchain.pem', 'utf8').trim()
            }
            resolve(options);
        } catch (e) {
            if (tryNumbers <= 0) {
                reject('[ERROR] Erro ao buscar o certificado. Tentativas excedidas.');
            } else {
                console.log('[WARN] Erro ao buscar os certificados, tentando novamente em 5 segundos.');
                setTimeout(function(){
                    tryNumbers--;
                    return getOptions(tryNumbers).then(res => resolve(res)).catch(err => reject(err));
                }, 5000);
            }
        }
    });
}