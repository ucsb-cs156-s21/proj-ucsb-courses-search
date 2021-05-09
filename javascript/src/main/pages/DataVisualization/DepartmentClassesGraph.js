import React, {useState} from "react";
import Graph from "react-graph-vis";
import {  fetchBasicCourseJSON } from "main/services/courseSearches";
import BasicCourseSearchForm from "../../components/BasicCourseSearch/BasicCourseSearchForm";
import {Container, Jumbotron} from "react-bootstrap";

const DepartmentClassesGraph = () => {
    const [graphVisibility, setGraphVisibility] = useState(false);
    const [graphData, setGraphData] = useState(null);

    const setJsonGraphData = (json) => {
        const nodes = [];
        const edges = [];
        setGraphData(null);
        setGraphVisibility(false);

        var classes = json.classes;
        nodes.push({id: 0, label: classes[0].deptCode}); // establish root node

        for(var i = 1; i < classes.length; i++){
            console.log(classes[i]);
            nodes.push({id: i, label: classes[i].courseId})
            edges.push({from: 0, to: i})
        }

        const graph = {
            nodes: nodes,
            edges: edges
        };

        setGraphData(graph)
        setGraphVisibility(true);
    }

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000"
        },
        height: "500px"
    };

    return (
        <Jumbotron>
            <Container>
                <BasicCourseSearchForm setCourseJSON={setJsonGraphData} fetchJSON={fetchBasicCourseJSON}/>
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-center"}>
                {graphVisibility && (graphData != null ? <Graph
                            graph={graphData}
                            options={options}
                            events={{}}
                            getNetwork={network => {}}
                            />
                    : "There are no results!")}
            </Container>
        </Jumbotron>
    );
};

export default DepartmentClassesGraph;
