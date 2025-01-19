import {SaplingExtension, ConfigBuilder} from 'lib/sapling'

const extension = new SaplingExtension({
    extensionId: 'storage-utilities',
    extensionName: 'Storage Utilities',
    extensionNamespace: 'storageutilities'
});

const Debug = new ConfigBuilder()
.setDebugMode(true)
.setAutomaticTranslations(false);

export {extension, Debug}