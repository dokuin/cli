import cli from './';

export default class CliCommand {
  static command(command = false){

    switch (command) {
      case 'start':
        cli.start();
        break;

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

      case 'list':
        cli.list();
        break;

      case 'delete':
        cli.delete();
        break;
        
      case 'add':
        cli.add();
        break;
    
      default:
        break;
    }
  }
}

if(process.argv[2]){
  CliCommand.command(process.argv[2])
}
