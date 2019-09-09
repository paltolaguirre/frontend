const { exec, spawn } = require('child_process');

var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);

for (let index = 0; index < myArgs.length; index++) {
    const serviceName = myArgs[index];
    let path = null;
    switch (serviceName.toLowerCase()) {
        case 'autenticacion':
            path = "~/go/src/github.com/xubiosueldos/autenticacion";
            runService(serviceName, path);
            break;
        case 'helpers':
            path = "~/go/src/github.com/xubiosueldos/helpers";
            runService(serviceName, path);
            break;
        case 'legajo':
            path = "~/go/src/github.com/xubiosueldos/legajo";
            runService(serviceName, path);
            break;
        case 'concepto':
            path = "~/go/src/github.com/xubiosueldos/concepto";
            runService(serviceName, path);
            break;
        case 'novedad':
            path = "~/go/src/github.com/xubiosueldos/novedad";
            runService(serviceName, path);
            break;
        case 'liquidacion':
            path = "~/go/src/git-codecommit.us-east-1.amazonaws.com/v1/repos/sueldos-liquidacion";
            runService(serviceName, path);
            break;
        case 'informes':
            path = "~/go/src/github.com/xubiosueldos/informes";
            runService(serviceName, path);
            break;
        default:
            console.log("* El servicio '" + serviceName + "' no existe.");
    }
}

function runService(name, path) {
    console.log("Levantando servicio " + name + "...");
    exec("cd " + path + " && go run *.go", (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
}