import clsx from "clsx";

const RepoInfo = ({ repo }: { repo: any }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{repo.name}</h5>
        <p
          className={clsx(
            repo.licenseInfo?.spdxId === undefined
              ? `card-text badge bg-danger`
              : `card-text badge bg-success`
          )}
        >
          {repo.licenseInfo?.spdxId === undefined
            ? "License not found or unknown"
            : `Licensed under ${repo.licenseInfo?.spdxId}`}
        </p>
        <p className="card-text">{repo.description}</p>

        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => window.open(repo.url, "_blank")}
            >
              View
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => window.open(repo.url + "/issues", "_blank")}
            >
              Edit
            </button>
            {repo.viewerSubscription === "SUBSCRIBED" ? (
              <span className="badge mt-1 m-lg-2 h-25 bg-primary">
                {repo.viewerSubscription}
              </span>
            ) : (
              <button
                onClick={() =>
                  window.open(repo.url + "/subscription", "_blank")
                }
                type="button"
                className="btn btn-sm btn-outline-primary"
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoInfo;
