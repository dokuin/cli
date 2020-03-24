import cli from './';

export default class CliCommand {
  static command(command = false){
    // console.log(command)
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

      case 'update':
        cli.update();
        break;

      case "--version":
        cli.version()
        break;

      case "-v":
        cli.version()
        break;
    
      default:
        cli.start()
        break;
    }
  }
}

if(process.argv){
  CliCommand.command(process.argv[2])
}
