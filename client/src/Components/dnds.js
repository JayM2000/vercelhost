
import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

function App() {
  const canvasElement = useRef();
  const [operandsArr, setOperandsArr] = useState([]);
  const [operatorArr, setOperatorArr] = useState(["+", "-", "*", "/"]);
  const [comparatorArr, setComparatorArr] = useState(["<", ">"]);
  const [comparator, setComparator] = useState("");
  const [rhs, setRhs] = useState("");
  const [equationArr, setEquationArr] = useState([]);
  const [tempDragGraphic, setTempDragGraphic] = useState("");

  const [mouseCoords, setMouseCoords] = useState({
    x: 0,
    y: 0
  });

  const mouseOffset = {
    x: 70,
    y: 70
  }

  const rectWidth = 140;

  useEffect(() => {
    setOperandsArr([{ "_id": "61e95e55e13a0e69b78ac761", "alphabet": "A", "value": "1" },
    { "_id": "61e95e70e13a0e69b78ac762", "alphabet": "B", "value": "2" },
    { "_id": "61e95e92e13a0e69b78ac763", "alphabet": "C", "value": "3" },
    { "_id": "61e95ea1e13a0e69b78ac764", "alphabet": "D", "value": "4" },
    { "_id": "61e95eb7e13a0e69b78ac765", "alphabet": "E", "value": "5" }]);
  }, []);

  function drag(e) {
    setTempDragGraphic(<div className={e.target.className} data-value={e.target.getAttribute("data-value")}>{e.target.innerHTML}</div>);
    setMouseCoords({
      x: e.clientX - mouseOffset.x,
      y: e.clientY - mouseOffset.y
    });
  }

  function evaluate(arr, comparator, rhs) {
    let expression = "";
    arr.forEach((elem) => expression += elem.value + " ");
    expression = expression + comparator + " " + rhs;
    try {
      alert(eval(expression));
    } catch (err) {
      alert("This is not a valid equation");
    }
  }

  function removeElement(e) {
    let value = e.target.getAttribute('data-value');
    setEquationArr(equationArr.filter((elem, index) => { return index != value })
      .map((elem, index) => { elem.position = index * rectWidth + 15; return elem }));
  }

  function handleMouseMove(e) {
    setMouseCoords({
      x: e.clientX - mouseOffset.x,
      y: e.clientY - mouseOffset.y
    });
  }

  function handleMouseUp(e) {
    if (tempDragGraphic != "") {
      let value = e.target.getAttribute('data-value');
      let type = e.target.className;
      let alphabet = e.target.innerHTML;
      let canvasElementTop = canvasElement.current.offsetTop;
      let canvasElementHeight = canvasElement.current.clientHeight;
      let isInCanvasElement = e.clientY + window.scrollY > canvasElementTop && e.clientY + window.scrollY < canvasElementTop + canvasElementHeight;
      // console.log(tempDragGraphic);
      setTempDragGraphic("");
      if (isInCanvasElement) {
        const boundRect = e.target.getBoundingClientRect();
        const position = boundRect.left + canvasElement.current.scrollLeft;
        setEquationArr([...equationArr, { value: value, type: type, alphabet: alphabet, position: position }]
          .sort((a, b) => { return a.position - b.position })
          .map((elem, index) => { elem.position = index * rectWidth + 15; return elem })
        );
      }
    }
  }

  function renderComponent(component) {
    return component;
  }

  return (
    <div className="App" onMouseMove={(e) => handleMouseMove(e)} onMouseUp={(e) => handleMouseUp(e)}>
      <div className="tempDragGraphic" style={{ position: 'fixed', opacity: 0.6, zIndex: 3, left: mouseCoords.x, top: mouseCoords.y }}>
        {
          renderComponent(tempDragGraphic)
        }
      </div>
      <div className="operands">
        {
          operandsArr.map((operand) => <div className="operand" draggable="true" onDragStart={(e) => drag(e)} data-value={operand.value}>{operand.alphabet}</div>)
        }
      </div>

      <br />

      <div className="operators">
        {
          operatorArr.map((operator) => <div className="operator" draggable="true" onDragStart={(e) => drag(e)}
            data-value={operator}>{operator}</div>)
        }
        <span className="space"></span>

        {
          comparatorArr.map((comparator) => <div className="comparator" data-value={comparator}
            onClick={(e) => setComparator(e.target.getAttribute('data-value'))}>{comparator}</div>)
        }
        <span className="space"></span>

        <div className="rhs" onClick={() => {
          let rhs = prompt("What should be the rhs integer?", "");
          (rhs.trim() != "") ? setRhs(rhs) : setRhs("")
        }}>RHS Integer
        </div>
      </div>

      <br />

      <div className="canvas" ref={canvasElement}>
        {
          equationArr.map((elem, index) => <div className={elem.type}><span className="remove" onClick={(e) => removeElement(e)} data-value={index}>x</span>{elem.alphabet}</div>)
        }
        {
          comparator && <div className="comparator"><span className="remove" onClick={() => setComparator("")}>x</span>{comparator}</div>
        }
        {
          rhs && <div className="rhs"><span className="remove" onClick={() => setRhs("")}>x</span>{rhs}</div>
        }
      </div>
      <button className="submit" onClick={() => evaluate(equationArr, comparator, rhs)}>Evaluate</button>
    </div>
  );
}

export default App;
