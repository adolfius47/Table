import React, {Component} from 'react';
import {connect} from 'react-redux';
class App extends Component {
    render() {
        let dropDown, access
        if (this.props.location.pathname == '/') {
            document.title = "Posts";


            dropDown = <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-title">
                        Posts
                    </h3>

                    <div className="page-bar">
                        <ul className="page-breadcrumb breadcrumb">
                            <li>
                               <a>Posts</a>
                                </li>
                            <li>
                            <a>List</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        }
        access = this.props.children
        return <div>
            {dropDown}
            <div className="row">
                <div className="col-lg-12">
                    {access}


                </div>
            </div>
        </div>
    }
}
export default connect(store => store)(App);