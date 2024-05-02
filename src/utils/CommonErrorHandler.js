const CommonErrorHandler = ({ array, type }) => {
  const error = Object.keys(array)?.map((key, index) => {
    if (typeof array[key] == "string" || Array.isArray(array[key])) {
      return (
        <div
          className={
            array[key][1] === "success" || type !== "error"
              ? "alert alert-success"
              : "alert alert-danger"
          }
          style={{
            color:
              array[key][1] === "success" || type !== "error" ? "green" : "red",
          }}
          key={index}
        >
          {type === "error" && typeof array[key] == "string" ? (
            array[key]
          ) : typeof array[key][0] == "string" ? (
            <li>
              {key}- {array[key][0]}
            </li>
          ) : (
            <>
              {Object.keys(array[key][0])?.map((key2, index) => (
                <li>
                  {key2}- {array[key][0][key2][0]}
                </li>
              ))}
            </>
          )}
        </div>
      );
    } else if (typeof array[key] === "object") {
      const objecterr = Object.keys(array[key])?.map((key1, index) => {
        return (
          <div
            className={
              array[key][1] === "success" || type !== "error"
                ? "alert alert-success"
                : "alert alert-danger"
            }
            style={{
              color:
                array[key][1] === "success" || type !== "error"
                  ? "green"
                  : "red",
            }}
            key={index}
          >
            {typeof array[key][key1][0] === "object" ? (
              <>
                {Object.keys(array[key][key1][0])?.map((key3, index) => (
                  <li>
                    {key3}- {array[key][key1][0][key3][0]}
                  </li>
                ))}
              </>
            ) : (
              <li>
                {key1}- {array[key][key1][0]}
              </li>
            )}
          </div>
        );
      });
      return objecterr;
    }
  });

  return error;
};

export default CommonErrorHandler;
