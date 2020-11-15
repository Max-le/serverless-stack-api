import * as uuid from "uuid";
 
import AWS from "aws-sdk";
const dynamoDb = new AWS.DynamoDB.DocumentClient();


export async function main(event, context) {
     // Request body is passed in as a JSON encoded string in 'event.body'
     
const data = JSON.parse(event.body);

const params = {
     
     TableName: process.env.tableName,
     
     Item: {
     // The attributes of the item to be created 
     userId: "123", //id of the author
     noteId: uuid.v1(), 
     content: data.content, 
     attachment: data.attachment,
     createdAt: Date.now(),
},
}

try {
     await dynamoDb.put(params).promise();

     return {
          stausCode: 200,
          body: JSON.stringify(params.Item), 
     };
}
catch (e) {

     return {
     statusCode: 500,
     body: JSON.stringify({ error: e.message }),
     };

}
};
