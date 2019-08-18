import React, { useState, useEffect } from "react";
import { Typography, List } from "antd";
import { EMPLOYEE_URL } from "../../constants/api";
import { fetchData } from "../../common/utils";
import { Wrapper } from '../styled';

const { Title, Paragraph, Text } = Typography;

const Overview = props => {
  const {
    match: {
      params: { employeeName }
    }
  } = props;
  const [subordinates, setSubordinates] = useState([]);

  useEffect(() => {
    const url = `${EMPLOYEE_URL}${employeeName}`;
    fetchData(url)
      .then(response => {
        setSubordinates(response[1]["direct-subordinates"]);
      })
      .catch(error => {
        console.log("error: ", error);
      });
  }, [employeeName]);

  return (
    <>
      <Wrapper>
        <Title level={3}>Employee Overview</Title>
        <Paragraph>Subordinates of employee <Text strong>{employeeName}</Text></Paragraph>
        <List
          size="small"
          bordered
          dataSource={subordinates}
          renderItem={item => <List.Item>{item}</List.Item>}
          locale={{ emptyText: "No Subordinates" }}
        />
      </Wrapper>
    </>
  );
};

export default Overview;
