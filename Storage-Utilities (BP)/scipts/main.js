import * as mc from '@minecraft/server'
import { CanopyExtension, Command, Rule } from 'lib/canopy/CanopyExtension';
const extension = new CanopyExtension({
    name: 'StorageUtilities',
    description: 'Storage Utilities is an addon aimed to improve the process of making a system related to storage tech.',
    version: '0.0.1',
});
const StorageUtilities = new Rule({
    identifier: 'StorageUtilities',
    description: 'Disables or enables Storage Utilities',
});
extension.addRule(StorageUtilities)
mc.world.afterEvents.buttonPush.subscribe((event) => {
    if (!StorageUtilities.getValue()) 
        return;
    if (event.source === undefined)
        return;
    event.source.sendMessage('§aYou pushed a button!');
});

const ItemSetCommand = new Command({
    name: 'itemset', // The name of the command
    description: 'Load structure file of a certain item set.', // Shows up in the help command. Can be a string or RawMessage type.
    usage: 'itemset [message]', // The usage of the command that shows up in the help command & when used incorrectly
    callback: exampleCommandCallback, // The function to run when the command is executed
    // Optional:
    args: [
        { type: 'string|number', name: 'message' } // The arguments that the command takes. 'string|number' means it can be either a string or a number
    ],
    contingentRules: ['StorageUtilities'], // Rules that must be true for the command to be enabled
    adminOnly: false, // Whether the command can only be run by admins (users with the 'CanopyAdmin' tag)
    helpEntries: [ // Additional help entries that show up in the help command
       // { usage: `itemset`, description: `test xd` }, // Description can be a string or RawMessage type.
    ],
    helpHidden: false // Whether the command should be hidden from the help command.
});
extension.addCommand(ItemSetCommand);

function exampleCommandCallback(sender, args) {
    let { message } = args;
    const player = mc.world.getPlayers()[0]; 
        message = message.toString();
                if (message === 'test') {
          mc.world.structureManager.place("mystructure:teststruc", player.dimension, player.location)
          sender.sendMessage('§aLoaded item set Test') 
        }
        if (message !== 'test') {
            sender.sendMessage('§cNot an valid item set please try again')
        }
}
