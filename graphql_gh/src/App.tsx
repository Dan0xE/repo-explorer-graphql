import React, {SetStateAction} from 'react';
import github from "./db";
import {useEffect, useCallback} from "react";
import githubQuery from "./utils/Query";
import clsx from "clsx";
import query from "./utils/Query";

function App() {
    const [userName, setUserName] = React.useState(null);
    const [repoList, setRepoList] = React.useState(null);
    const [pageCount, setPageCount] = React.useState<SetStateAction<any> | number>(10);
    const [queryString, setQueryString] = React.useState("slides");
    const [totalCount, setTotalCount] = React.useState(0);

    const fetchData = useCallback(() => {
        const queryText = JSON.stringify(query(pageCount, queryString));
        fetch(github.baseURL, {
            method: "POST",
            headers: github.headers,
            body: queryText
        })
            .then((res) => res.json())
            .then((data) => {
                const viewer = data.data.viewer;
                const repos = data.data.search.nodes
                const total = data.data.search.repositoryCount;
                setTotalCount(total)
                setUserName(viewer.name);
                setRepoList(repos);
                console.log(data)
            })
            .catch((err) => console.log(err));
    }, [pageCount, queryString]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    ;
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="App container mt-5">
            <h1 className="text-primary"><i className="bi bi-diagram-2-fill"></i>Repo Searcher</h1>
            <p className="lead">
                <i className="bi bi-person-fill"></i>
                Welcome there {userName}!
            </p>
            <div className="row">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Search" value={queryString} onChange={(e) => setQueryString(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <select className="form-control" value={pageCount} onChange={(e) => setPageCount(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <p className="lead">
                        <i className="fas fa-code-branch"></i>
                        Found {totalCount} Repos
                    </p>
                </div>
            </div>
            <div className="row">
                {/*@ts-ignore*/}
                {repoList && repoList.map((repo: any) => (
                    <div className="col-md-4" key={repo.id}>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{repo.name}</h5>
                                <p className={clsx(repo.licenseInfo?.spdxId === undefined ? `card-text badge bg-danger` : `card-text badge bg-success`)}>{repo.licenseInfo?.spdxId === undefined ? "License not found or unknown" : `Licensed under ${repo.licenseInfo?.spdxId}`}</p>
                                <p className="card-text">{repo.description}</p>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => window.open(repo.url, "_blank")}>
                                            View
                                        </button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => window.open(repo.url + "/issues", "_blank")}>
                                            Edit
                                        </button>
                                        {repo.viewerSubscription === "SUBSCRIBED" ? (
                                            <span
                                                className="badge mt-1 m-lg-2 h-25 bg-primary">{repo.viewerSubscription}</span>
                                        ) : (
                                            <button
                                                onClick={() => window.open(repo.url + "/subscription", "_blank")}
                                                type="button"
                                                className="btn btn-sm btn-outline-primary">Subscribe</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                )}
            </div>
        </div>
    );
}

export default App;
