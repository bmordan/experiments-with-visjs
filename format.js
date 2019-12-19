class Node {
    constructor(data) {
        this.id = data.uid
        this.uid = data.uid
        this.name = data.name
        this.label = data.name
        this.labelHighlightBold = true
        this.font = {
            color: "LemonChiffon"
        }
        this.role = data.role
        this.type = data.type
        this.shape = "dot"
        this.color = {
            coach: "Yellow",
            apprentice: "Gold",
            linemanager: "LemonChiffon"
        }[data.role]
        this.size = 40
        this.widthConstraint = {
            minimum: 40,
            maximum: 120
        }
    }
}

class Edge {
    constructor(from, to) {
        this.from = from.uid
        this.to = to.uid
        this.color = "LemonChiffon"
    }
}

module.exports = {
    dgraphToVisjs: raw_dgraph_results => {
        console.log(raw_dgraph_results)
        let data = {
            nodes: [],
            edges: []
        }
        raw_dgraph_results.forEach(_node => {
            const node = new Node(_node)
            if (!data.nodes.includes(node)) data.nodes.push(node)
            if (_node.edges) _node.edges.forEach (edge => data.edges.push(new Edge(node, edge)))
        })
        return Promise.resolve(data)
    },
    expandSingleNode: ([{uid, edges}]) => {
        let data = {
            nodes: [],
            edges: []
        }
        edges.forEach(edge => {
            data.nodes.push(new Node(edge))
            data.edges.push(new Edge({uid}, edge))
        })
        return Promise.resolve(data)
    }
}