const multiply = (a: number, b: number) => a * b;
const fourTimesFive = multiply(4, 5);
const ImpliedReturn = () => (
    <div id="wd-implied-return">
      <h4>Implied return</h4>
      fourTimesFive = {fourTimesFive}<br />
      multiply(4, 5) again = {multiply(4, 5)} <hr />
    </div>
  );
  
  export default ImpliedReturn;
