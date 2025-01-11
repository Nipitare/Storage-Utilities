import { Rule } from 'lib/canopy/CanopyExtension';
import extension from 'config'
const StorageUtilities = new Rule({
    identifier: 'StorageUtilities',
    description: 'Disables or enables Storage Utilities',
});
extension.addRule(StorageUtilities)