import * as mc from '@minecraft/server'
import {system, world} from '@minecraft/server'
import {Command} from 'lib/canopy/CanopyExtension';
import  extension from 'config'
const ItemDisplayCommand = new Command({
    name: 'itemdisplay',
    description: 'Shows the amount of items in a stack',
    usage: 'itemdisplay',
    callback: ItemDisplayCommandCallback,
    args: [
    ],
    contingentRules: ['StorageUtilities'],
    adminOnly: false,
    helpEntries: [],
    helpHidden: false
});
extension.addCommand(ItemDisplayCommand);

function ItemDisplayCommandCallback(sender, args){
system.runInterval(() => {
   for (const dimension of ['overworld', 'nether', 'the_end']) {
      for (const entity of world.getDimension(dimension).getEntities({ type: 'minecraft:item' })) {
         const item = entity.getComponent('item').itemStack;
         entity.nameTag = `§a${item.amount}x §7${item.typeId.replace("_", " ").replace("minecraft:", "")}`;
      }
   }
});
}