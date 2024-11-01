import * as mc from '@minecraft/server'
import {Command} from 'lib/canopy/CanopyExtension';
import  extension from 'config'
const ItemSetCommand = new Command({
    name: 'itemset', // The name of the command
    description: 'Load structure file of a certain item set.', // Shows up in the help command. Can be a string or RawMessage type.
    usage: 'itemset [name]', // The usage of the command that shows up in the help command & when used incorrectly
    callback: ItemSetCommandCallback, // The function to run when the command is executed
    // Optional:
    args: [
        { type: 'string|number', name: 'itemsetname' } // The arguments that the command takes. 'string|number' means it can be either a string or a number
    ],
    contingentRules: ['StorageUtilities'], // Rules that must be true for the command to be enabled
    adminOnly: false, // Whether the command can only be run by admins (users with the 'CanopyAdmin' tag)
    helpEntries: [ // Additional help entries that show up in the help command
     { usage: `itemset casual`, description: `Loads casual item set` }, // Description can be a string or RawMessage type.
     { usage: `itemset TMC`, description: `Loads TMC item set` },
     { usage: `itemset split`, description: `Loads split item set` },
     { usage: `itemset nonstackable`, description: `Loads nonstackable item set` },
     { usage: `itemset bulk`, description: `Loads bulk item set` },
    ],
    helpHidden: false // Whether the command should be hidden from the help command.
});
extension.addCommand(ItemSetCommand);

function ItemSetCommandCallback(sender, args) {
    let { itemsetname } = args;
    let {x, y, z} = sender.location
const ItemSetArray = ['casual', 'TMC', 'split', 'nonstackable', 'bulk']
const IsValidItemSet = ItemSetArray.includes(itemsetname)
const ItemSetStructures = {
    casual:'mystructure:casual_IS',
    TMC:'mystructure:TMC_IS',
    split:'mystructure:split_IS',
    nonstackable:'mystructure:NSIS',
    bulk:'mystructure:Bulk_IS'
}
                if (IsValidItemSet === true) {
          mc.world.structureManager.place(ItemSetStructures[itemsetname], sender.dimension, {x: x+1 ,y: y, z: z+1} )
          sender.sendMessage(`§aLoaded item set ${itemsetname}`) 
        }
        else sender.sendMessage(`§c${itemsetname} is not an valid item set. Please try again`)
    }