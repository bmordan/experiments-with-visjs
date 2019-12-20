// https://visjs.github.io/vis-data/data/dataset.html

const graph = document.getElementById('graph')
const data = JSON.parse(graph.getAttribute('data-for-graph'))
const nodes = new vis.DataSet(data.nodes)
const edges = new vis.DataSet(data.edges)
const network = new vis.Network(graph, {nodes, edges}, {})

network.on('click', evt => {
    let node = nodes.get(evt.nodes[0])
    if (node.length) {
        node = {
            label: "nothing selected",
            type: "none",
            role: ""
        }
    }
    app.run('setSelected', node)
})

network.on('doubleClick', evt => {
    fetch(`/nodes/${evt.nodes[0]}`)
    .then(result => result.json())
    .then(nodeData => {
        if (nodeData.nodes) nodes.update(nodeData.nodes)
    })
})

const state = {
    selected: {
        label: "nothing selected",
        type: "none",
        role: ""
    }
}
const view = state => {
    const {label, role, type} = state.selected
    const icon = {
        none: "fa-info",
        person: "fa-user",
        object: "fa-folder",
        location: "fa-map-marker",
        event: "fa-calendar"
    }[type]
    return `
        <section class="w-100 f2 pv2 ph4">
            <i class="fa ${icon} dib mr2"></i> <span class="dib">${label}</span> <i class="dib">${role}</i>
        </section>
    `
}
const update = {
    setSelected: (state, data) => {
        console.log(data)
        return {...state, selected: data}
    }
}
app.start('info-panel', state, view, update)