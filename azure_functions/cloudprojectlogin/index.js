const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

// Enter your storage account name and shared key
const account = "projectuserstorage";
const accountKey = "";
const tableName = "users";

// Use AzureNamedKeyCredential with storage account and account key
// AzureNamedKeyCredential is only available in Node.js runtime, not in browsers
const credential = new AzureNamedKeyCredential(account, accountKey);
const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);

module.exports = async function (context, req) {
    console.log(context);
    console.log(req);
    let responseMessage= "";
    let username = context.req.body.username;
    let password = context.req.body.password;
    let result = await client.getEntity(username, password)
    .catch((error) => {
        responseMessage = "false";
    });
    if(result!==null){
        responseMessage = {partitionKey : result.partitionKey, preferiti:result.preferiti}
    }
    context.res = {
        body: responseMessage
    };
}