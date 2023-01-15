const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const account = "projectuserstorage";
const accountKey = "oYyBRLCC3zQFpou7aFQgTIkPcD5Ft2TVQOqZLPi7q1hfHq3DNBmoZi/bLRN6oW4f2JUfuvMvbL03+AStW4m/nQ==";
const tableName = "users";
const credential = new AzureNamedKeyCredential(account, accountKey);
const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let username = context.req.body.username;
    let password = context.req.body.password;
    let preferiti = context.req.body.preferiti;
    let responseMessage="false";
    const task = {
        partitionKey: username,
        rowKey: password,
        preferiti: preferiti,
    };
    let user = await client.getEntity(username, password)
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