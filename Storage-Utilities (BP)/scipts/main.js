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


const ItemSetCommand = new Command({
    name: 'itemSet', // The name of the command
    description: 'Load structure file of a certain item set.', // Shows up in the help command. Can be a string or RawMessage type.
    usage: 'itemSet [name]', // The usage of the command that shows up in the help command & when used incorrectly
    callback: exampleCommandCallback, // The function to run when the command is executed
    // Optional:
    args: [
        { type: 'string|number', name: 'message' } // The arguments that the command takes. 'string|number' means it can be either a string or a number
    ],
    contingentRules: ['StorageUtilities'], // Rules that must be true for the command to be enabled
    adminOnly: false, // Whether the command can only be run by admins (users with the 'CanopyAdmin' tag)
    helpEntries: [ // Additional help entries that show up in the help command
     { usage: `itemSet casual`, description: `Loads casual item set` }, // Description can be a string or RawMessage type.
     { usage: `itemSet TMC`, description: `Loads TMC item set` },
     { usage: `itemSet mixed`, description: `Loads mixed item set` },
     { usage: `itemSet split`, description: `Loads split item set` },
     { usage: `itemSet nonstackable`, description: `Loads nonstackable item set` },
     { usage: `itemSet bulk`, description: `Loads bulk item set` },
    ],
    helpHidden: false // Whether the command should be hidden from the help command.
});
extension.addCommand(ItemSetCommand);

function exampleCommandCallback(sender, args) {
    let { message } = args;
    let player = mc.world.getPlayers()[0];
    let {x, y, z} = player.location 
        message = message.toString();
                if (message === 'split') {
          mc.world.structureManager.place("mystructure:split item set", player.dimension, {x: x+1 ,y: y, z: z+1} )
          sender.sendMessage('§aLoaded item set split') 
        }
        if (message !== 'split') {
            sender.sendMessage('§cNot an valid item set please try again')
        }
}
