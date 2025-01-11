import { Rule } from 'lib/canopy/CanopyExtension';
import extension from 'config'
const creativeOnly = new Rule({
    identifier: 'creativeOnly',
    description: 'Disables or enables command that spawn items/structures',
});
extension.addRule(creativeOnly)