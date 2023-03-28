const githubQuery = (
  queryUser: string,
  pageCount: number,
  queryString: string,
  paginationKeyword: string,
  paginationString: string
) => {
  return {
    query: `{
      viewer {
        name
      }
      search(query: "${queryString}user:${queryUser} sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
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
    }`,
  };
};
export default githubQuery;
