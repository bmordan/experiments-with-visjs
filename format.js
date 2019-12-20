// https://fontawesome.com/v4.7.0/cheatsheet/

class Node {
    constructor(data) {
        const borderColor = {
            coach: "MidnightBlue",
            apprentice: "RoyalBlue",
            linemanager: "MediumVioletRed"
        }[data.role]
        const iconCode = {
            person: "\uf007",
            object: "\uf07b",
            location: "\uf041",
            event: "\uf073"
        }[data.type]
        this.id = data.uid
        this.uid = data.uid
        this.name = data.name
        this.label = data.name
        this.labelHighlightBold = true
        this.font = {
            color: "gray"
        }
        this.role = data.role
        this.type = data.type
        this.shape = "icon"
        this.icon = {
            face: 'FontAwesome',
            code: iconCode,
            size: 55,
            color: borderColor,
            weight: undefined
        }
        this.borderWidth = 4
        this.borderWidthSelected = 6
        this.color = {
            border: borderColor,
            background: "white"
        }
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
        this.color = "MidnightBlue"
    }
}

module.exports = {
    dgraphToVisjs: raw_dgraph_results => {
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
        if (edges) {
            edges.forEach(edge => {
                data.nodes.push(new Node(edge))
                data.edges.push(new Edge({uid}, edge))
            })
        }
        return Promise.resolve(data)
    }
}