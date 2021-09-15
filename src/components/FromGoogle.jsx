import React from "react";

function FromGoogle({ location, history }) {
  const JWT = location.search.substring(1);
  localStorage.setItem("accessToken", JWT);
  history.push("/");
  window.location.reload(false);
  return (
    <div>
      <h2>Please Wait...</h2>
    </div>
  );
}

export default FromGoogle;
