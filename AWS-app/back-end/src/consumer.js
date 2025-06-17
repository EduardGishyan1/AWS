const {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require('@aws-sdk/client-sqs');

const sqs = new SQSClient({ region: 'eu-north-1' });
const QueueUrl = process.env.QUEUE_URL;

async function pollMessages() {
  while (true) {
    try {
      const command = new ReceiveMessageCommand({
        QueueUrl,
        MaxNumberOfMessages: 5,
        WaitTimeSeconds: 20,
      });

      const data = await sqs.send(command);

      if (!data.Messages || data.Messages.length === 0) {
        console.log('No messages received.');
      } else {
        let message;
        for (const msg of data.Messages) {
          message = JSON.parse(msg.Body);
          console.log('Received message:', message.message);

          sqs.send(
            new DeleteMessageCommand({
              QueueUrl,
              ReceiptHandle: msg.ReceiptHandle,
            }),
          );
        }
      }
    } catch (err) {
      console.error('Error');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

pollMessages();