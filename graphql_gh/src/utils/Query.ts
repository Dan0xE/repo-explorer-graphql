const githubQuery = (pageCount: number, queryString: string) => {
    return {
        query: `
          {
  viewer {
    name
  }
  search(query: "${queryString} user:dan0xe sort:updated-desc", type: REPOSITORY, first: ${pageCount}) {
    repositoryCount
    nodes {
      ... on Repository {
        name
        description
        id
        url
        viewerSubscription 
        licenseInfo {
          spdxId
        }
      }
    }
  }
}`,
    }
}
export default githubQuery
