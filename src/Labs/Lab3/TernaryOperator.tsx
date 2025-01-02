const TernaryOperator = () => {
  // Define your boolean variable for logged in status
  let loggedIn = true;

  // Return JSX with a ternary operator for conditional rendering
  return (
    <div id="wd-ternary-operator">
      <h4>Logged In</h4>
      { loggedIn ? <p>Welcome</p> : <p>Please login</p> } <hr/>
    </div>
  );
};

export default TernaryOperator;
