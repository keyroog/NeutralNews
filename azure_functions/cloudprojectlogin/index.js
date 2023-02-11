const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

module.exports = async function (context, req) {
    // Enter your storage account name and shared key
    const account = "cpstorageresource";
    const storageAccountKey = context.req.body.storageAccountKey;
    const tableName = "users";

    // Use AzureNamedKeyCredential with storage account and account key
    // AzureNamedKeyCredential is only available in Node.js runtime, not in browsers
    const credential = new AzureNamedKeyCredential(account, storageAccountKey);
    const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
    let responseMessage= "";
    let username = context.req.body.username;
    let password = context.req.body.password;
    let result = await client.getEntity(username, password)
    .catch((error) => {
        responseMessage = "false";
    });
    if(result!==null){
        responseMessage = {username : result.partitionKey,password:result.rowKey, preferiti:result.preferiti}
    }
    context.res = {
        body: responseMessage
    };
}