const IfElseComponent = () => {
    // Define your boolean variables
    let true1 = true, false1 = false;
  
    // Return JSX using the variables in conditional rendering
    return (
      <div id="wd-if-else">
        <h4>If Else</h4>
        { true1 && <p>true1</p> }
        { !false1 ? <p>!false1</p> : <p>false1</p> } <hr />
      </div>
    );
  };
  
  export default IfElseComponent;