const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const account = "neutralnewsstorage";
    const storageAccountKey = context.req.body.storageAccountKey;
    const tableName = "users";

    const credential = new AzureNamedKeyCredential(account, storageAccountKey);
    const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);

    let username = context.req.body.username;
    let password = context.req.body.password;
    let preferiti = context.req.body.preferiti;
    const entity = {partitionKey: 'users', rowKey: username, password :password, preferiti: preferiti};
    let responseMessage = await client.updateEntity(entity)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}