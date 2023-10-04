import React, { Component } from 'react'
import SearchIcon from "../../assets/search.png"
import PhotoSearchResult from '../components/PhotoSearchResult';

class Search extends Component {
    constructor(props) {
        super(props);
    }
    state = {}

    styles = {
        container: {
            textAlign: "center"
        },
        queryInputContainer: {
            display: "flex",
            flexDirection: "row"
        },
        queryInput: {
            fontSize: this.props.settings.fontSize,
            width: "calc(100% - 8px)",
            textAlign: "center",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20
        },
        searchButton: {
            height: this.props.settings.fontSize + 2,
            backgroundColor: this.props.settings.color.getString(),
            padding: 4,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20
        },
        typeInput: {
            fontSize: this.props.settings.fontSize,
            width: "100%",
            textAlign: "center",
            marginTop: 8,
            marginBottom: 4
        },
        sortInput: {
            marginTop: 4,
            marginBottom: 4,
            fontSize: this.props.settings.fontSize,
            width: "100%",
            textAlign: "center"
        },
        resultcontainer: {}
    }

    handleSearchClick() {
        this.props.apiCall.read("search", this.props.content)
    }

    render() {
        return (<div style={this.styles.container}>
            <div style={this.styles.queryInputContainer}>
                <input style={this.styles.queryInput} placeholder="Search..." type="text" value={this.props.content.query} onChange={(e) => { this.props.updateView("search", "query", e.target.value) }} />
                <img alt="search" src={SearchIcon} style={this.styles.searchButton} onClick={this.handleSearchClick.bind(this)} />
            </div>
            <select style={this.styles.typeInput} value={this.props.content.type} onChange={(e) => { this.props.updateView("search", "type", e.target.value) }}>
                <option value="People">People</option>
                <option value="Pictures">Pictures</option>
                <option value="Albums">Albums</option>
                <option value="Posts">Posts</option>
            </select>
            <select style={this.styles.sortInput} value={this.props.content.sort} onChange={(e) => { this.props.updateView("search", "sort", e.target.value) }}>
                <option value="Relevance">Relevance</option>
                <option value="Date">Date</option>
            </select>
            <div style={this.styles.resultContainer}>
                {this.props.content.results.map((result) => {
                    if (result.type === "Pictures") {
                        return <PhotoSearchResult key={"photo" + result.id} content={result} settings={this.props.settings}/>
                    }
                    return null
                })}
            </div>
        </div>);
    }
}

export default Search;