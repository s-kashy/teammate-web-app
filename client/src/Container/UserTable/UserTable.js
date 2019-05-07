import React, { Component } from "react";
import "./UserTable.css";
import Table, { ColumnGroup } from "rc-table";
import "../../../node_modules/rc-table/assets/index.css";

class UserTable extends Component {
  
  checkRow=(record,index,indent)=>{
 
  }
  render() {
    var columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 100
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 100,
        className: "row"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 200
      },
      {
        title: "Operations",
        dataIndex: "",
        key: "operations",
        
      }
    ];
    var data = [
      { name: "Jack", age: 28, address: "some where", key: "1" },
      { name: "Rose", age: 36, address: "some where", key: "2" }
    ];
    return (
      <div className="user-table-wrapper">
        <Table columns={columns} data={data} rowClassName={this.checkRow} />
      </div>
    );
  }
}
export default UserTable;
