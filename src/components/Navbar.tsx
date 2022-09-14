import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface IState { }
interface IProps {

}

let Navbar: React.FC<IProps> = () => {

    


    




    return (
        <React.Fragment>

            <nav className="navbar navbar-dark bg-dark navbar-expand-sm navbar-toggleable-md">

                <div className="container">
                    <Link to={'/'} className="navbar-brand">Pokemon battle</Link>
                    <button className="navbar-toggler navbar-toggler-right" type="button" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>



                    </div>


            
            </nav>




        </React.Fragment>
    )

};

export default Navbar;