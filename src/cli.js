import cli from './';

const mainCommand = process.argv[2];

switch (mainCommand) {
  case 'init':
    cli.init();
    break;

  case 'run':
    cli.run();
    break;

  case 'convert':
    cli.convert();
    break;

  case 'create':
    cli.create();
    break;

  default:
    // eksekusi endpoints
    break;
}
