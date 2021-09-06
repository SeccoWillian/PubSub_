/**
 * TODO(developer): informar o topico do Pub/Sub e Json de dados.
 */
process.env.GOOGLE_APPLICATION_CREDENTIALS="../GCP/datalake-grendene-d1b22c338204.json"
const topicName = 'GRND';
const data = JSON.stringify({teste: 'Node 05', atualizacao: new Date()});

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessage() {
  // Transforma um Json recebido em string
  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

publishMessage();