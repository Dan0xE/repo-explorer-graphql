import React, {SetStateAction} from 'react';
import github from "./db";
import {useEffect, useCallback} from "react";
import githubQuery from "./utils/Query";
import clsx from "clsx";
import query from "./utils/Query";
import RepoInfo from "./RepoInfo";
import NavButtons from "./NavButtons";

function App() {
    const [userName, setUserName] = React.useState(null);
    const [repoList, setRepoList] = React.useState(null);
    const [pageCount, setPageCount] = React.useState<SetStateAction<any> | number>(10);
    const [queryString, setQueryString] = React.useState("");
    const [totalCount, setTotalCount] = React.useState(0);
    const [startCursor, setStartCursor] = React.useState(null);
    const [endCursor, setEndCursor] = React.useState(null);
    const [hasPreviousPage, setHasPreviousPage] = React.useState(false);
    const [hasNextPage, setHasNextPage] = React.useState(true);
    const [paginationKeyword, setPaginationKeyword] = React.useState("first");
    const [paginationString, setPaginationString] = React.useState("");
    const [queryUser, setQueryUser] = React.useState("");

    const fetchData = useCallback(() => {
        const queryText = JSON.stringify(query(queryUser, pageCount, queryString, paginationKeyword, paginationString));
        fetch(github.baseURL, {
            method: "POST",
            headers: github.headers,
            body: queryText
        })
            .then((res) => res.json())
            .then((data) => {
                const viewer = data.data.viewer;
                const repos = data.data.search.edges
                const total = data.data.search.repositoryCount;
                const start = data.data.search.pageInfo?.startCursor;
                const end = data.data.search.pageInfo?.endCursor;
                const prev = data.data.search.pageInfo?.hasPreviousPage;
                const next = data.data.search.pageInfo?.hasNextPage;
                const pagination = data.data.search.pageInfo?.endCursor;

                setStartCursor(start);
                setEndCursor(end);
                setHasPreviousPage(prev);
                setHasNextPage(next);
                setTotalCount(total)
                setUserName(viewer.name);
                setRepoList(repos);
                console.log(data)
            })
            .catch((err) => console.log(err));
    }, [pageCount, queryString, paginationKeyword, paginationString]);

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
                    <input type="text" className="form-control" placeholder="Search" value={queryString}
                           onChange={(e) => setQueryString(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="User" value={queryUser}
                           onChange={(e) => setQueryUser(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <div className="col-md-6">
                    </div>
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
                    <div className="col-md-4" key={repo.node.id}>
                        <RepoInfo repo={repo.node}/>
                    </div>)
                )}
            </div>
            <NavButtons
                start={startCursor}
                end={endCursor}
                next={hasNextPage}
                previous={hasPreviousPage}
                onPage={(keyword: any, string: any) => {
                    setPaginationKeyword(keyword);
                    setPaginationString(string);
                }}
            />
        </div>
    );
}

export default App;
