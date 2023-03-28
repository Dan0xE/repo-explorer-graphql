import clsx from "clsx";

const NavButtons = ({
  start,
  end,
  next,
  previous,
  onPage,
}: {
  start: any;
  end: any;
  next: any;
  previous: any;
  onPage: any;
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="btn-group">
        {previous && (
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onPage("last", 'before:"' + start + '"')}
          >
            Previous
          </button>
        )}
        {next && (
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onPage("first", 'after"' + end + '"')}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default NavButtons;
