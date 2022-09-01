import query from "./Query";

type pagKey = 'first | last'

const githubQuery = (pageCount: number, queryString: string, paginationKeyword: string, paginationString: string) => {
    return {
        query: `
         {
  viewer {
    name
  }
  search(query: "${queryString}user:dan0xe sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
    repositoryCount
    edges {
      cursor
      node {
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
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
         `,
    }
}
export default githubQuery
