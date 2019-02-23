import React, { Component } from "react"
import Aux from "../../Hoc/Hoc"
import Header from "../Header/Header"
import "./Layout.css"
class Layout extends Component {
    render() {
        return (<Aux>
          
           <main className="content">{this.props.children}</main>
        </Aux>
        )
    }
}

export default Layout