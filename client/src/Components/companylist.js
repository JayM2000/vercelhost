import React, { useEffect, useState } from 'react';

const Companylist = () => {

    const [dt, setdt] = useState([]);
    const [dtt, setdtt] = useState([]);
    const [chk,setchk] = useState(false);

    useEffect(() => {
        const objs = [{ "Name": "A", "Email": "a@a.com", "Am": "Yes" },
        { "Name": "B", "Email": "b@b.com", "Am": "No" },
        { "Name": "C", "Email": "c@c.com", "Am": "No" },
        { "Name": "D", "Email": "d@d.com", "Am": "Yes" },
        { "Name": "E", "Email": "e@e.com", "Am": "No" }];

        setdt(objs);
    }, []);

    function func(e) {
        let rows = e.target.value;
        const newarr = dt.map((ele) => {
            if (ele.Name === rows) {
                return { ...ele, 'Am': 'Yes' }
            }
            return ele;
        });
        setdt(newarr);
    }

    function funcc(e) {
        setchk(e.target.checked);

        if(!chk) {
            const objs = dt.filter((ele) => {
                if(ele.Am === 'Yes') {
                    return true;
                }
                return false;
            });
            setdtt(objs);
        }
    }

    return (
        <React.Fragment>
            <br/>
            <br/><br/>

            <div className='tablesz'>
                <label className="toggle" for="uniqueID">
                    <input type="checkbox" checked={chk} onChange={(e) => funcc(e)} className="toggle__input" id="uniqueID" />
                    <span className="toggle-track">
                        <span className="toggle-indicator">
                            <span className="checkMark">
                                <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                    <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                </svg>
                            </span>
                        </span>
                    </span>
                    Show Only Paid Students
                </label>
                <br/>

                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Sr. No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Amount Paid</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            chk ? (
                                dtt.map((ele,key) => (
                                    <tr>
                                        <th scope="row">{key}</th>
                                        <td>{ele.Name}</td>
                                        <td>{ele.Email}</td>
                                        <td>{ele.Am}</td>
                                        <td>{ele.Am === 'No' && (<button className='btns' value={ele.Name} onClick={(e) => func(e)}>Mark as Paid</button>)}</td>
                                    </tr>
                                ))
                            ) : (
                                dt.map((ele,key) => (
                                    <tr>
                                        <th scope="row">{key}</th>
                                        <td>{ele.Name}</td>
                                        <td>{ele.Email}</td>
                                        <td>{ele.Am}</td>
                                        <td>{ele.Am === 'No' && (<button className='btns' value={ele.Name} onClick={(e) => func(e)}>Mark as Paid</button>)}</td>
                                    </tr>
                                ))
                            )
                            // dt.map((ele,key) => (
                            //     <tr>
                            //         <th scope="row">{key}</th>
                            //         <td>{ele.Name}</td>
                            //         <td>{ele.Email}</td>
                            //         <td>{ele.Am}</td>
                            //         <td>{ele.Am === 'No' && (<button className='btns' value={ele.Name} onClick={(e) => func(e)}>Mark as Paid</button>)}</td>
                            //     </tr>
                            // ))
                        }
                    </tbody>
                </table>
            </div>

        </React.Fragment>
    )
}

export default Companylist;