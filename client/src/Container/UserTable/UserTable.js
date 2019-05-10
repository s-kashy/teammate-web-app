import React, { Component } from "react";
import "./UserTable.css";
import Table, { ColumnGroup } from "rc-table";
import "../../../node_modules/rc-table/assets/index.css";
import moment from "moment";

class UserTable extends Component {
  state = {
    data: [],
    expandedRowKeys: [],
    expandIconAsCell: true,
    expandRowByClick: false
  };
  onExpand = (expanded, record) => {
    console.log("onExpand", expanded, record);
  };

  onExpandedRowsChange = rows => {
    this.setState({
      expandedRowKeys: rows
    });
  };

  onExpandIconAsCellChange = e => {
    this.setState({
      expandIconAsCell: e.target.checked
    });
  };

  onExpandRowByClickChange = e => {
    this.setState({
      expandRowByClick: e.target.checked
    });
  };
  componentDidMount() {
    this.setState({ data: this.props.data });
  }
  expand = record => {
    var schedule = null;
    if (record.typeSchedule === "Daily") {
      return <p className="schedule-item">Daily Meet ups</p>;
    } else if (record.typeSchedule === "Weekly") {
      schedule = record.times.map(weekly => {
        return (
          <div key={weekly._id} id={weekly._id}>
            <p className="schedule-item">{weekly.value}</p>
          </div>
        );
      });
      return schedule;
    } else {
      var today = new Date();
      console.log("records", record);
      schedule = record.times.map(date => {
        if (moment(new Date(date)).isBefore(today)) {
          return (
            <p
              style={{textDecoration: "line-through" }}
              className="schedule-item"
            >
              {moment(date)
                .format("DD-MM-YYYY")
                .toString()}
            </p>
          );
        } else {
          return (
            <p
             
              className="schedule-item"
            >
              {moment(date)
                .format("DD-MM-YYYY")
                .toString()}
            </p>
          );
        }
      });

      return schedule;
    }
  };
  rowClassNameHandler = (record, index, indent) => {
    console.log("record", record);
    console.log("index", index);
    console.log("indent", indent);
  };
  render() {
    var columns = [
      {
        title: "Team Name",
        dataIndex: "nameOfTeam",
        key: "nameOfTeam",
        width: 100
      },

      {
        title: "Sport",
        dataIndex: "sport",
        key: "sport",
        width: 100
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        width: 100
      }
    ];
    let today = new Date();
    console.log(today);
    return (
      <div className="user-table-wrapper">
        <p className="title-table">Your TeamMate schedule</p>
        <Table
          columns={columns}
          data={this.props.data}
          expandedRowRender={(record, index, indent, expanded) =>
            expanded ? this.expand(record) : null
          }
        />
      </div>
    );
  }
}
export default UserTable;
