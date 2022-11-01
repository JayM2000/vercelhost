import React,{useState,useEffect} from 'react';

const Samp = () => {

  const [val,setval] = useState([]);
  const [oper,setoper] = useState(["+", "-", "*", "/"]);
  const [com, setcom] = useState(["<", ">"]);

  const [ope,setope] = useState("");
  const [dis,setdis] = useState([]);

  useEffect(() => {
    setval([{ "_id": "61e95e55e13a0e69b78ac761", "alphabet": "A", "value": "1" },
    { "_id": "61e95e70e13a0e69b78ac762", "alphabet": "B", "value": "2" },
    { "_id": "61e95e92e13a0e69b78ac763", "alphabet": "C", "value": "3" },
    { "_id": "61e95ea1e13a0e69b78ac764", "alphabet": "D", "value": "4" },
    { "_id": "61e95eb7e13a0e69b78ac765", "alphabet": "E", "value": "5" }]);
  },[]);

  const drop = (e) => {
    e.preventDefault();
    let value = ope.props['data-value'];
    let type = ope.props['className'];
    let alt = ope.props.children;

    setdis([...dis,{value:value,type:type,alphabet:alt}]);
  };

  function allowDrop(ev) {
    ev.preventDefault();  
    ev.dataTransfer.dropEffect = "move"; 
  };

  // const dragstart = (ev) => {
  //   ev.dataTransfer.effectAllowed = "move";
  //   ev.dataTransfer.setData('text', ev.target.id);
  // };

  function drag(e) {
    setope(<div className={e.target.className} data-value={e.target.getAttribute('data-value')}>{e.target.innerHTML}</div>);
  }

  function removeElement(e) {

  }
 
  return (
    <React.Fragment>
      <div className='operands'>
        {
          val.map((ele) => (<div className='operand' draggable="true" onDragStart={(e) => drag(e)} data-value={ele.value}>{ele.alphabet}</div>))
        }
      </div>

      <div className='operators'>
        {
          oper.map((ele) => (<div className='operator' draggable="true" onDragStart={(e) => drag(e)} data-value={ele}>{ele}</div>))
        }
      </div>

      <div className='dash canvas' onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
        {
          dis.map((ele) => (<div className={ele.type}><span className="remove" onClick={(e) => removeElement(e)} data-value=''>x</span>{ele.alphabet}</div>))
        }
      </div>

    </React.Fragment>
  )
}

export default Samp;