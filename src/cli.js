import cli from './';

const mainCommand = process.argv[2];

switch (mainCommand) {
  case 'init':
    cli.init();
    break;

  case 'run':
    cli.run();

  case 'convert':
    cli.convert();
    
   case 'create':
    cli.cliGenerate();
    break;
    
  default:
    // eksekusi endpoints
    break;
}
