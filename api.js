const dgraph = require("dgraph-js")
const grpc = require("grpc")

const dgraphClientStub = newClientStub()
const dgraphClient = newClient(dgraphClientStub)

function newClientStub() {
    return new dgraph.DgraphClientStub("localhost:9080", grpc.credentials.createInsecure())
}

function newClient(clientStub) {
    return new dgraph.DgraphClient(clientStub);
}

async function setSchema(dgraphClient) {
    const schema = `
        name: string @index(exact) .
        role: string @index(exact) .
        type: string @index(exact)
        edges: [uid] @reverse .
    `
    const op = new dgraph.Operation()
    op.setSchema(schema)
    await dgraphClient.alter(op)
}

module.exports = {
    getNode: async uid => {
        const q = `
            query getNode ($uid: string) {
                getNode(func: uid($uid)) {
                    uid
                    name
                    role
                    type
                    edges {
                        uid
                        name
                        role
                        type
                    }
                }
            }
        `
        const results = await dgraphClient.newTxn().queryWithVars(q, {$uid: uid})
        return results.getJson()
    },
    getNodes: async () => {
        const q = `
        {
            getNodes(func: has(name)) {
              uid
              name
              role
              type
              edges {
                uid
                name
                role
                type
              }
            }
        }
        `
        const results = await dgraphClient.newTxn().query(q)
        return results.getJson()
    }
}