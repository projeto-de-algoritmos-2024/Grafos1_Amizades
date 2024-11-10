import React from "react";
import Graph from "react-graph-vis";

function Grafo({ grafo }) {

  const options = {
    layout: {
      hierarchical: true
    },
    nodes: {
      font: {
        color: "#000000",
        size: 16,
        strokeWidth: 1,
        strokeColor: "#000000"
      }
    },
    edges: {
      color: {
        color: "#ffffff",
        highlight: "#ffffff"
      },
      font: {
        color: "#ffffff",
        strokeWidth: 0,
      }
    },
    
  };
  
  return (
    <Graph
      graph={grafo}
      options={options}
    />
  );
}

export default Grafo;