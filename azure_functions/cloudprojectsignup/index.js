const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");


module.exports = async function (context, req) {
    const account = "neutralnewsstorage";
    const storageAccountKey = context.req.body.storageAccountKey;
    const tableName = "users";
    const credential = new AzureNamedKeyCredential(account, storageAccountKey);
    const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
    let username = context.req.body.username;
    let password = context.req.body.password;
    let preferiti = context.req.body.preferiti;
    let responseMessage="false";
    const task = {
        partitionKey: 'users',
        rowKey: username,
        password : password,
        preferiti: preferiti,
    };
    let user = await client.getEntity('users', username)
    .catch((error) => {
        responseMessage = "error: " + error.message
    });
    if(user === undefined){
        responseMessage="true";
        let result = await client.createEntity(task)
        .catch((error) => {
            responseMessage = "false";
        });
    }else{
        responseMessage = "false";
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}