const Hapi = require('@hapi/hapi');
const lib = require("./pg_code_challenge");

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
      method: 'GET',
      path: '/price',
      handler: (request, h) => {
        const { age, gender, name, 'health-condition': healthCondition } = request.query;
        const [, price] = lib.calculateCost({ age, gender, name, healthCondition }) || [name, "N/A"];
        return JSON.stringify({ name, price });
      }
  });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();