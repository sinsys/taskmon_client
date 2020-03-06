import * as React from "react";

let TimerContext = React.createContext();

let initialState = {
  seconds: 0,
  active: false
};

let reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        seconds: state.seconds += 1
      }
    case "toggle":
      console.log('test');
      return {
        ...state,
        active: !state.active
      }
    default:
      return {
        ...initialState
      };
  }
};

// let startTimer = (endCondition) => {
//   let startTime = new Date().getTime();
//   let timer = setInterval(() => {
//     if(endCondition) {
//       clearInterval(timer);
//     };
//     return getTimeDiff(startTime);
//   }, 1000);
// };

// let getTimeDiff = (startTime) => {
//   let now = new Date().getTime();
//   let distance = now - startTime;
//   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   let seconds = Math.floor((distance % (1000 * 60)) / 1000);
//   return({
//     d: days,
//     hr: hours,
//     min: minutes,
//     sec: seconds
//   });
// };

function TimerContextProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };
  return (
    <TimerContext.Provider value={value}>
      {props.children}
    </TimerContext.Provider>
  );
}

let TimerContextConsumer = TimerContext.Consumer;

export { TimerContext, TimerContextProvider, TimerContextConsumer };