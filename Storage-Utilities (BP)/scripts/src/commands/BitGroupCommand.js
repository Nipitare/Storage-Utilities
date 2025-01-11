import * as mc from '@minecraft/server'
import {Command} from 'lib/canopy/CanopyExtension';
import  extension from 'config'
const BitGroupCommand = new Command({
    name: 'bitgroup',
    description: 'Tells you the necessary bit grouping for any given number of bits 7-10.',
    usage: 'bitgroup [action] [value]',
    callback: BitGroupCommandCallback,
    args: [
        { type: 'string', name: 'action' },
        { type: 'string|number', name: 'value' }
    ],
    contingentRules: ['StorageUtilities'], 
    adminOnly: false, 
    helpEntries: [
     { usage: `bitgroup list [value]`, description: `Gives a list of the bit layout for [value]` },
     { usage: `bitgroup load [value]`, description: `Loads the bit for [value] layout at your current coordinates` },
    ],
    helpHidden: false
});
extension.addCommand(BitGroupCommand);

function BitGroupCommandCallback(sender, args) {
    let {action, value} = args;
    let {x, y, z} = sender.location;
    const list ={
     7: '§l§a7-Bit encoder§r\n §eBitgroups: §c[1, 2, 2, 2]§r\n §eNumber of chests: §f§l11§r\nInventory  1: §7XXXXXX§c1§r\nInventory  2: §7XXXXXX§c1§r\nInventory  3: §7XXXX§c01§7X§r\nInventory  4:  §7XXXX§c10§7X§r\nInventory  5: §7XXXX§c11§7X§r\nInventory  6: §7XX§c01§7XXX§r\nInventory  7: §7XX§c10§7XXX§r\nInventory  8: §7XX§c11§7XXX§r\nInventory  9: §7§c01§7XXXXX§r\nInventory 10: §7§c10§7XXXXX§r\nInventory 11: §7§c11§7XXXXX§r',
    8: '§l§a8-Bit encoder§r\n §eBitgroups: §c[2, 3, 3]§r\n §eNumber of chests: §f§l20§r\n Inventory  1: §7XXXXXX§c01§r\n Inventory  2: §7XXXXXX§c01§r\n Inventory  3: §7XXXXXX§c10§r\n Inventory  4: §7XXXXXX§c10§r\n Inventory  5: §7XXXXXX§c11§r\n Inventory  6: §7XXXXXX§c11§r\n Inventory  7: §7XXX§c001§7XX§r\n Inventory  8: §7XXX§c010§7XX§r\n Inventory  9:  §7XXX§c011§7XX§r\n Inventory 10: §7XXX§c100§7XX§r\n Inventory 11: §7XXX§c101§7XX§r\n Inventory 12: §7XXX§c110§7XX§r\n Inventory 13: §7XXX§c111§7XX§r\n Inventory 14: §7§c001§7XXXXX§r\n Inventory 15: §7§c010§7XXXXX§r\n Inventory 16: §7§c011§7XXXXX§r\n Inventory 17: §7§c100§7XXXXX§r\n Inventory 18: §7§c101§7XXXXX§r\n Inventory 19: §7§c110§7XXXXX§r\n Inventory 20: §7§c111§7XXXXX§r',
    9: '',
    10: '',
    } 
const BitGroupArray = ['bit7', 'bit8', 'bit9', 'bit10', 'bit10compact']
const IsValidLoadbit = BitGroupArray.includes(value)
const BitGroupStructures = {
    bit7:'mystructure:7bit',
	    bit8:'mystructure:8bit',
	    bit9:'mystructure:9bit', 
	    bit10:'mystructure:10bit',
        bit10compact:'mystructure:10bitcompacted'}
if (action === 'load' && IsValidLoadbit) {
    mc.world.structureManager.place(BitGroupStructures[value], sender.dimension, {x: x,y: y-1, z: z} )
    return
}

if (action === 'list' && value <= 10 && value >= 7) { 
    sender.sendMessage(`${list[value]}`) 
}
else sender.sendMessage('§cBit amount is not valid (7-10) Please try again')

}