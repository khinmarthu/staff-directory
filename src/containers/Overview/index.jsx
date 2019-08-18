import React, { useState, useEffect } from "react";
import { Typography, List } from "antd";
import { EMPLOYEE_URL } from "../../constants/api";
import { fetchData } from "../../common/utils";

const { Title } = Typography;

const Overview = props => {
  const { match: { params : { employeeName } } } = props;
  const [subordinates, setSubordinates] = useState([]);

  useEffect(() => {
    const url = `${EMPLOYEE_URL}${employeeName}`;
    fetchData(url).then(response => {
      setSubordinates(response[1]['direct-subordinates']);
    });
  }, [employeeName]);

  return (
    <>
      <Title level={4}>Employee Overview</Title>
      <List
        size="small"
        bordered
        dataSource={subordinates}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </>
  );
};

export default Overview;
