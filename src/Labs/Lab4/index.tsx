import ClickEvent from "./clickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import TodoList from "./ReduxExamples/todos/TodoList";
import ReduxExamples from "./ReduxExamples";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
    return(
        <div id="wd-lab4" className="container-fluid">
          <ClickEvent/>
          <PassingDataOnEvent/>
          <PassingFunctions theFunction={sayHello} />
          <EventObject/>
          <Counter/>
          <BooleanStateVariables/>
          <StringStateVariables/>
          <DateStateVariable/>
          <ObjectStateVariable/>
          <ArrayStateVariable/>
          <TodoList/>
          <ReduxExamples/>
        </div>
      );
}