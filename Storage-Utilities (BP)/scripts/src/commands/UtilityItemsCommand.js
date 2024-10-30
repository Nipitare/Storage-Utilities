import * as mc from '@minecraft/server'
import {Command} from 'lib/canopy/CanopyExtension';
import  extension from 'config'
const UtilityItemsCommand = new Command({
    name: 'utilityitems', // The name of the command
    description: 'Load utility items structure.', // Shows up in the help command. Can be a string or RawMessage type.
    usage: 'utilityitems', // The usage of the command that shows up in the help command & when used incorrectly
    callback: UtilityItemsCommandCallback, // The function to run when the command is executed
    // Optional:
    args: [
    ],
    contingentRules: ['StorageUtilities'], // Rules that must be true for the command to be enabled
    adminOnly: false, // Whether the command can only be run by admins (users with the 'CanopyAdmin' tag)
    helpEntries: [ // Additional help entries that show up in the help command
    ],
    helpHidden: false // Whether the command should be hidden from the help command.
});
extension.addCommand(UtilityItemsCommand);

function UtilityItemsCommandCallback(sender, args) {
    let {x, y, z} = sender.location
    mc.world.structureManager.place('mystructure:usefulitems', sender.dimension, {x: x ,y: y-1, z: z})
    sender.sendMessage('§aLoaded utility items')
}