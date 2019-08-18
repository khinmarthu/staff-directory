import React, { useState } from "react";
import styled from "styled-components";
import { Button, AutoComplete, Typography } from "antd";
import { isEqual, uniq } from "lodash";
import { Wrapper } from '../styled';

const { Title } = Typography;

const SearchInput = styled(AutoComplete)`
  margin-right: 10px;
`;

const initHistoryList = () => {
  const oldHistoryList =
    localStorage.getItem("history") &&
    JSON.parse(localStorage.getItem("history"));
  return oldHistoryList;
};

const Home = props => {
  const { history } = props;
  const [employeeName, setEmployeeName] = useState("");
  const [historyList, setHistoryList] = useState(initHistoryList());

  const handleSearchEmployee = event => {
    event.preventDefault();
    if (!employeeName) return;
    setUpdatedHistoryList();
    history.push(`/overview/${employeeName}`);
  };

  const getUpdatedHistoryList = () => {
    if (localStorage.getItem("history")) {
      const oldHistoryList = JSON.parse(localStorage.getItem("history"));
      return uniq([...oldHistoryList, employeeName]);
    }

    return [employeeName];
  };

  const setUpdatedHistoryList = () => {
    const newHistoryList = getUpdatedHistoryList();

    if (!isEqual(newHistoryList, historyList)) {
      localStorage.setItem("history", JSON.stringify(newHistoryList));
      setHistoryList(newHistoryList);
    }
  };

  return (
    <>
      <Wrapper>
        <Title level={3}>Employee Explorer</Title>
        <form onSubmit={handleSearchEmployee}>
          <SearchInput
            allowClear
            dataSource={historyList}
            style={{ width: 400 }}
            onSelect={value => setEmployeeName(value)}
            onChange={value => setEmployeeName(value)}
            placeholder="Please enter employee name here"
          />
          <Button htmlType="submit" type="primary" icon="search">
            Search
          </Button>
        </form>
      </Wrapper>
    </>
  );
};

export default Home;
